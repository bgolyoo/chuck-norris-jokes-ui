import { Joke } from './joke';

export class JokeResponse {

    public type: string;
    public value: Joke;

    constructor(type: string, value: Joke) { }

}
