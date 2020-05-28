import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../../model/note.model';
import { Notebook } from './../../model/notebook.model';
import { HandleError, HttpErrorHandler  } from '../../config/http-error-handler.service';
import { catchError } from 'rxjs/operators';
import { NOTES_URL } from '../../shared/utils/constants';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteService {

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('NoteService'); 
  }

  getNotes() : Observable<Note[]> {
    return this.http.get<Note[]>(NOTES_URL, options).pipe(catchError(this.handleError<Note[]>('getNotes', [])));
  }

  getNoteById(id: number): Observable<any> {
    return this.http.get(NOTES_URL + id, options).pipe(catchError(this.handleError('getNoteById')));
  }

  createNote(note : Note) : Observable<Note> {
    return this.http.post<Note>(NOTES_URL, note, options).pipe(catchError(this.handleError<Note>('createNote')));
  }

  updateNote(note : Note) : Observable<Note> {
    return this.http.put<Note>(NOTES_URL + note.id, note, options).pipe(catchError(this.handleError('updateNote', note)));
  }

  deleteNote(noteId : string) : Observable<any>{
    return this.http.delete(NOTES_URL + noteId, options).pipe(catchError(this.handleError('deleteNote')));
  }

  addNoteToNotebook(noteId : string, notebookId : string): Observable<Note> {
    return this.http.post<Note>(NOTES_URL + noteId + "/notebooks/" + notebookId, null, options).pipe(catchError(this.handleError<Note>('addNoteToNotebook')));
  }
}
