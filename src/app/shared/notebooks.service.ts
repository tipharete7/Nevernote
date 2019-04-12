import { NoteBook } from './../models/notebook.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteBookService {

  constructor(private http:HttpClient) {}

  private notesBooksUrl = 'http://localhost:8080/api';

  getNoteBooks() : Observable<NoteBook[]> {
    return this.http.get<NoteBook[]>(this.notesBooksUrl + "/notebooks");
  }

  createNoteBook(notebook : NoteBook) : Observable<any> {
    return this.http.post<NoteBook>(this.notesBooksUrl + "/createNoteBook", notebook);
  }

  
  updateNoteBook(notebook) {
    return this.http.put<NoteBook>(this.notesBooksUrl + "/updateNoteBook", notebook);
  }
  
  deleteNoteBook(notebookId : string) {
    return this.http.delete(this.notesBooksUrl + "/deleteNoteBook/" + notebookId);
  }
}