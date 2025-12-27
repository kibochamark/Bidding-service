"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const common_1 = require("@nestjs/common");
const server = (0, express_1.default)();
let nestApp;
async function bootstrap() {
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    nestApp.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    nestApp.enableCors({
        origin: ['https://biddingapp-v2.vercel.app/', 'http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    });
    await nestApp.init();
    return server;
}
async function handler(req, res) {
    if (!nestApp) {
        nestApp = await bootstrap();
    }
    return nestApp(req, res);
}
//# sourceMappingURL=index.js.map