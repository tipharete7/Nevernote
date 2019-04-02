import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../models/note.model';
import { NoteService } from '../shared/notes.service';

@Component({
  selector: 'app-newNote',
  templateUrl: './newNote.component.html',
  styleUrls: ['./newNote.component.css']
})
export class NewNoteComponent implements OnInit {

  model : Note = {
    id : "",
    title: "",
    content: "",
    date: ""
  }

  constructor(private router: Router, private noteService: NoteService) {
  }

  ngOnInit() {
  }

  createNote() {
    this.noteService.createNote(this.model).subscribe( 
      data => {
            this.clearForms();
            //go to notes
      });
  }

  clearForms(){
    this.model.title = "";
    this.model.content = "";
  }

}
