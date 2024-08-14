import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RickMortyApiService } from './rick-morty-api.service';
import { CHARACTER } from '../constants/urls';
import { Character } from '../interfaces/character';

describe('RickMortyApiService', () => {
  let service: RickMortyApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickMortyApiService],
    });
    service = TestBed.inject(RickMortyApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch characters', () => {
    const mockCharacters: Character[] = [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: ''},
      { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: '' }
    ];

    service.getCharacters().subscribe((characters) => {
      expect(characters.length).toBe(2);
      expect(characters).toEqual(mockCharacters);
    });

    const req = httpMock.expectOne(`${CHARACTER}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacters);
  });

  it('should search characters by name', () => {
    const mockCharacter: Character[] = [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: ''}
    ];

    service.searchCharacter('Rick').subscribe((characters) => {
      expect(characters.length).toBe(1);
      expect(characters).toEqual(mockCharacter);
    });

    const req = httpMock.expectOne(`${CHARACTER}?name=Rick`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('name')).toBe('Rick');
    req.flush(mockCharacter);
  });

  it('should fetch all characters when search is called with an empty name', () => {
    const mockCharacters: Character[] = [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: ''},
      { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: '' }
    ];

    service.searchCharacter('').subscribe((characters) => {
      expect(characters.length).toBe(2);
      expect(characters).toEqual(mockCharacters);
    });

    const req = httpMock.expectOne(`${CHARACTER}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacters);
  });
});
