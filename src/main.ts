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
    app.enableCors({
    origin: ['*'], // Cho phép kết nối từ n8n
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger sẽ được truy cập tại /api

  await app.listen(port,'0.0.0.0');
}
bootstrap();
