import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  // 생성사의 파라미터로 전달된 필드들은 따로 선언되지 않았더라도 접근제한자 그대로 자동 생성된다
  constructor(private readonly moviesService: MoviesService) {}

  // 이렇게 직접 Express 객체에 접근할 수도 있지만, 하지 않는 것이 권장됨
  // @Get()
  // getSome(@Req() req, @Res() res) {
  //   return '';
  // }

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // 조회
  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    console.log(typeof id);
    return this.moviesService.getOne(id);
  }

  // 생성
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  // 삭제
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  // 전체 수정
  @Put('/:id')
  updateAll(@Param('id') id: string) {
    return `This will update a whole info of movie with the id: ${id}`;
  }

  // 일부 수정
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
