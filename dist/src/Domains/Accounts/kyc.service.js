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
var KycService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycService = void 0;
const common_1 = require("@nestjs/common");
const kyc_repository_1 = require("./kyc.repository");
let KycService = KycService_1 = class KycService {
    constructor(kycRepository) {
        this.kycRepository = kycRepository;
        this.logger = new common_1.Logger(KycService_1.name);
    }
    async getKycByAccountId(accountId) {
        return await this.kycRepository.findKycByAccountId(accountId);
    }
    async getKycById(id) {
        return await this.kycRepository.findKycById(id);
    }
    async getAllKyc(status) {
        return await this.kycRepository.findAllKyc(status);
    }
    async submitKyc(data) {
        this.logger.log(`KYC submission for account: ${data.accountId}`);
        return await this.kycRepository.submitKyc(data);
    }
    async updateKycStatus(id, data) {
        this.logger.log(`Updating KYC ${id} to status: ${data.status} by admin: ${data.reviewedBy}`);
        return await this.kycRepository.updateKycStatus(id, data);
    }
    async deleteKyc(id) {
        this.logger.log(`Deleting KYC profile: ${id}`);
        return await this.kycRepository.deleteKyc(id);
    }
};
exports.KycService = KycService;
exports.KycService = KycService = KycService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kyc_repository_1.KycRepository])
], KycService);
//# sourceMappingURL=kyc.service.js.map