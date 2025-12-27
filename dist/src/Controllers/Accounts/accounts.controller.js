"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AccountsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../../../src/Domains/Accounts/accounts.service");
const index_js_1 = require("./dto/index.js");
const bodyParser = __importStar(require("body-parser"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@nestjs/config");
let AccountsController = AccountsController_1 = class AccountsController {
    constructor(accountsService, configService) {
        this.accountsService = accountsService;
        this.configService = configService;
        this.jwtBodyParser = bodyParser.text({ type: 'application/jwt' });
        this.logger = new common_1.Logger(AccountsController_1.name);
    }
    async getAllAccounts() {
        return await this.accountsService.getAllAccounts();
    }
    async createAccount(req, res) {
        this.jwtBodyParser(req, res, async () => {
            try {
                const token = req.body;
                const client = (0, jwks_rsa_1.default)({
                    jwksUri: this.configService.get('KINDE_JWKS_URI', 'https://bidmarket.kinde.com/.well-known/jwks.json'),
                });
                const { header } = jsonwebtoken_1.default.decode(token, { complete: true });
                const { kid } = header;
                const key = await client.getSigningKey(kid);
                const signingKey = key.getPublicKey();
                const event = await jsonwebtoken_1.default.verify(token, signingKey);
                switch (event.type) {
                    case 'user.created':
                        this.logger.log('Processing user.created event');
                        const account = {
                            type: event.type,
                            ...event.data.user
                        };
                        const result = await this.accountsService.createAccount(account);
                        return res.status(201).json({ success: true, data: result });
                    default:
                        this.logger.warn(`Unhandled webhook event type: ${event.type}`);
                        return res.status(400).json({ error: 'Unhandled event type', type: event.type });
                }
            }
            catch (error) {
                this.logger.error('Failed to process webhook', error);
                return res.status(500).json({ error: 'Failed to process webhook', details: error.message });
            }
        });
    }
    async deleteAccount(req, res) {
        this.jwtBodyParser(req, res, async () => {
            try {
                const token = req.body;
                const client = (0, jwks_rsa_1.default)({
                    jwksUri: `https://bidmarket.kinde.com/.well-known/jwks.json`,
                });
                const { header } = jsonwebtoken_1.default.decode(token, { complete: true });
                const { kid } = header;
                const key = await client.getSigningKey(kid);
                const signingKey = key.getPublicKey();
                const event = await jsonwebtoken_1.default.verify(token, signingKey);
                switch (event.type) {
                    case 'user.deleted':
                        this.logger.log('Processing user.deleted event');
                        await this.accountsService.deleteAccountByKindeId(event.data.user.id);
                        return res.status(200).json({ success: true, message: 'Account deleted successfully' });
                    default:
                        this.logger.warn(`Unhandled webhook event type: ${event.type}`);
                        return res.status(400).json({ error: 'Unhandled event type', type: event.type });
                }
            }
            catch (error) {
                this.logger.error('Failed to process webhook', error);
                return res.status(500).json({ error: 'Failed to process webhook', details: error.message });
            }
        });
    }
    async getAccountByKindeId(params) {
        return await this.accountsService.getAccountByKindeId(params);
    }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getAllAccounts", null);
__decorate([
    (0, common_1.Post)('createwebhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Post)('deletewebhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Get)(':kindeId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_js_1.AccountParamDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getAccountByKindeId", null);
exports.AccountsController = AccountsController = AccountsController_1 = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService, config_1.ConfigService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map