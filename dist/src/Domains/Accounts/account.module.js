"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const accounts_repository_1 = require("./accounts.repository");
const address_service_1 = require("./address.service");
const address_repository_1 = require("./address.repository");
const accounts_controller_js_1 = require("../../../src/Controllers/Accounts/accounts.controller.js");
const address_controller_1 = require("../../../src/Controllers/Accounts/address.controller");
const upload_controller_1 = require("../../../src/Controllers/Accounts/upload.controller");
const s3module_module_1 = require("../s3module/s3module.module");
const product_module_1 = require("../Products/product.module");
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [s3module_module_1.S3moduleModule, product_module_1.ProductModule],
        controllers: [accounts_controller_js_1.AccountsController, address_controller_1.AddressController, upload_controller_1.UploadController],
        providers: [
            accounts_service_1.AccountsService,
            accounts_repository_1.AccountsRepository,
            address_service_1.AddressService,
            address_repository_1.AddressRepository,
        ],
    })
], AccountModule);
//# sourceMappingURL=account.module.js.map