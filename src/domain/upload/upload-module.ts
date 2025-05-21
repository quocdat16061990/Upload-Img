import { Module } from '@nestjs/common';
import { CloudinaryService } from './upload-service';
import { CloudinaryController } from './upload-controller';

@Module({
  imports: [],
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
})
export class CloudinaryModule {}