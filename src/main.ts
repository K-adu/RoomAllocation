import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('EB Pearls MeetingRoomAllocation')
    .setDescription(
      'This page contains the APIs of the EB Pearls MeetingRoomAllocation',
    )
    .setVersion('1.0')
    .addTag('EB Pearls')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
