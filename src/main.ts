import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add any global middleware or configurations here
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips out properties that are not expected
  })); 
  await app.listen(3000);
}
bootstrap();
