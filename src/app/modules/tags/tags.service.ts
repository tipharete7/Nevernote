import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../../model/tag.model';
import { Note } from './../../model/note.model';
import { HandleError, HttpErrorHandler } from '../../config/http-error-handler.service';
import { catchError } from 'rxjs/operators';
import { TAGS_URL } from '../../shared/utils/constants';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TagService {

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TagService'); 
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(TAGS_URL, options).pipe(catchError(this.handleError<Tag[]>('getTags', [])));
  }

  getNotesByTagId(tagId: string): Observable<Note[]> {
    return this.http.get<Note[]>(TAGS_URL + tagId + "/notes", options).pipe(catchError(this.handleError<Note[]>('getNotesByTagId', [])));
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(TAGS_URL, tag, options).pipe(catchError(this.handleError<Tag>('createTag')));
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(TAGS_URL + tag.id, tag, options).pipe(catchError(this.handleError('updateTag', tag)));
  }

  deleteTag(tagId: string): Observable<any> {
    return this.http.delete(TAGS_URL + tagId, options).pipe(catchError(this.handleError('deleteTag')));
  }

  addTagToNote(tagId: string, noteId: string): Observable<Note> {
    return this.http.post<Note>(TAGS_URL + tagId + "/notes/" + noteId, null, options).pipe(catchError(this.handleError<Note>('addTagToNote')));
  }

  removeTagFromNote(tagId: string, noteId: string): Observable<any> {
    return this.http.delete(TAGS_URL + tagId + "/notes/" + noteId, options).pipe(catchError(this.handleError('removeTagFromNote')));
  }
}
