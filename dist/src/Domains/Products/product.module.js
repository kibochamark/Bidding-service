"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_repository_1 = require("./product.repository");
const category_service_1 = require("./category.service");
const products_controller_1 = require("../../../src/Controllers/Products/products.controller");
const categories_controller_1 = require("../../../src/Controllers/Products/categories.controller");
const bidding_module_1 = require("../Bidding/bidding.module");
const s3module_module_1 = require("../s3module/s3module.module");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [bidding_module_1.BiddingModule, s3module_module_1.S3moduleModule],
        controllers: [products_controller_1.ProductsController, categories_controller_1.CategoriesController],
        providers: [product_service_1.ProductService, product_repository_1.ProductRepository, category_service_1.CategoryService],
        exports: [product_service_1.ProductService, category_service_1.CategoryService],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map