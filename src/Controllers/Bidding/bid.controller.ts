import { Body, Controller, ForbiddenException, Get, Inject, Logger, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { BidService } from '../../Domains/Bidding/bid.service';
import { BidParamDto, PlaceBidDto, InitiateBidPaymentDto, ConfirmBidPaymentDto } from './dto';
import { ConfigService } from '@nestjs/config';
import Stripe from "stripe"
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JOB_NAMES } from 'src/queue/constants';
import { STRIPE_CLIENT } from '../../providers/stripe.provider';
import { KindeAuthGuard } from '../../Guards/kinde-auth.guard';
import { CurrentUser } from '../../Guards/current-user.decorator';
import type { KindeUser } from '../../Guards/current-user.decorator';

@Controller('bids')
export class BidController {
    private readonly logger = new Logger(BidController.name);

    constructor(
        private bidService: BidService,
        private configService: ConfigService,
        @InjectQueue(JOB_NAMES.PROCESS_BID) private bidQueue: Queue,
        @Inject(STRIPE_CLIENT) private stripe: Stripe
    ) {}

    /**
     * Initiate a bid payment
     * This creates a payment intent and returns payment details
     */
    
    /**
     * Place a new bid (legacy - without payment)
     */
    @Post()
    @UseGuards(KindeAuthGuard)
    async placeBid(@Body() placeBidDto: PlaceBidDto, @CurrentUser() user: KindeUser) {
        this.logger.log(`Placing bid for auction ${placeBidDto.auctionId} by ${user.kindeId}`);
        return await this.bidService.placeBid(placeBidDto);
    }

    /**
     * Get all bids for a specific auction
     * Query parameter: auctionId
     */
    @Get('auction/:auctionId')
    async getBidsByAuctionId(@Param('auctionId') auctionId: string) {
        return await this.bidService.getBidsByAuctionId(auctionId);
    }

    /**
     * Get all bids by a specific bidder
     * Query parameter: bidderId
     */
    @Get('bidder/:bidderId')
    @UseGuards(KindeAuthGuard)
    async getBidsByBidderId(@Param('bidderId') bidderId: string, @CurrentUser() user: KindeUser) {
        return await this.bidService.getBidsByBidderId(bidderId);
    }

    /**
     * Get a single bid by ID
     */
    @Get(':id')
    async getBidById(@Param() params: BidParamDto) {
        return await this.bidService.getBidById(params.id);
    }

    /**
     * Get current winning bid for an auction
     */
    @Get('auction/:auctionId/winning')
    async getCurrentWinningBid(@Param('auctionId') auctionId: string) {
        return await this.bidService.getCurrentWinningBid(auctionId);
    }

    /**
     * Get bid statistics for an auction
     */
    @Get('auction/:auctionId/statistics')
    async getBidStatistics(@Param('auctionId') auctionId: string) {
        return await this.bidService.getBidStatistics(auctionId);
    }



    // Get stripe payment event

    @Post('stripe/webhook')
    async getStripePaymentEvent(@Req() req, @Res() res){
        /**
         * verify stripe tokem
         *  extract event data
         * queue job for processing
         */

        const endpoint_secret= this.configService.get("ENDPOINT_SECRET")
        let event
        // retrive stripe headers
        if (endpoint_secret){
            this.logger.log("stripe secret present,....decoding event")
            const signature = req.headers['stripe-signature']
            console.log(signature, "sig")
            try {
                event = this.stripe.webhooks.constructEvent(
                    req.rawBody,
                    signature.toString(),
                    endpoint_secret
                );

                this.logger.log("event received...proceeding to queue job")

                this.logger.log(`event: ${JSON.stringify(event)}`)

                const job = await this.bidQueue.add(JOB_NAMES.PROCESS_BID, { 
                    paymentIntentId: event.data.object.payment_intent,
                    ...event.data.object.metadata
                }, {
                    jobId: event.paymentIntentId, // Use payment intent ID as job ID (prevents duplicates)
                });

                this.logger.log(`Added bid processing job: ${job.id} for auction: ${event.id}`);

            } catch (err) {
                console.log(`⚠️ Webhook signature verification failed.`, err.message);
                return res.status(400).json({
                    status:"failed",
                    message:err.message
                });
            }
        }else{
            return res.status(403).json({
                status: "forbidden",
                message: new ForbiddenException("stripe secret key not provided")
            });
        }


    }
}
