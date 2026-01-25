"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var QueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const bullmq_2 = require("bullmq");
let QueueService = QueueService_1 = class QueueService {
    constructor(bidQueue) {
        this.bidQueue = bidQueue;
        this.logger = new common_1.Logger(QueueService_1.name);
    }
    async addBidProcessingJob(data) {
        try {
            this.logger.log(`received job data ${JSON.stringify(data)}`);
            const job = await this.bidQueue.add(constants_1.JOB_NAMES.PROCESS_BID, data, {
                jobId: data.paymentIntentId,
            });
            this.logger.log(`Added bid processing job: ${job.id} for auction: ${data.auctionId}`);
        }
        catch (error) {
            this.logger.error(`Failed to add bid processing job: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = QueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(constants_1.JOB_NAMES.PROCESS_BID)),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], QueueService);
//# sourceMappingURL=queue.service.js.map