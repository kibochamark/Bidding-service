import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { BidJobDto } from "../../queue/dto/bid-dto";
import { BidRepository } from "./bid.repository";
export declare class BidProcessor extends WorkerHost {
    private bidRepository;
    private readonly logger;
    private readonly publisher;
    constructor(bidRepository: BidRepository);
    process(job: Job<BidJobDto, any, string>): Promise<any>;
}
