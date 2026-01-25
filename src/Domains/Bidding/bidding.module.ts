import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuctionController } from '../../Controllers/Bidding/auction.controller';
import { BidController } from '../../Controllers/Bidding/bid.controller';
import { AuctionService } from './auction.service';
import { BidService } from './bid.service';
import { AuctionRepository } from './auction.repository';
import { BidRepository } from './bid.repository';
import { BidProcessor } from './bid.processor';
import { QueueModule } from '../../queue/queue.module';
import { StripeProvider } from '../../providers/stripe.provider';

@Module({
    imports: [
        QueueModule,
    ],
    controllers: [AuctionController, BidController],
    providers: [
        PrismaService,
        AuctionService,
        BidService,
        AuctionRepository,
        BidRepository,
        BidProcessor,
        StripeProvider,
    ],
    exports: [AuctionService, BidService, AuctionRepository, BidRepository],
})
export class BiddingModule {}
