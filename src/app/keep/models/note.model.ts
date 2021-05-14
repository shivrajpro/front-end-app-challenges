export class Note{
    constructor(private id?:number, public title?:string, public description?:string,
        public isPinned?:boolean, public isActive?:boolean, public isSaved?:boolean){
            this.id = Math.floor(Math.random()*Date.now());
            this.title = '';
            this.description = '';
            this.isPinned = false;
            this.isActive = false;
            this.isSaved = false;
        }

        get _id(){
            return this.id;
        }
}