import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NoteService } from '../../shared/notes.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-newNote',
  templateUrl: './newNote.component.html',
  styleUrls: ['./newNote.component.css']
})
export class NewNoteComponent {

  note : Note;
  editMode : boolean = false;
  public Editor = ClassicEditor;
  public config = {
    placeholder: 'Type the content here!'
  }

  constructor(private router: Router, private noteService: NoteService, public activatedRoute: ActivatedRoute) {
     this.note = new Note();
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];

    this.noteService.getNoteById(id).subscribe(data => {
        this.note = data;
        this.editMode = true;
      },
      error => console.log(error));
  }

  createNote() {
    console.log("called create Note");
    this.noteService.createNote(this.note).subscribe(
      data => {
            this.clearForms();
            this.router.navigate(['/notes']);
      },
      err => {
        alert("An error occurred while creating the note");
      });
  }

  updateNote(note : Note) {
    console.log("called update Note");
    this.noteService.updateNote(note).subscribe(
      data => {
          this.clearForms();
          this.router.navigate(['/notes']);
      },
      err => {
        alert("An error occurred while updating the note");
      });
  }

  saveNote(){
    this.editMode ? this.updateNote(this.note) : this.createNote();
  }

  clearForms(){
    this.note.title = "";
    this.note.content = "";
  }
}
