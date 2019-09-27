import { Notebook } from './../models/notebook.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NotebookService {

  constructor(private http:HttpClient) {}

  private notebooksUrl = 'http://localhost:8080/notebooks';

  getNotebooks() : Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.notebooksUrl);
  }

  createNotebook(notebook : Notebook) : Observable<any> {
    return this.http.post<Notebook>(this.notebooksUrl + "/", notebook);
  }

  updateNotebook(notebook) {
    return this.http.put<Notebook>(this.notebooksUrl + "/", notebook);
  }

  deleteNotebook(notebookId : string) {
    return this.http.delete(this.notebooksUrl + "/" + notebookId);
  }
}
