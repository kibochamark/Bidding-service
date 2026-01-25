import { BidRepository } from './bid.repository';
import { InitiateBidPaymentDto, ConfirmBidPaymentDto, PlaceBidDto } from '../../Controllers/Bidding/dto';
import { AuctionRepository } from './auction.repository';
export declare class BidService {
    private bidRepository;
    private auctionRepository;
    private readonly logger;
    private paymentIntents;
    constructor(bidRepository: BidRepository, auctionRepository: AuctionRepository);
    initiateBidPayment(data: InitiateBidPaymentDto): Promise<{
        paymentIntentId: string;
        clientSecret: string;
        amount: number;
        currency: string;
        auctionId: string;
        bidAmount: number;
        entryFee: number;
        totalAmount: number;
        warning: string | undefined;
        auctionEndTime: Date;
    }>;
    confirmBidPayment(data: ConfirmBidPaymentDto): Promise<{
        success: boolean;
        message: string;
        paymentIntentId: string;
        bidData: {
            paymentIntentId: string;
            auctionId: string;
            bidderId: string;
            bidderName: string;
            bidAmount: number;
            entryFee: number;
            totalPaid: number;
            paidAt: Date;
        };
    }>;
    getPaymentIntent(paymentIntentId: string): Promise<{
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: number;
        entryFee: number;
        totalPaid: number;
        createdAt: Date;
        status: "pending" | "confirmed" | "expired";
    }>;
    placeBid(data: PlaceBidDto): Promise<{}>;
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
