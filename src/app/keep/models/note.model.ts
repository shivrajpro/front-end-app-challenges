export class Note{
    constructor(private id?:number, public title?:string, public description?:string,
        public isPinned?:boolean){
            this.id = Math.floor(Math.random()*Date.now());
            this.title = '';
            this.description = '';
            this.isPinned = false;
        }
}