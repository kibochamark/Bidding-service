import { BidService } from '../../Domains/Bidding/bid.service';
import { BidParamDto, BidUserParamDto } from './dto';
import { ConfigService } from '@nestjs/config';
import Stripe from "stripe";
import { Queue } from 'bullmq';
import type { KindeUser } from '../../Guards/current-user.decorator';
export declare class BidController {
    private bidService;
    private configService;
    private bidQueue;
    private stripe;
    private readonly logger;
    constructor(bidService: BidService, configService: ConfigService, bidQueue: Queue, stripe: Stripe);
    getBidsByAuctionId(auctionId: string): Promise<{
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: import("@prisma/client-runtime-utils").Decimal;
        entryFeePaid: import("@prisma/client-runtime-utils").Decimal;
        totalPaid: import("@prisma/client-runtime-utils").Decimal;
        paymentIntentId: string;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    }[]>;
    getBidsByBidderId(bidderId: string, user: KindeUser): Promise<({
        auction: {
            id: string;
            title: string;
            endDate: Date;
            productId: string;
            prizeValue: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums").AuctionStatus;
        };
    } & {
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: import("@prisma/client-runtime-utils").Decimal;
        entryFeePaid: import("@prisma/client-runtime-utils").Decimal;
        totalPaid: import("@prisma/client-runtime-utils").Decimal;
        paymentIntentId: string;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    })[]>;
    getBidByKindeId(params: BidUserParamDto): Promise<({
        auction: {
            id: string;
            title: string;
            endDate: Date;
            productId: string;
            prizeValue: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums").AuctionStatus;
        };
    } & {
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: import("@prisma/client-runtime-utils").Decimal;
        entryFeePaid: import("@prisma/client-runtime-utils").Decimal;
        totalPaid: import("@prisma/client-runtime-utils").Decimal;
        paymentIntentId: string;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    })[]>;
    getBidById(params: BidParamDto): Promise<{
        auction: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            entryFee: import("@prisma/client-runtime-utils").Decimal;
            startDate: Date;
            endDate: Date;
            productId: string;
            prizeValue: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums").AuctionStatus;
            winnerId: string | null;
            winningBidAmount: import("@prisma/client-runtime-utils").Decimal | null;
            totalBidsCount: number;
            totalRevenue: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: import("@prisma/client-runtime-utils").Decimal;
        entryFeePaid: import("@prisma/client-runtime-utils").Decimal;
        totalPaid: import("@prisma/client-runtime-utils").Decimal;
        paymentIntentId: string;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    }>;
    getCurrentWinningBid(auctionId: string): Promise<{
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: import("@prisma/client-runtime-utils").Decimal;
        entryFeePaid: import("@prisma/client-runtime-utils").Decimal;
        totalPaid: import("@prisma/client-runtime-utils").Decimal;
        paymentIntentId: string;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    } | null>;
    getBidStatistics(auctionId: string): Promise<{
        bidAmount: number;
        count: number;
        isUnique: boolean;
        bidders: string[];
    }[]>;
    getStripePaymentEvent(req: any, res: any): Promise<any>;
}
