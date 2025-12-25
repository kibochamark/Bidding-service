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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const address_repository_1 = require("./address.repository");
let AddressService = class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async getAddressesByAccountId(accountId) {
        try {
            return await this.addressRepository.findAddressesByAccountId(accountId);
        }
        catch (error) {
            if (error.status && error.status === 404) {
                return [];
            }
            throw error;
        }
    }
    async getAddressById(id) {
        try {
            return await this.addressRepository.findAddressById(id);
        }
        catch (error) {
            if (error.status && error.status === 404) {
                return null;
            }
            throw error;
        }
    }
    async createAddress(data) {
        try {
            return await this.addressRepository.createAddress(data);
        }
        catch (error) {
            throw error;
        }
    }
    async updateAddress(id, data) {
        try {
            return await this.addressRepository.updateAddress(id, data);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteAddress(id) {
        try {
            return await this.addressRepository.deleteAddress(id);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [address_repository_1.AddressRepository])
], AddressService);
//# sourceMappingURL=address.service.js.map