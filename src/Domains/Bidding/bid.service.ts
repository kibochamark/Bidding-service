import { Injectable, Logger } from '@nestjs/common';
import { BidRepository } from './bid.repository';
import { PlaceBidDto } from '../../Controllers/Bidding/dto';

@Injectable()
export class BidService {
    private readonly logger = new Logger(BidService.name);

    constructor(private bidRepository: BidRepository) {}

    /**
     * Place a new bid
     */
    async placeBid(data: PlaceBidDto) {
        return await this.bidRepository.placeBid(data);
    }

    /**
     * Get all bids for an auction
     */
    async getBidsByAuctionId(auctionId: string) {
        return await this.bidRepository.getBidsByAuctionId(auctionId);
    }

    /**
     * Get a specific bid by ID
     */
    async getBidById(id: string) {
        return await this.bidRepository.getBidById(id);
    }

    /**
     * Get all bids by a specific bidder
     */
    async getBidsByBidderId(bidderId: string) {
        return await this.bidRepository.getBidsByBidderId(bidderId);
    }

    /**
     * Get current winning bid for an auction
     */
    async getCurrentWinningBid(auctionId: string) {
        return await this.bidRepository.getCurrentWinningBid(auctionId);
    }

    /**
     * Get bid statistics for an auction
     */
    async getBidStatistics(auctionId: string) {
        return await this.bidRepository.getBidStatistics(auctionId);
    }
}
