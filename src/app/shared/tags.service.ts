import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from '../models/tag.model';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TagService {

  constructor(private http:HttpClient) {}

  private tagsUrl = 'http://localhost:8080/tags';

  getTags() : Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl);
  }

  createTag(Tag : Tag) : Observable<any> {
    return this.http.post<Tag>(this.tagsUrl, Tag);
  }

  deleteTag(tagId : string) {
    return this.http.delete(this.tagsUrl + "/" + tagId);
  }

  updateTag(tagId : string, tag : any) {
    return this.http.put<Tag>(this.tagsUrl + "/" + tagId, Tag);
  }

}
