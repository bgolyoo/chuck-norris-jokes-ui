import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api-service';
import { JokeResponse } from '../classes/joke-renponse';
import { Joke } from '../classes/joke';

describe('ApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should have baseUrl defined', inject([ApiService], (service: ApiService) => {
    expect(service['baseUrl']).toEqual('https://api.icndb.com');
  }));

  describe('fetchRandomJoke', () => {
    it('should return a joke',
      inject([HttpClient, HttpTestingController, ApiService], (http: HttpClient, httpMock: HttpTestingController, service: ApiService) => {
        const mockJokeResponse = new JokeResponse('success', new Joke(1, 'Some cheesy Chuck Norris joke.', ['cheesy']));
        service.fetchRandomJoke().subscribe((jokeResponse: JokeResponse) => expect(jokeResponse).toEqual(mockJokeResponse));
        const req = httpMock.expectOne(`${service['baseUrl']}/jokes/random`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockJokeResponse);
        httpMock.verify();
      })
    );
  });

});
