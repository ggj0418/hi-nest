import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// unit 테스팅은 시스템에서 function 같은 하나의 유닛만을 테스트 하는 것이고
// e2e 테스팅은 전체 시스템을 테스트 하는 것이다
// describe는 테스트를 정의하는 루트 함수
describe('MoviesService', () => {
  let service: MoviesService;

  // beforeEach는 테스트 시작 전에 하는 행동을 정의하는 함수
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // beforeAll는 테스트 시작전에 전체적으로 정의하는 함수
  // afterAll는 테스트 완료 후를 정의하는 함수 (ex. DB 비우기)
  // afterEach

  // 실제 테스트 코드
  // 작은따옴표 안에 있는 값은 테스트에 대한 설명
  it('should be defined', () => {
    // expect는 테스트해볼 내용이고 뒤에 붙은 것은 기대되는 테스트 결과값
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found');
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const all_movies = service.getAll().length;
      service.deleteOne(1);
      const after_delete = service.getAll().length;

      expect(after_delete).toBeLessThan(all_movies);
    });

    it('sholud throw a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const before_create = service.getAll().length;
      service.create({
        title: 'Test Movie1',
        genres: ['test'],
        year: 2000,
      });
      service.create({
        title: 'Test Movie2',
        genres: ['test'],
        year: 2001,
      });
      const after_create = service.getAll().length;

      console.log(before_create, after_create);
      expect(after_create).toBeGreaterThan(before_create);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('sholud throw a 404', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
