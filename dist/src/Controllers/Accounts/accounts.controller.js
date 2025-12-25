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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../../../src/Domains/Accounts/accounts.service");
const index_js_1 = require("./dto/index.js");
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    async getAllAccounts() {
        return await this.accountsService.getAllAccounts();
    }
    async createAccount(account, authHeader) {
        const kindewebhook = await (import('@kinde/webhooks'));
        console.log('Received webhook for account creation', account);
        const token = authHeader.split('Bearer')[1].trim();
        const decodedWebhook = await kindewebhook.decodeWebhook(token, "https://bidmarket.kinde.com");
        if (!decodedWebhook || decodedWebhook.type !== kindewebhook.WebhookEventType.UserCreated) {
            throw new Error('Invalid webhook event');
        }
        return await this.accountsService.createAccount(account);
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_js_1.CreateAccountDto, String]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)(':kindeId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_js_1.AccountParamDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getAccountByKindeId", null);
exports.AccountsController = AccountsController = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map