import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NoteService } from '../../shared/notes.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-newNote',
  templateUrl: './newNote.component.html',
  styleUrls: ['./newNote.component.css']
})
export class NewNoteComponent {

  note : Note;
  public Editor = ClassicEditor;
  public config = {
    placeholder: 'Type the content here!'
}

  constructor(private router: Router, private noteService: NoteService) {
        this.note = new Note();
  }

  // public onReady(editor) {
  //   editor.ui.getEditableElement().parentElement.insertBefore(
  //       editor.ui.view.toolbar.element,
  //       editor.ui.getEditableElement()
  //   );
  // }

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
