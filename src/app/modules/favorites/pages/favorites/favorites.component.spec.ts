import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from 'src/app/service/favorites.service';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender?: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesServiceMock: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['getFavorites', 'removeFavorite']);

    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    favoritesServiceMock = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on init', () => {
    const mockFavorites: Character[] = [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', origin: { name: 'Earth' }, location: { name: 'Earth' }, image: '', episode: [], url: '', created: '' },
      { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', gender: 'Male', origin: { name: 'Earth' }, location: { name: 'Earth' }, image: '', episode: [], url: '', created: '' }
    ];

    favoritesServiceMock.getFavorites.and.returnValue(of(mockFavorites));

    fixture.detectChanges();

    expect(component.favorites).toEqual(mockFavorites);
    expect(favoritesServiceMock.getFavorites).toHaveBeenCalled();
  });

  it('should remove a favorite and reload favorites', () => {
    const characterToRemove: Character = {
      id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', origin: { name: 'Earth' }, location: { name: 'Earth' }, image: '', episode: [], url: '', created: ''
    };

    favoritesServiceMock.getFavorites.and.returnValue(of([])); // Simulate empty favorites after removal

    component.removeFavorite(characterToRemove);

    expect(favoritesServiceMock.removeFavorite).toHaveBeenCalledWith(characterToRemove);
    expect(favoritesServiceMock.getFavorites).toHaveBeenCalled();
    expect(component.favorites.length).toBe(0);
  });
});
