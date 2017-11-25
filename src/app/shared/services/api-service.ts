import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  private baseUrl = 'https://api.icndb.com';

  constructor(private http: HttpClient) { }

  fetchRandomJoke(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jokes/random`);
  }

}
