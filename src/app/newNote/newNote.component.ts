import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../models/note.model';
import { NoteService } from '../shared/notes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-newNote',
  templateUrl: './newNote.component.html',
  styleUrls: ['./newNote.component.css']
})
export class NewNoteComponent {

  note : Note = new Note();

  constructor(private router: Router, private noteService: NoteService) {
  }

  createNote() {
    this.noteService.createNote(this.note).subscribe( 
      data => {
            this.clearForms();
            this.router.navigate(['/notes']);
      });
  }

  clearForms(){
    this.note.title = "";
    this.note.content = "";
  }

}
