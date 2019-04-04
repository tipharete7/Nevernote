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
export class NewNoteComponent implements OnInit {

  constructor(private router: Router, private noteService: NoteService) {
  }

  ngOnInit() {
  }

  createNote(f: NgForm) {
    //
    this.noteService.createNote(f.value).subscribe( 
      data => {
            this.clearForms();
            //go to notes
            //this.router.navigate(['/notes']);
      });
  }

  clearForms(){
   // this.model.title = "";
    //this.model.content = "";
  }

}
