import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character';
import { CHARACTER } from '../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class RickMortyApiService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Array<Character>>(CHARACTER);
  }

  searchCharacter(name: string): Observable<Character[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Character[]>(CHARACTER, { params })
  }

}
