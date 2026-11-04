import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { ROLES_KEY } from './roles.decorator';
import { REQUIRE_AUTH_KEY } from './require-auth.decorator';

/**
 * Registered globally (APP_GUARD) so it runs on every request.
 * Routes are open by default: only ones decorated with @RequireAuth(),
 * @RequirePermissions(...) or @RequireRoles(...) require a valid Kinde
 * token. Roles/permissions are read straight from the Kinde JWT —
 * Kinde is the source of truth, there's no local roles table.
 */
@Injectable()
export class RbacGuard implements CanActivate {
    private jwksClient: JwksClient;

    constructor(private reflector: Reflector) {
        this.jwksClient = new JwksClient({
            jwksUri:
                process.env.KINDE_JWKS_URI ||
                `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
            cache: true,
            cacheMaxAge: 86400000, // 24 hours
            rateLimit: true,
            jwksRequestsPerMinute: 10,
        });
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
            PERMISSIONS_KEY,
            [context.getHandler(), context.getClass()],
        );
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        const requiresAuth = this.reflector.getAllAndOverride<boolean>(
            REQUIRE_AUTH_KEY,
            [context.getHandler(), context.getClass()],
        );

        const needsCheck =
            requiresAuth || !!requiredPermissions?.length || !!requiredRoles?.length;

        if (!needsCheck) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No authentication token provided');
        }

        const user = await this.verifyToken(token);
        request['user'] = user;

        if (requiredPermissions?.length) {
            const hasAllPermissions = requiredPermissions.every((permission) =>
                user.permissions.includes(permission),
            );
            if (!hasAllPermissions) {
                throw new ForbiddenException(
                    `Missing required permissions: ${requiredPermissions.join(', ')}`,
                );
            }
        }

        if (requiredRoles?.length) {
            const hasRole = requiredRoles.some((role) =>
                user.roles.some((r: { key: string }) => r.key === role),
            );
            if (!hasRole) {
                throw new ForbiddenException(
                    `Missing required role: ${requiredRoles.join(', ')}`,
                );
            }
        }

        return true;
    }

    private async verifyToken(token: string) {
        const decoded = jwt.decode(token, { complete: true }) as {
            header?: { kid?: string };
        };

        if (!decoded?.header?.kid) {
            throw new UnauthorizedException('Invalid token format');
        }

        try {
            const key = await this.jwksClient.getSigningKey(decoded.header.kid);
            const publicKey = key.getPublicKey();

            const payload = jwt.verify(token, publicKey, {
                audience: process.env.KINDE_CLIENT_ID,
                issuer: process.env.KINDE_ISSUER_URL,
            }) as any;

            return {
                kindeId: payload.sub,
                email: payload.email,
                givenName: payload.given_name,
                familyName: payload.family_name,
                permissions: payload.permissions || [],
                roles: payload.roles || [],
                orgCode: payload.org_code,
            };
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token has expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Invalid token');
            }
            throw new UnauthorizedException(
                'Token validation failed: ' + error.message,
            );
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
