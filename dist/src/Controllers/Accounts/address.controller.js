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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const address_service_1 = require("../../../src/Domains/Accounts/address.service");
const dto_1 = require("./dto");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async getAddressesByAccountId(accountId) {
        return await this.addressService.getAddressesByAccountId(accountId);
    }
    async getAddressById(params) {
        return await this.addressService.getAddressById(params.id);
    }
    async createAddress(createAddressDto) {
        return await this.addressService.createAddress(createAddressDto);
    }
    async updateAddress(params, updateAddressDto) {
        return await this.addressService.updateAddress(params.id, updateAddressDto);
    }
    async deleteAddress(params) {
        return await this.addressService.deleteAddress(params.id);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddressesByAccountId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AddressParamDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddressById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "createAddress", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AddressParamDto,
        dto_1.UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AddressParamDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "deleteAddress", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.Controller)('addresses'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map