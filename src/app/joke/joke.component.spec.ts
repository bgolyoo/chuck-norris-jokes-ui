import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../shared/services/api-service';
import { JokeComponent } from './joke.component';
import { JokeResponse } from '../shared/classes/joke-renponse';
import { Joke } from '../shared/classes/joke';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [JokeComponent],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create joke with undefined value', () => {
    expect(component.joke).toBeUndefined();
  });

  describe('ngOnInit', () => {
    it('should call fetchRandomJoke method', () => {
      const fetchRandomJoke = spyOn(component, 'fetchRandomJoke').and.callFake(() => { return; });
      component.ngOnInit();
      expect(fetchRandomJoke).toHaveBeenCalled();
    });
  });

  describe('fetchRandomJoke', () => {
    it('should call fetchRandomJoke method in ApiService and set joke if call is successful',
      inject([ApiService], (apiService: ApiService) => {
        const mockJokeResponse = new JokeResponse('success', new Joke(1, 'Some cheesy Chuck Norris joke.', ['cheesy']));
        const fetchRandomJoke = spyOn(apiService, 'fetchRandomJoke')
          .and.returnValue(Observable.create(observer => observer.next(mockJokeResponse)));
        component.fetchRandomJoke();
        expect(fetchRandomJoke).toHaveBeenCalled();
        expect(component.joke).toEqual(mockJokeResponse.value);
      })
    );
    it('should call fetchRandomJoke method in ApiService and write error on console if call is unsuccessful',
      inject([ApiService], (apiService: ApiService) => {
        const mockError = new Error('Unsuccessful API call.');
        const consoleError = spyOn(console, 'error');
        const fetchRandomJoke = spyOn(apiService, 'fetchRandomJoke')
          .and.returnValue(Observable.create(observer => observer.error(mockError)));
        component.fetchRandomJoke();
        expect(fetchRandomJoke).toHaveBeenCalled();
        expect(component.joke).toBeUndefined();
        expect(consoleError).toHaveBeenCalledWith(mockError);
      })
    );
  });

});
