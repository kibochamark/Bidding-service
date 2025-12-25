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
var AccountsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const accounts_repository_1 = require("./accounts.repository");
let AccountsService = AccountsService_1 = class AccountsService {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
        this.logger = new common_1.Logger(AccountsService_1.name);
    }
    async getAllAccounts() {
        return await this.accountRepository.findAllAccounts();
    }
    async createAccount(webhookData) {
        this.logger.log(`Received webhook: ${webhookData.type}`);
        if (webhookData.type !== 'user.created') {
            this.logger.warn(`Unhandled webhook type: ${webhookData.type}`);
            throw new common_1.BadRequestException(`Unsupported webhook type: ${webhookData.type}`);
        }
        const kindeUser = webhookData.data.user;
        this.logger.log(`Creating account for Kinde user: ${kindeUser.id}`);
        const existingAccount = await this.accountRepository.findAccountByKindeIdRaw(kindeUser.id);
        if (existingAccount) {
            this.logger.log(`Account already exists for Kinde ID: ${kindeUser.id}`);
            return existingAccount;
        }
        return await this.accountRepository.createAccountFromWebhook({
            kindeId: kindeUser.id,
        });
    }
    async getAccountByKindeId(data) {
        return await this.accountRepository.findAccountByKindeId(data);
    }
    async updateAccount(kindeId, data) {
        const existingAccount = await this.accountRepository.findAccountByKindeIdRaw(kindeId);
        if (!existingAccount) {
            this.logger.warn(`Account not found for Kinde ID: ${kindeId}`);
            throw new common_1.BadRequestException(`Account not found for Kinde ID: ${kindeId}`);
        }
        this.logger.log(`Update account with : ${kindeId}`);
        return await this.accountRepository.updateAccount(kindeId, data);
    }
    async deleteAccountByKindeId(kindeId) {
        const existingAccount = await this.accountRepository.findAccountByKindeIdRaw(kindeId);
        if (!existingAccount) {
            this.logger.warn(`Account not found for Kinde ID: ${kindeId}`);
            throw new common_1.BadRequestException(`Account not found for Kinde ID: ${kindeId}`);
        }
        this.logger.log(`Delete account with : ${kindeId}`);
        return await this.accountRepository.deleteAccountByKindeId(kindeId);
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = AccountsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accounts_repository_1.AccountsRepository])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map