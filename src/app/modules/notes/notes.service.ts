import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../../model/note.model';
import { Notebook } from './../../model/notebook.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteService {

  constructor(private http:HttpClient) {}

  private notesUrl = 'http://localhost:8080/notes/';

  getNotes() : Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  getNoteById(id: number): Observable<any> {
    return this.http.get(this.notesUrl + id);
  }

  createNote(note : Note) : Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note);
  }

  updateNote(note : Note) : Observable<Note> {
    return this.http.put<Note>(this.notesUrl + note.id, note);
  }

  deleteNote(noteId : string) : Observable<any>{
    return this.http.delete(this.notesUrl + noteId);
  }

  addNoteToNotebook(noteId : string, notebookId : string): Observable<Note> {
    return this.http.post<Note>(this.notesUrl + noteId + "/notebooks/" + notebookId, null);
  }
}
