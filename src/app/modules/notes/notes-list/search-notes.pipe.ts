import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './../../../model/note.model';

@Pipe({
  name: 'searchPipe'
})
export class SearchNotesPipe implements PipeTransform {

  transform(notes: Note[], searchQuery: string): Note[] {
    if(!notes) return [];
    if(!searchQuery || searchQuery.length === 0) return notes;

    searchQuery = searchQuery.toLowerCase();

    return notes.filter(n => {
      return n.title.toLowerCase().includes(searchQuery) || n.content.toLowerCase().includes(searchQuery)
    });
    return null;
  }

}
