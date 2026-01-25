import { Queue } from "bullmq";
export declare class QueueService {
    private readonly bidQueue;
    private readonly logger;
    constructor(bidQueue: Queue);
    addBidProcessingJob(data: any): Promise<void>;
}
