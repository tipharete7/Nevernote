import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteService {

  constructor(private http:HttpClient) {}

  private notesUrl = 'http://localhost:8080/notes';

  getNotes() : Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  createNote(note : Note) : Observable<any> {
    return this.http.post<Note>(this.notesUrl, note);
  }

  deleteNote(noteId : string) {
    return this.http.delete(this.notesUrl + "/" + noteId);
  }

  updateNote(noteId : string, note : any) {
    return this.http.put<Note>(this.notesUrl + "/" + noteId, note);
  }

}
