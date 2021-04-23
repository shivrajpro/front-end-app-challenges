import { Author } from "./author.model";

export class Book{
    constructor(public id:number, public authors: Author[], public bookshelves: string[],
        public download_count: number, public formats: Object, public languages: string[],
        public media_type: string, public subjects: string[], public title: string
        ){}
}