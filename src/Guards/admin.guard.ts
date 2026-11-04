import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Must run after KindeAuthGuard (which populates request.user.kindeId).
 * Usage: @UseGuards(KindeAuthGuard, AdminGuard)
 */
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const kindeId = request.user?.kindeId;

        if (!kindeId) {
            throw new ForbiddenException('User not authenticated');
        }

        const account = await this.prisma.account.findUnique({
            where: { kindeId },
            select: { roleName: true },
        });

        if (!account || account.roleName !== 'ADMIN') {
            throw new ForbiddenException('Admin access required');
        }

        return true;
    }
}
