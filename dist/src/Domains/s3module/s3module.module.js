"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3moduleModule = void 0;
const common_1 = require("@nestjs/common");
const s3module_service_1 = require("./s3module.service");
let S3moduleModule = class S3moduleModule {
};
exports.S3moduleModule = S3moduleModule;
exports.S3moduleModule = S3moduleModule = __decorate([
    (0, common_1.Module)({
        providers: [s3module_service_1.S3moduleService],
        exports: [s3module_service_1.S3moduleService],
    })
], S3moduleModule);
//# sourceMappingURL=s3module.module.js.map