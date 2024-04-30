import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesKey = 'favorites';
  private favorites: Array<Character> = [];
  private favoriteCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private favoritesSubject: BehaviorSubject<Array<Character>> =
    new BehaviorSubject<Array<Character>>([]);

  constructor() { }

  private updateFavoritesData(): void {
    this.favoritesSubject.next(this.favorites);
    this.favoriteCountSubject.next(this.favorites.length);
  }

  public getFavorites(): Observable<Array<Character>> {
    return this.favoritesSubject.asObservable();
  }

  public addFavorite(character: Character): void {
    if (!this.favorites.some(fav => fav.id === character.id)) {
      this.favorites.push(character);
      this.updateFavoritesData();
    }
  }

  public removeFavorite(character: Character): void {
    this.favorites = this.favorites.filter(fav => fav.id !== character.id);
    this.updateFavoritesData();
  }

  getFavoriteCount(): Observable<number> {
    return this.favoriteCountSubject.asObservable();
  }
}
