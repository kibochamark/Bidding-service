"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const account_module_1 = require("./Domains/Accounts/account.module");
const product_module_1 = require("./Domains/Products/product.module");
const bidding_module_1 = require("./Domains/Bidding/bidding.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const s3module_module_1 = require("./Domains/s3module/s3module.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            account_module_1.AccountModule,
            product_module_1.ProductModule,
            bidding_module_1.BiddingModule,
            prisma_module_1.PrismaModule,
            s3module_module_1.S3moduleModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map