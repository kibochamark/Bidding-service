import { PrismaService } from '../../prisma/prisma.service';
import { PlaceBidDto } from '../../Controllers/Bidding/dto';
import { BidJobDto } from '../../queue/dto/bid-dto';
export declare class BidRepository {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    placeBidWithPayment(data: BidJobDto): Promise<{
        processedAfterAuctionEnd: boolean;
        withinGracePeriod: boolean;
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
    placeBid(data: PlaceBidDto): Promise<{}>;
    recalculateWinningBid(auctionId: string): Promise<{
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
    getBidById(id: string): Promise<{
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
    getBidsByBidderId(bidderId: string): Promise<({
        auction: {
            id: string;
            title: string;
            endDate: Date;
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
}
