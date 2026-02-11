import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { BidRepository } from './bid.repository';
import { InitiateBidPaymentDto, ConfirmBidPaymentDto, PlaceBidDto } from '../../Controllers/Bidding/dto';
import { AuctionRepository } from './auction.repository';

@Injectable()
export class BidService {
    private readonly logger = new Logger(BidService.name);

    // In-memory store for payment intents (replace with Redis in production)
    private paymentIntents = new Map<string, {
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: number;
        entryFee: number;
        totalPaid: number;
        createdAt: Date;
        status: 'pending' | 'confirmed' | 'expired';
    }>();

    constructor(
        private bidRepository: BidRepository,
        private auctionRepository: AuctionRepository,
    ) {}

    async initiateBidPayment(data: InitiateBidPaymentDto) {
        this.logger.log(`Initiating bid payment for auction ${data.auctionId} by ${data.bidderName}`);

        const auction = await this.auctionRepository.findAuctionById(data.auctionId);

        if (!auction) {
            throw new NotFoundException(`Auction with ID ${data.auctionId} not found`);
        }

        if (auction.status !== 'ACTIVE') {
            throw new BadRequestException(`Auction is not active. Current status: ${auction.status}`);
        }

        const now = new Date();
        const timeUntilEnd = auction.endDate.getTime() - now.getTime();
        const fiveMinutes = 5 * 60 * 1000;

        if (timeUntilEnd < 0) {
            throw new BadRequestException('Auction has already ended');
        }

        const minutesRemaining = timeUntilEnd / 1000 / 60;
        const warning = timeUntilEnd < fiveMinutes
            ? `Warning: Auction ends in ${minutesRemaining.toFixed(0)} minutes. Complete payment quickly!`
            : undefined;

        const entryFee = Number(auction.entryFee);
        const totalAmount = entryFee;

        const paymentIntentId = `pi_dummy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const clientSecret = `secret_${paymentIntentId}`;

        this.paymentIntents.set(paymentIntentId, {
            auctionId: data.auctionId,
            bidderId: data.bidderId,
            bidderName: data.bidderName,
            bidAmount: data.bidAmount,
            entryFee: entryFee,
            totalPaid: totalAmount,
            createdAt: now,
            status: 'pending',
        });

        this.logger.log(`Payment intent created: ${paymentIntentId}`);

        return {
            paymentIntentId,
            clientSecret,
            amount: entryFee,
            currency: 'usd',
            auctionId: data.auctionId,
            bidAmount: data.bidAmount,
            entryFee: entryFee,
            totalAmount: totalAmount,
            warning,
            auctionEndTime: auction.endDate,
        };
    }

    async confirmBidPayment(data: ConfirmBidPaymentDto) {
        this.logger.log(`Confirming payment for intent: ${data.paymentIntentId}`);

        const paymentIntent = this.paymentIntents.get(data.paymentIntentId);

        if (!paymentIntent) {
            throw new NotFoundException(`Payment intent ${data.paymentIntentId} not found`);
        }

        if (paymentIntent.status === 'confirmed') {
            throw new BadRequestException('Payment already confirmed');
        }

        if (paymentIntent.status === 'expired') {
            throw new BadRequestException('Payment intent has expired');
        }

        paymentIntent.status = 'confirmed';
        this.paymentIntents.set(data.paymentIntentId, paymentIntent);

        this.logger.log(`Payment confirmed for auction ${paymentIntent.auctionId}`);

        return {
            success: true,
            message: 'Payment confirmed. Your bid is being processed.',
            paymentIntentId: data.paymentIntentId,
            bidData: {
                paymentIntentId: data.paymentIntentId,
                auctionId: paymentIntent.auctionId,
                bidderId: paymentIntent.bidderId,
                bidderName: paymentIntent.bidderName,
                bidAmount: paymentIntent.bidAmount,
                entryFee: paymentIntent.entryFee,
                totalPaid: paymentIntent.totalPaid,
                paidAt: new Date(),
            }
        };
    }

    async getPaymentIntent(paymentIntentId: string) {
        const paymentIntent = this.paymentIntents.get(paymentIntentId);

        if (!paymentIntent) {
            throw new NotFoundException(`Payment intent ${paymentIntentId} not found`);
        }

        return paymentIntent;
    }


    async getBidsByAuctionId(auctionId: string) {
        return await this.bidRepository.getBidsByAuctionId(auctionId);
    }

    async getBidById(id: string) {
        return await this.bidRepository.getBidById(id);
    }

    async getBidsByBidderId(bidderId: string) {
        return await this.bidRepository.getBidsByBidderId(bidderId);
    }

    async getCurrentWinningBid(auctionId: string) {
        return await this.bidRepository.getCurrentWinningBid(auctionId);
    }

    async getBidStatistics(auctionId: string) {
        return await this.bidRepository.getBidStatistics(auctionId);
    }



    
}
