import {
    Controller,
    Sse,
    MessageEvent,
    Param,
    OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { Observable, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Controller('notifications')
export class PaymentNotificationController implements OnModuleDestroy {
    private subscriber: Redis;

    constructor(private configService: ConfigService) {
        this.subscriber = new Redis({
            host: this.configService.get('REDIS_HOST'),
            port: Number(this.configService.get('REDIS_PORT')),
            password: this.configService.get('REDIS_PASSWORD'),
        });
    }

    @Sse('payment/:bidderId')
    sse(@Param('bidderId') bidderId: string): Observable<MessageEvent> {
        const channel = `payment:${bidderId}`;

        void this.subscriber.subscribe(channel);

        return fromEvent<[string, string]>(
            this.subscriber,
            'message',
        ).pipe(
            map(([receivedChannel, message]) => {
                if (receivedChannel !== channel) {
                    return null;
                }

                return {
                    data: JSON.parse(message),
                } satisfies MessageEvent;
            }),
            filter(
                (event): event is MessageEvent =>
                    event !== null,
            ),
        );
    }

    onModuleDestroy() {
        this.subscriber.disconnect();
    }
}