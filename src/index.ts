// api/index.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { useNestTreblle } from 'treblle';

const server = express();
let nestApp: any;

async function bootstrap() {
    const nestApp = await NestFactory.create(
        AppModule,
        new ExpressAdapter(server)
    );

     // const app = await NestFactory.create(AppModule);
    const expressInstance = nestApp.getHttpAdapter().getInstance();
    
    useNestTreblle(expressInstance, {
        sdkToken: process.env.TREBLLE_SDK_TOKEN!,
        apiKey: process.env.TREBLLE_API_KEY!,
    });

    nestApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    nestApp.enableCors({
        origin: ['https://biddingapp-v2.vercel.app/', 'http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    });

    await nestApp.init();
    return server;
}

export default async function handler(req: express.Request, res: express.Response) {
    if (!nestApp) {
        nestApp = await bootstrap();
    }
    return nestApp(req, res);
}