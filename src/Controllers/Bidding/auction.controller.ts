import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { AuctionService } from '../../Domains/Bidding/auction.service';
import { AuctionParamDto, CreateAuctionDto, UpdateAuctionDto } from './dto';

@Controller('auctions')
export class AuctionController {
    private readonly logger = new Logger(AuctionController.name);

    constructor(private auctionService: AuctionService) {}

    /**
     * Get all active auctions
     */
    @Get()
    async getActiveAuctions() {
        return await this.auctionService.getActiveAuctions();
    }

    /**
     * Get a single auction by ID
     */
    @Get(':id')
    async getAuctionById(@Param() params: AuctionParamDto) {
        return await this.auctionService.getAuctionById(params.id);
    }

    /**
     * Get auction statistics
     */
    @Get(':id/stats')
    async getAuctionStats(@Param() params: AuctionParamDto) {
        return await this.auctionService.getAuctionStats(params.id);
    }

    /**
     * Get auction leaderboard
     */
    @Get(':id/leaderboard')
    async getAuctionLeaderboard(@Param() params: AuctionParamDto) {
        return await this.auctionService.getAuctionLeaderboard(params.id);
    }

    /**
     * Create a new auction
     */
    @Post()
    async createAuction(@Body() createAuctionDto: CreateAuctionDto) {
        this.logger.log(`Creating auction: ${createAuctionDto.title}`);
        return await this.auctionService.createAuction(createAuctionDto);
    }

    /**
     * Finalize an auction and determine winner
     */
    @Post(':id/finalize')
    async finalizeAuction(@Param() params: AuctionParamDto) {
        this.logger.log(`Finalizing auction: ${params.id}`);
        return await this.auctionService.finalizeAuction(params.id);
    }

    /**
     * Update an existing auction
     */
    @Patch(':id')
    async updateAuction(
        @Param() params: AuctionParamDto,
        @Body() updateAuctionDto: UpdateAuctionDto,
    ) {
        return await this.auctionService.updateAuction(params.id, updateAuctionDto);
    }

    /**
     * Delete an auction
     */
    @Delete(':id')
    async deleteAuction(@Param() params: AuctionParamDto) {
        return await this.auctionService.deleteAuction(params.id);
    }
}
