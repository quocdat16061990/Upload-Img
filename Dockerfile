# Chọn base image Node.js mới nhất
FROM node:latest

# Cài đặt các thư viện hệ thống cần thiết (bao gồm Chromium cho Puppeteer)
RUN apt-get update && apt-get install -y \
  bash \
  curl \
  libx11-6 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  chromium \
  libnss3 \
  && rm -rf /var/lib/apt/lists/*

# Tạo thư mục làm việc và sao chép các file cần thiết
WORKDIR /app
COPY package*.json ./

# Cài đặt các phụ thuộc Node.js
RUN npm install

# Sao chép mã nguồn vào container
COPY . .

# Biên dịch ứng dụng NestJS
RUN npm run build

# Mở cổng 3000
EXPOSE 3000

# Đặt biến môi trường cho Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Khởi động ứng dụng
CMD ["npm", "run", "start:prod"]
