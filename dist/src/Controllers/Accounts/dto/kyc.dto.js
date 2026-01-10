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
exports.StatusKycDto = exports.KycParamDto = exports.UpdateKycStatusDto = exports.SubmitKycDto = exports.KycDocumentDto = exports.DocumentType = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../../generated/prisma/enums");
var DocumentType;
(function (DocumentType) {
    DocumentType["NATIONAL_ID"] = "NATIONAL_ID";
    DocumentType["PASSPORT"] = "PASSPORT";
    DocumentType["DRIVERS_LICENSE"] = "DRIVERS_LICENSE";
    DocumentType["PROOF_OF_ADDRESS"] = "PROOF_OF_ADDRESS";
    DocumentType["SELFIE"] = "SELFIE";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
class KycDocumentDto {
}
exports.KycDocumentDto = KycDocumentDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KycDocumentDto.prototype, "accountId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(DocumentType),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KycDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KycDocumentDto.prototype, "idDocumentNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], KycDocumentDto.prototype, "idDocumentUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], KycDocumentDto.prototype, "proofOfAddressUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], KycDocumentDto.prototype, "selfieUrl", void 0);
class SubmitKycDto {
}
exports.SubmitKycDto = SubmitKycDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitKycDto.prototype, "accountId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitKycDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitKycDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitKycDto.prototype, "nationality", void 0);
class UpdateKycStatusDto {
}
exports.UpdateKycStatusDto = UpdateKycStatusDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enums_1.KycStatus),
    __metadata("design:type", String)
], UpdateKycStatusDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateKycStatusDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateKycStatusDto.prototype, "reviewedBy", void 0);
class KycParamDto {
}
exports.KycParamDto = KycParamDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KycParamDto.prototype, "id", void 0);
class StatusKycDto {
}
exports.StatusKycDto = StatusKycDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusKycDto.prototype, "status", void 0);
//# sourceMappingURL=kyc.dto.js.map