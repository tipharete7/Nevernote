import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../../model/notebook.model';
import { Note } from './../../model/note.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NotebookService {

  constructor(private http: HttpClient) { }

  private notebooksUrl = 'http://localhost:8080/notebooks/';

  getNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.notebooksUrl);
  }

  getNotesByNotebookId(notebookId : string) : Observable<Note[]> {
    return this.http.get<Note[]>(this.notebooksUrl + notebookId + "/notes");
  }

  createNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.notebooksUrl, notebook);
  }

  updateNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.put<Notebook>(this.notebooksUrl + notebook.id, notebook);
  }

  deleteNotebook(notebookId: string): Observable<any> {
    return this.http.delete(this.notebooksUrl + notebookId);
  }
}
