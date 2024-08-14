import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FavoritesService } from 'src/app/service/favorites.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Criando mocks dos serviços
    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['getFavoriteCount']);
    const routerSpy = jasmine.createSpyObj('Router', [], { url: '/home' });

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mocking the return value of getFavoriteCount
    favoritesService.getFavoriteCount.and.returnValue(of(5));

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize favoriteCount$', () => {
    component.ngOnInit();
    component.favoriteCount$.subscribe((count) => {
      expect(count).toBe(5);
    });
    expect(favoritesService.getFavoriteCount).toHaveBeenCalled();
  });

  it('should return true if the route is active', () => {
    const isActive = component.isActive('/home');
    expect(isActive).toBeTrue();
  });

  it('should return false if the route is not active', () => {
    const isActive = component.isActive('/about');
    expect(isActive).toBeFalse();
  });
});
