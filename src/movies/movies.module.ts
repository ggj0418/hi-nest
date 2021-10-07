import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

// nestJS가 MoviesService를 import하고 Controller에 주입하는 형태
@Module({
  controllers: [MoviesController], // url을 가져오고 함수를 실행하는 역할 (express의 router 역할)
  providers: [MoviesService], // 실질적인 로직이 실행되는 역할 (쿼리 처리)
})
export class MoviesModule {}
