import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { BidService } from '../../Domains/Bidding/bid.service';
import { BidParamDto, PlaceBidDto } from './dto';

@Controller('bids')
export class BidController {
    private readonly logger = new Logger(BidController.name);

    constructor(private bidService: BidService) {}

    /**
     * Place a new bid
     */
    @Post()
    async placeBid(@Body() placeBidDto: PlaceBidDto) {
        this.logger.log(`Placing bid for auction ${placeBidDto.auctionId} by ${placeBidDto.bidderName}`);
        return await this.bidService.placeBid(placeBidDto);
    }

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
    async getBidsByBidderId(@Param('bidderId') bidderId: string) {
        return await this.bidService.getBidsByBidderId(bidderId);
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
}
