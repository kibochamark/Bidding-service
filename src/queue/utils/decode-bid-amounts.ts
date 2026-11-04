/**
 * Stripe metadata values are capped at 500 characters, so the frontend splits
 * a bid-amounts array across bidAmounts_0, bidAmounts_1, ... (bidAmountsChunkCount
 * total) and concatenates the JSON text before parsing. Reassemble it the same way.
 */
export function decodeBidAmounts(metadata: Record<string, string | undefined>): number[] {
    const chunkCount = Number(metadata.bidAmountsChunkCount ?? '0');

    if (!chunkCount || chunkCount < 1) {
        return [];
    }

    let raw = '';
    for (let i = 0; i < chunkCount; i++) {
        const chunk = metadata[`bidAmounts_${i}`];
        if (chunk === undefined) {
            throw new Error(`Missing bidAmounts_${i} (bidAmountsChunkCount=${chunkCount})`);
        }
        raw += chunk;
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        throw new Error('bidAmounts metadata did not decode to valid JSON');
    }

    if (!Array.isArray(parsed) || !parsed.every((n) => typeof n === 'number')) {
        throw new Error('bidAmounts metadata did not decode to an array of numbers');
    }

    return parsed;
}
