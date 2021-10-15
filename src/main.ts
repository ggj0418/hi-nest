import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// NestJS에서 컨트롤러는 그냥 url을 가져오는 역할
// 하지만 Service는 비지니스 로직 (실제로 function을 가지는 부분)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO로 설정한 클래스의 필드 이외의 값들은 무시해버린다
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(8080);
}
bootstrap();
