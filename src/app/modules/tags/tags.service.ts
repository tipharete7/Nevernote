import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../../model/tag.model';
import { Note } from './../../model/note.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TagService {

  constructor(private http:HttpClient) {}

  private tagsUrl = 'http://localhost:8080/tags/';

  getTags() : Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl);
  }

  getNotesByTagId(tagId : string) : Observable<Note[]> {
    return this.http.get<Note[]>(this.tagsUrl + tagId + "/notes");
  }

  createTag(tag : Tag) : Observable<Tag> {
    return this.http.post<Tag>(this.tagsUrl, tag);
  }

  updateTag(tag : Tag) : Observable<Tag>{
    return this.http.put<Tag>(this.tagsUrl + tag.id, tag);
  }

  deleteTag(tagId : string) : Observable<any> {
    return this.http.delete(this.tagsUrl + tagId);
  }

  addTagToNote(tagId : string, noteId : string) : Observable<Note> {
    return this.http.post<Note>(this.tagsUrl + tagId + "/notes/" + noteId, null);
  }

  removeTagFromNote(tagId : string, noteId : string) : Observable<any> {
    return this.http.delete(this.tagsUrl + tagId + "/notes/" + noteId);
  }
}
