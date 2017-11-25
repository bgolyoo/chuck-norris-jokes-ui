export class Joke {

    public id: number;
    public joke: string;
    public categories: Array<string>;

    constructor(id: number, joke: string, categories: Array<string>) {
        this.id = id;
        this.joke = joke;
        this.categories = categories;
     }

}
