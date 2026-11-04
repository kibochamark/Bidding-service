import Stripe from 'stripe';

/**
 * Stripe sends several independent events for one real payment: a PaymentIntent
 * confirmation produces payment_intent.created, payment_intent.succeeded AND
 * charge.succeeded/charge.updated (the Charge echo carries the same metadata as
 * its parent PaymentIntent, since Stripe copies it across). Gating on an event's
 * object.status alone (e.g. "succeeded") can't tell these apart, since a Charge
 * also reports status "succeeded" — that ambiguity is what causes bids to be
 * created twice. This resolver is the single place that decides which event
 * types we actually process, and what canonical identifiers to dedupe on.
 */

export const ALLOWED_EVENT_TYPES = [
    'payment_intent.succeeded',
    'checkout.session.completed',
] as const;

export type ResolvedPayment =
    | { ok: true; canonicalPaymentId: string; idempotencyKey: string; idKind: 'payment_intent' | 'checkout_session' }
    | { ok: false; reason: string };

export function resolveCanonicalPayment(event: Stripe.Event): ResolvedPayment {
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const pi = event.data.object as Stripe.PaymentIntent;
            if (pi.status !== 'succeeded') {
                return { ok: false, reason: `payment_intent status is ${pi.status}, not succeeded` };
            }
            return {
                ok: true,
                canonicalPaymentId: pi.id,
                idempotencyKey: resolveIdempotencyKey(event, pi.id),
                idKind: 'payment_intent',
            };
        }

        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            if (session.status !== 'complete' || session.payment_status !== 'paid') {
                return {
                    ok: false,
                    reason: `checkout.session status=${session.status} payment_status=${session.payment_status}, not a completed paid session`,
                };
            }

            const pi = session.payment_intent;
            const piId = typeof pi === 'string' ? pi : pi?.id;

            if (piId) {
                return {
                    ok: true,
                    canonicalPaymentId: piId,
                    idempotencyKey: resolveIdempotencyKey(event, piId),
                    idKind: 'payment_intent',
                };
            }

            // No PaymentIntent on this session (e.g. setup/subscription mode) — fall
            // back to the session id. Dedup against a parallel payment_intent.succeeded
            // for the same payment is not possible in this case.
            return {
                ok: true,
                canonicalPaymentId: session.id,
                idempotencyKey: resolveIdempotencyKey(event, session.id),
                idKind: 'checkout_session',
            };
        }

        default:
            return { ok: false, reason: `unhandled event type: ${event.type}` };
    }
}

/**
 * Prefer Stripe's own idempotency key (the key supplied on the API request that
 * instigated this event) — payment_intent.succeeded and charge.succeeded for the
 * same confirm call share this value, so it dedupes across event types too. Not
 * every event carries one (e.g. charge.updated often has a null request), so fall
 * back to the resolved canonical payment id.
 */
function resolveIdempotencyKey(event: Stripe.Event, canonicalPaymentId: string): string {
    return event.request?.idempotency_key ?? canonicalPaymentId;
}
