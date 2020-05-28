import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../../model/notebook.model';
import { Note } from './../../model/note.model';
import { HandleError, HttpErrorHandler } from '../../config/http-error-handler.service';
import { catchError } from 'rxjs/operators';
import { NOTEBOOKS_URL } from '../../shared/utils/constants';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NotebookService {

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('NotebookService');
  }

  getNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(NOTEBOOKS_URL, options).pipe(catchError(this.handleError<Notebook[]>('getNotebooks', [])));
  }

  getNotesByNotebookId(notebookId: string): Observable<Note[]> {
    return this.http.get<Note[]>(NOTEBOOKS_URL + notebookId + "/notes", options).pipe(catchError(this.handleError<Note[]>('getNotesByNotebookId', [])));
  }

  createNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(NOTEBOOKS_URL, notebook, options).pipe(catchError(this.handleError<Notebook>('createNotebook')));
  }

  updateNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.put<Notebook>(NOTEBOOKS_URL + notebook.id, notebook, options).pipe(catchError(this.handleError('updateNotebook', notebook)));
  }

  deleteNotebook(notebookId: string): Observable<any> {
    return this.http.delete(NOTEBOOKS_URL + notebookId, options).pipe(catchError(this.handleError('deleteNotebook')));
  }
}
