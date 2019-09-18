import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NoteService } from '../../shared/notes.service';

@Component({
  selector: 'app-newNote',
  templateUrl: './newNote.component.html',
  styleUrls: ['./newNote.component.css']
})
export class NewNoteComponent {

  note : Note;

  constructor(private router: Router, private noteService: NoteService) {
        this.note = new Note();
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
