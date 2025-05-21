import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';  
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Upload Cloud API')
    .setDescription('API documentation for Upload project')
    .setVersion('1.0')
    .addTag('upload') // Thêm tag nếu cần phân loại các route
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger sẽ được truy cập tại /api

  await app.listen(port);
}
bootstrap();
