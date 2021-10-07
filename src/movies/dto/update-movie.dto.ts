import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// PartialType의 경우에는 기본으로 사용할 DTO가 필요한데 필드들이 전부 필수값이 아니게 바뀐다
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
