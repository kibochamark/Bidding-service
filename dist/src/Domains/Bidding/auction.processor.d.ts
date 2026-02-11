import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { BidRepository } from './bid.repository';
import { AuctionRepository } from './auction.repository';
export interface AuctionFinalizationJobDto {
    auctionId: string;
    title: string;
    endDate: string;
}
export declare class AuctionProcessor extends WorkerHost {
    private bidRepository;
    private auctionRepository;
    private readonly logger;
    constructor(bidRepository: BidRepository, auctionRepository: AuctionRepository);
    process(job: Job<AuctionFinalizationJobDto>): Promise<any>;
}
