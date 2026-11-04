import { Body, Controller, ForbiddenException, Get, Inject, Logger, Param, Post, Query, RawBody, Req, Res, UseGuards } from '@nestjs/common';
import { BidService } from '../../Domains/Bidding/bid.service';
import { AuctionRepository } from '../../Domains/Bidding/auction.repository';
import { BidParamDto, PlaceBidDto, InitiateBidPaymentDto, ConfirmBidPaymentDto, BidUserParamDto } from './dto';
import { ConfigService } from '@nestjs/config';
import Stripe from "stripe"
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JOB_NAMES } from 'src/queue/constants';
import { STRIPE_CLIENT } from '../../providers/stripe.provider';
import { KindeAuthGuard } from '../../Guards/kinde-auth.guard';
import { CurrentUser } from '../../Guards/current-user.decorator';
import type { KindeUser } from '../../Guards/current-user.decorator';
import { decodeBidAmounts } from '../../queue/utils/decode-bid-amounts';
import { resolveCanonicalPayment } from '../../queue/utils/resolve-stripe-payment';

@Controller('bids')
export class BidController {
    private readonly logger = new Logger(BidController.name);

    constructor(
        private bidService: BidService,
        private auctionRepository: AuctionRepository,
        private configService: ConfigService,
        @InjectQueue(JOB_NAMES.PROCESS_BID) private bidQueue: Queue,
        @Inject(STRIPE_CLIENT) private stripe: Stripe
    ) {}



    /**
     * Get all bids for a specific auction
     * Query parameter: auctionId
     */
    @Get('auction/:auctionId')
    async getBidsByAuctionId(@Param('auctionId') auctionId: string) {
        return await this.bidService.getBidsByAuctionId(auctionId);
    }

    /**
     * Get all bids by a specific bidder
     * Query parameter: bidderId
     */
    @Get('bidder/:bidderId')
    @UseGuards(KindeAuthGuard)
    async getBidsByBidderId(@Param('bidderId') bidderId: string, @CurrentUser() user: KindeUser) {
        return await this.bidService.getBidsByBidderId(bidderId);
    }


    @Get('my-bids/:kinde_id')
    async getBidByKindeId(@Param() params: BidUserParamDto) {
        return await this.bidService.getBidsByBidderId(params.kinde_id);
    }


    /**
     * Get a single bid by ID
     */
    @Get(':id')
    async getBidById(@Param() params: BidParamDto) {
        return await this.bidService.getBidById(params.id);
    }


    

    /**
     * Get current winning bid for an auction
     */
    @Get('auction/:auctionId/winning')
    async getCurrentWinningBid(@Param('auctionId') auctionId: string) {
        return await this.bidService.getCurrentWinningBid(auctionId);
    }

    /**
     * Get bid statistics for an auction
     */
    @Get('auction/:auctionId/statistics')
    async getBidStatistics(@Param('auctionId') auctionId: string) {
        return await this.bidService.getBidStatistics(auctionId);
    }



    // Get stripe payment event

    @Post('stripe/webhook')
    async getStripePaymentEvent(@RawBody() rawBody: Buffer, @Req() req, @Res() res) {
        const endpoint_secret = this.configService.get("ENDPOINT_SECRET");

        if (!endpoint_secret) {
            return res.status(403).json({
                status: "forbidden",
                message: new ForbiddenException("stripe secret key not provided")
            });
        }

        const signature = req.headers['stripe-signature'] as string | undefined;
        if (!signature) {
            return res.status(400).json({ status: "failed", message: "Missing stripe-signature header" });
        }

        let event: Stripe.Event;
        try {
            event = this.stripe.webhooks.constructEvent(rawBody, signature, endpoint_secret);
        } catch (err: any) {
            this.logger.warn(`⚠️ Webhook signature verification failed: ${err.message}`);
            return res.status(400).json({ status: "failed", message: err.message });
        }

        this.logger.log(`event received: ${event.id} (${event.type})`);

        // Stripe fires several event types per real payment (payment_intent.succeeded,
        // charge.succeeded, charge.updated, mandate.updated, ...) — only two actually
        // represent "the payment succeeded, go create bids". Everything else is an echo
        // we deliberately ignore, with a 200 (not 400/403) so Stripe doesn't retry it.
        const resolved = resolveCanonicalPayment(event);
        // Note: narrowing via `!resolved.ok` alone doesn't work reliably under this
        // project's `strictNullChecks: false` tsconfig, so check for the `reason`
        // field (only present on the failure branch) instead.
        if ('reason' in resolved) {
            this.logger.log(`Ignoring event ${event.id} (${event.type}): ${resolved.reason}`);
            return res.status(200).json({ status: "ignored", reason: resolved.reason, type: event.type });
        }

        return await this.handleSuccessfulBidPayment(event, resolved, res);
    }

    private async handleSuccessfulBidPayment(
        event: Stripe.Event,
        resolved: Extract<ReturnType<typeof resolveCanonicalPayment>, { ok: true }>,
        res: any,
    ) {
        const paymentObject = event.data.object as any;
        const metadata = (paymentObject.metadata ?? {}) as Record<string, string | undefined>;

        let bidAmounts: number[];
        try {
            bidAmounts = decodeBidAmounts(metadata);
        } catch (decodeError: any) {
            this.logger.error(`Failed to decode bidAmounts for event ${event.id}: ${decodeError.message}`);
            return res.status(200).json({
                status: "failed",
                message: `Could not decode bidAmounts metadata: ${decodeError.message}`,
            });
        }

        if (bidAmounts.length === 0) {
            this.logger.warn(`Event ${event.id} has no bidAmounts metadata, skipping`);
            return res.status(200).json({
                status: "ignored",
                message: "no bid amounts present in metadata",
            });
        }

        // The checkout-session flow only carries productId, not auctionId.
        let auctionId = metadata.auctionId;
        if (!auctionId && metadata.productId) {
            const auction = await this.auctionRepository.findActiveAuctionByProductId(metadata.productId);
            if (!auction) {
                this.logger.error(`No active auction found for product ${metadata.productId} (event ${event.id})`);
                return res.status(200).json({
                    status: "failed",
                    message: `No active auction found for product ${metadata.productId}`,
                });
            }
            auctionId = auction.id;
        }

        const entryFee = Number(metadata.entryFee ?? metadata.biddingFee);
        const totalPaid = Number(metadata.totalPaid ?? metadata.totalAmount);

        const job = await this.bidQueue.add(JOB_NAMES.PROCESS_BID, {
            paymentIntentId: resolved.canonicalPaymentId,
            idempotencyKey: resolved.idempotencyKey,
            stripeEventId: event.id,
            stripeEventType: event.type,
            auctionId,
            auctionTitle: metadata.productTitle,
            bidderId: metadata.bidderId,
            bidderName: metadata.bidderName,
            entryFee,
            totalPaid,
            bidAmounts,
        }, {
            // Dedup key, not just a label: payment_intent.succeeded and charge.succeeded
            // for the same payment share this idempotencyKey, so both collapse into one
            // job even though the event-type filter above should already drop the charge
            // event. This is a first-line filter only — BullMQ forgets completed job ids
            // once removeOnComplete evicts them, so ProcessedPayment is the durable guard.
            jobId: resolved.idempotencyKey,
        });

        this.logger.log(`Added bid processing job: ${job.id} for auction: ${auctionId} (${bidAmounts.length} entries, payment ${resolved.canonicalPaymentId})`);
        return res.status(200).json({
            status: "success",
            message: "payment succeeded and job added to queue for processing"
        });
    }
}
