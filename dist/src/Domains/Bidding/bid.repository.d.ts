import { PrismaService } from '../../prisma/prisma.service';
import { PlaceBidDto } from '../../Controllers/Bidding/dto';
export declare class BidRepository {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    placeBid(data: PlaceBidDto): Promise<{
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: import("@prisma/client-runtime-utils").Decimal;
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    }>;
    recalculateWinningBid(auctionId: string): Promise<{
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: import("@prisma/client-runtime-utils").Decimal;
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
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    }[]>;
    getBidById(id: string): Promise<{
        auction: {
            id: string;
            status: import("../../../generated/prisma/enums").AuctionStatus;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            startDate: Date;
            endDate: Date;
            productId: string;
            prizeValue: import("@prisma/client-runtime-utils").Decimal;
            entryFee: import("@prisma/client-runtime-utils").Decimal;
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
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    }>;
    getBidsByBidderId(bidderId: string): Promise<({
        auction: {
            id: string;
            status: import("../../../generated/prisma/enums").AuctionStatus;
            title: string;
            endDate: Date;
        };
    } & {
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: import("@prisma/client-runtime-utils").Decimal;
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
