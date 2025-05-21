import { Controller, Post, Body } from '@nestjs/common';
import { CloudinaryService } from './upload-service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('upload') // Thêm tag cho API
@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image-from-url')
  @ApiOperation({ summary: 'Upload an image from URL to Cloudinary' }) // Mô tả API
  @ApiBody({
    description: 'URL of the image to be uploaded', // Mô tả về tham số
    type: Object, // Định dạng tham số là đối tượng
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: 'https://example.com/image.jpg', // Ví dụ về URL
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async uploadImageFromUrl(@Body() body: { url: string }) {
    const { url } = body;
    const result = await this.cloudinaryService.captureScreenshotFromUrl(url);
    return { message: 'Image uploaded successfully', result };
  }
}
