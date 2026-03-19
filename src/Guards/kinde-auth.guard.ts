import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

@Injectable()
export class KindeAuthGuard implements CanActivate {
    private jwksClient: JwksClient;

    constructor() {
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
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No authentication token provided');
        }

        try {
            const decoded = jwt.decode(token, { complete: true }) as {
                header?: { kid?: string };
            };

            if (!decoded?.header?.kid) {
                throw new UnauthorizedException('Invalid token format');
            }

            const key = await this.jwksClient.getSigningKey(decoded.header.kid);
            const publicKey = key.getPublicKey();

            const payload = jwt.verify(token, publicKey, {
                audience: process.env.KINDE_CLIENT_ID,
                issuer: process.env.KINDE_ISSUER_URL,
            }) as any;

            request['user'] = {
                kindeId: payload.sub,
                email: payload.email,
                givenName: payload.given_name,
                familyName: payload.family_name,
                permissions: payload.permissions || [],
                roles: payload.roles || [],
                orgCode: payload.org_code,
            };

            return true;
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