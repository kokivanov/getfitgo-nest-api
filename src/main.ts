import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtGuard } from './common/guards';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const reflector = new Reflector()
  app.useGlobalGuards(new JwtGuard(reflector))

  const cfg = require('./../package.json')
  const config = new DocumentBuilder()
    .setTitle(cfg.name)
    .setDescription(cfg.description)
    .setVersion(cfg.version)
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: "Enter JWT token."
    })
    .build();
  
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document);

  await app.listen(3333); 
}
bootstrap();
