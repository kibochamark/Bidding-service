"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const treblle_1 = require("treblle");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const expressInstance = app.getHttpAdapter().getInstance();
    (0, treblle_1.useNestTreblle)(expressInstance, {
        sdkToken: process.env.TREBLLE_SDK_TOKEN,
        apiKey: process.env.TREBLLE_API_KEY,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.enableCors({
        origin: ['https://biddingapp-v2.vercel.app/', 'http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map