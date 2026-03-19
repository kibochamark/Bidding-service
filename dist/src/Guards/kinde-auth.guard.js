"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KindeAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const jwks_rsa_1 = require("jwks-rsa");
let KindeAuthGuard = class KindeAuthGuard {
    constructor() {
        this.jwksClient = new jwks_rsa_1.JwksClient({
            jwksUri: process.env.KINDE_JWKS_URI ||
                `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
            cache: true,
            cacheMaxAge: 86400000,
            rateLimit: true,
            jwksRequestsPerMinute: 10,
        });
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No authentication token provided');
        }
        try {
            const decoded = jwt.decode(token, { complete: true });
            if (!((_a = decoded === null || decoded === void 0 ? void 0 : decoded.header) === null || _a === void 0 ? void 0 : _a.kid)) {
                throw new common_1.UnauthorizedException('Invalid token format');
            }
            const key = await this.jwksClient.getSigningKey(decoded.header.kid);
            const publicKey = key.getPublicKey();
            const payload = jwt.verify(token, publicKey, {
                audience: process.env.KINDE_CLIENT_ID,
                issuer: process.env.KINDE_ISSUER_URL,
            });
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
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token has expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            throw new common_1.UnauthorizedException('Token validation failed: ' + error.message);
        }
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.KindeAuthGuard = KindeAuthGuard;
exports.KindeAuthGuard = KindeAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KindeAuthGuard);
//# sourceMappingURL=kinde-auth.guard.js.map