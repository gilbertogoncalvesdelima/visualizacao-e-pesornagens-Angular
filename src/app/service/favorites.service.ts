import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly favoritesKey = 'favorites';
  private favorites: Character[] = [];
  private favoritesSubject = new BehaviorSubject<Character[]>([]);
  private favoriteCountSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadFavoritesFromStorage();
  }

  private loadFavoritesFromStorage(): void {
    const storedFavorites = localStorage.getItem(this.favoritesKey);
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
      this.updateFavoritesData();
    }
  }

  private saveFavoritesToStorage(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
  }

  private updateFavoritesData(): void {
    this.favoritesSubject.next([...this.favorites]);
    this.favoriteCountSubject.next(this.favorites.length);
    this.saveFavoritesToStorage();
  }

  public getFavorites(): Observable<Character[]> {
    return this.favoritesSubject.asObservable();
  }

  public addFavorite(character: Character): void {
    if (!this.isFavorite(character.id)) {
      this.favorites.push(character);
      this.updateFavoritesData();
    }
  }

  public removeFavorite(character: Character): void {
    this.favorites = this.favorites.filter(fav => fav.id !== character.id);
    this.updateFavoritesData();
  }

  public getFavoriteCount(): Observable<number> {
    return this.favoriteCountSubject.asObservable();
  }

  private isFavorite(characterId: number): boolean {
    return this.favorites.some(fav => fav.id === characterId);
  }
}
