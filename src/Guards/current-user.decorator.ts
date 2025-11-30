import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface KindeUser {
    kindeId: string;
    email: string;
    givenName?: string;
    familyName?: string;
    permissions: string[];
    roles: Array<{ key: string; name: string }>;
}

/**
 * Decorator to extract the current authenticated user from the request
 * Usage: @CurrentUser() user: KindeUser
 */
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): KindeUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
