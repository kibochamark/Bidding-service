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
var AccountsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../../../src/Domains/Accounts/accounts.service");
const index_js_1 = require("./dto/index.js");
const bodyParser = __importStar(require("body-parser"));
let AccountsController = AccountsController_1 = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
        this.jwtBodyParser = bodyParser.text({ type: 'application/jwt' });
        this.logger = new common_1.Logger(AccountsController_1.name);
    }
    async getAllAccounts() {
        return await this.accountsService.getAllAccounts();
    }
    async createAccount(req, res) {
        this.jwtBodyParser(req, res, async () => {
            const token = req.body;
            console.log('Received webhook with token:', token);
            try {
                const kindewebhook = await (import('@kinde/webhooks'));
                const decodedWebhook = await kindewebhook.decodeWebhook(token, "https://bidmarket.kinde.com");
                if (!decodedWebhook || decodedWebhook.type !== kindewebhook.WebhookEventType.UserCreated) {
                    throw new Error('Invalid webhook event');
                }
                this.logger.log(`Processing Kinde webhook of type: ${JSON.stringify(decodedWebhook)}`);
                const account = {
                    type: decodedWebhook.type,
                    ...decodedWebhook.data
                };
                return await this.accountsService.createAccount(account);
            }
            catch (error) {
                return { error: 'Failed to process webhook', details: error.message };
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
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Response]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)(':kindeId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_js_1.AccountParamDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getAccountByKindeId", null);
exports.AccountsController = AccountsController = AccountsController_1 = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map