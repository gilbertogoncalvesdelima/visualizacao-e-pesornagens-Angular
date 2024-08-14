import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character';
import { CHARACTER } from '../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class RickMortyApiService {
  constructor(private readonly http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(CHARACTER);
  }

  searchCharacter(name: string): Observable<Character[]> {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return this.getCharacters();
    }

    const params = new HttpParams().set('name', trimmedName);
    return this.http.get<Character[]>(CHARACTER, { params });
  }
}
