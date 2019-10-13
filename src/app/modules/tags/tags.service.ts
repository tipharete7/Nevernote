import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../../model/tag.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TagService {

  constructor(private http:HttpClient) {}

  private tagsUrl = 'http://localhost:8080/tags/';


}
