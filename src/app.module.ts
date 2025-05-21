import { Module } from '@nestjs/common';
import { CloudinaryModule } from './domain/upload/upload-module';

@Module({
  imports: [CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
