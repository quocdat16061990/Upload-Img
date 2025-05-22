"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Upload Cloud API')
        .setDescription('API documentation for Upload project')
        .setVersion('1.0')
        .addTag('upload')
        .build();
    app.enableCors({
        origin: ['http://localhost:5678', 'http://host.docker.internal:5678'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    });
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map