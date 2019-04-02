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

  private notesUrl = 'http://localhost:8080/api';

  getNotes() : Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl + "/notes");
  }

  createNote(note : Note) : Observable<any> {
    return this.http.post<Note>(this.notesUrl + "/createNote", note);
  }

  deleteNote(note) {
    return this.http.delete(this.notesUrl + "/deleteNote/" + note.id);
  }

  updateNote(note) {
    return this.http.put<Note>(this.notesUrl + "/updateNote", note);
  }
  
}