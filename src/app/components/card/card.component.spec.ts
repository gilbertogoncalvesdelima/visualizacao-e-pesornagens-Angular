import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { FavoritesService } from 'src/app/service/favorites.service';
import { of } from 'rxjs';
import { Character } from '../../interfaces/character';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let characterMock: Character;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FavoritesService', ['getFavorites']);

    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [{ provide: FavoritesService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    favoritesServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;

    // Mock Character using the URL provided
    characterMock = {
      id: 1,
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive',
    };
    component.character = characterMock;

    // Set initial favorite status
    favoritesServiceSpy.getFavorites.and.returnValue(of([{ id: 1 }]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the character is favorite on init', () => {
    component.ngOnInit();
    expect(component.isFavorite).toBeTrue();
  });

  it('should emit updateFavorite event when toggleFav is called', () => {
    spyOn(component.updateFavorite, 'emit');

    component.toggleFav();
    expect(component.updateFavorite.emit).toHaveBeenCalledWith(!component.isFavorite);
  });

  it('should display the character name', () => {
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('.character-name'));
    const element: HTMLElement = debugElement.nativeElement;
    expect(element.textContent).toContain('Rick Sanchez');
  });

  it('should have the correct image URL', () => {
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('img'));
    const element: HTMLImageElement = debugElement.nativeElement;
    expect(element.src).toContain('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
  });
});
