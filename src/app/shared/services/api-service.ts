import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JokeResponse } from '../classes/joke-renponse';

@Injectable()
export class ApiService {

  private baseUrl = 'https://api.icndb.com';

  constructor(private http: HttpClient) { }

  fetchRandomJoke(): Observable<JokeResponse> {
    return this.http.get<JokeResponse>(`${this.baseUrl}/jokes/random`);
  }

}
