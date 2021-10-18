import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app/app.controller';
import { ImageModule } from './image/image.module';

// 여기 AppModule 안에 너가 만들려고 하는 모든 것들이 들어가야한다
// 왜냐하면 main.ts에서 NestJS가 어플리케이션을 만들기 위해 사용하는 것이 AppModule이기 때문이다
@Module({
  imports: [MoviesModule, ImageModule],
  // url을 가져오고 함수를 실행하는 역할 (express의 router 역할)
  // 여기에 홈페이지 컨트롤러 (ex. AppController)를 넣어서 홈페이지 라우팅을 가능하게 할 수도 있다
  controllers: [AppController],
  // 실질적인 로직이 실행되는 역할 (쿼리 처리)
  providers: [],
})
export class AppModule {}
