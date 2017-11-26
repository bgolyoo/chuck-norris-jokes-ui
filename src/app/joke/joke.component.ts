import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api-service';
import { JokeResponse } from '../shared/classes/joke-renponse';
import { Joke } from '../shared/classes/joke';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {

  joke: Joke;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchRandomJoke();
  }

  fetchRandomJoke(): void {
    this.apiService.fetchRandomJoke().subscribe(
      (jokeRenponse: JokeResponse) => {
        this.joke = jokeRenponse.value;
      },
      error => console.error(error)
    );
  }

}
