import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { KindeAuthGuard } from './Guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add any global middleware or configurations here\
  // app.useGlobalGuards(new KindeAuthGuard())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips out properties that are not expected
  })); 

  app.enableCors({
    origin: ['https://www.your-frontend-domain.com', 'http://localhost:3000'], // Specify allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Specify allowed methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Specify allowed headers
    credentials: true, // Allow cookies or authorization headers to be sent
  });


  
  
  await app.listen(4000);
}
bootstrap();
