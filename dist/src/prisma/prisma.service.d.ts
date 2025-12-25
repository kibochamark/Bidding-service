import { PrismaClient } from '../../generated/prisma/client';
import { ConfigService } from '@nestjs/config';
export declare class PrismaService extends PrismaClient {
    private config?;
    constructor(config?: ConfigService | undefined);
}
