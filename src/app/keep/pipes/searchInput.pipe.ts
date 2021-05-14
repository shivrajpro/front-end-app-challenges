import { Pipe, PipeTransform } from "@angular/core";
import { Note } from "../models/note.model";

@Pipe({
    name:'filterNotes'
})
export class FilterNotesPipe implements PipeTransform{
    transform(allNotes: Note[], ...args: string[]): Note[] {
        // throw new Error("Method not implemented.");
    
        const filteredNotes = allNotes.filter((note)=>{
            return note.title.toLowerCase().includes(args[0].toLowerCase()) ||
                   note.description.toLowerCase().includes(args[0].toLowerCase());
        })

        console.log('>> filteredNotes',filteredNotes);

        return filteredNotes;
    }

}