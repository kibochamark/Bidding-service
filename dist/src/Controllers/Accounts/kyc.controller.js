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
exports.KycController = void 0;
const common_1 = require("@nestjs/common");
const kyc_service_1 = require("../../../src/Domains/Accounts/kyc.service");
const dto_1 = require("./dto");
const enums_1 = require("../../../generated/prisma/enums");
let KycController = class KycController {
    constructor(kycService) {
        this.kycService = kycService;
    }
    async getAllKyc(status) {
        return await this.kycService.getAllKyc(status);
    }
    async getKycStatus(accountId) {
        return await this.kycService.getKycByAccountId(accountId);
    }
    async getKycById(params) {
        return await this.kycService.getKycById(params.id);
    }
    async submitKyc(submitKycDto) {
        return await this.kycService.submitKyc(submitKycDto);
    }
    async updateKycStatus(params, updateKycStatusDto) {
        return await this.kycService.updateKycStatus(params.id, updateKycStatusDto);
    }
    async deleteKyc(params) {
        return await this.kycService.deleteKyc(params.id);
    }
};
exports.KycController = KycController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getAllKyc", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Query)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getKycStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.KycParamDto]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getKycById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SubmitKycDto]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "submitKyc", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.KycParamDto,
        dto_1.UpdateKycStatusDto]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "updateKycStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.KycParamDto]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "deleteKyc", null);
exports.KycController = KycController = __decorate([
    (0, common_1.Controller)('kyc'),
    __metadata("design:paramtypes", [kyc_service_1.KycService])
], KycController);
//# sourceMappingURL=kyc.controller.js.map