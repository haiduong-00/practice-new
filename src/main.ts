import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { BanGuard } from './ban.guard';
// import { SECRET_KEY } from './user/config/secret';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(BanGuard);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  // console.log(SECRET_KEY);
}
bootstrap();
