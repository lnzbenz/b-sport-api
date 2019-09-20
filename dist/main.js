"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const BodyParser = require("body-parser");
const express = require("express");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.setGlobalPrefix('api');
    await app.use(BodyParser.json({ limit: '200mb' }));
    await app.use(BodyParser.urlencoded({ extended: true }));
    await app.use(express.static('public'));
    await app.enableCors();
    const options = await new swagger_1.DocumentBuilder()
        .setTitle('api')
        .setBasePath('api')
        .setDescription('z api')
        .setVersion('0.0.1')
        .build();
    const docs = await swagger_1.SwaggerModule.createDocument(app, options);
    await swagger_1.SwaggerModule.setup('/api/docs', app, docs);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map