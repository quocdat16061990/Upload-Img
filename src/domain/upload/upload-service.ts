import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import puppeteer from 'puppeteer'; // Import Puppeteer

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Thêm chức năng chụp ảnh màn hình từ URL và upload lên Cloudinary
  async captureScreenshotFromUrl(url: string): Promise<string> {
    // Chạy Puppeteer để mở trang và chụp ảnh màn hình
    23

  const browser = await puppeteer.launch({
      executablePath: '/home/sbx_user1051/.cache/puppeteer/chrome/136.0.7103.94/chrome-linux/chrome', // Đường dẫn cụ thể đến Chrome
    })

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' }); // Đảm bảo trang đã tải xong
    const screenshotBuffer = await page.screenshot();  // Chụp ảnh trang web mà không định dạng cụ thể
    await browser.close();

    // Tạo tên file duy nhất, không cần phần mở rộng
    const fileName = `tradingview_image_${Date.now()}`;  // Tên file sẽ không có phần mở rộng

    // Upload ảnh chụp màn hình lên Cloudinary
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { resource_type: 'image', public_id: fileName },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url as any);  // Trả về URL của ảnh đã upload
          }
        },
      ).end(screenshotBuffer); // Upload buffer lên Cloudinary
    });
  }
}
