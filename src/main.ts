import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { KindeAuthGuard } from './Guards';
import { useNestTreblle } from "treblle";




async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // // const app = await NestFactory.create(AppModule);
  // const expressInstance = app.getHttpAdapter().getInstance();

  // useNestTreblle(expressInstance, {
  //   sdkToken: process.env.TREBLLE_SDK_TOKEN!,
  //   apiKey: process.env.TREBLLE_API_KEY!,
  // });


  // add any global middleware or configurations here\
  // app.useGlobalGuards(new KindeAuthGuard())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips out properties that are not expected
  })); 

  app.enableCors({
    origin: ['https://biddingapp-v2.vercel.app/', 'http://localhost:3000', 'https://bidmarket.kinde.com'], // Specify allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Specify allowed methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Specify allowed headers
    credentials: true, // Allow cookies or authorization headers to be sent
  });


  
  
  await app.listen(4000);
}
bootstrap();
