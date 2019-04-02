import { Component, OnInit, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Note } from '../models/note.model';
import { NoteService } from '../shared/notes.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations : [
    trigger ('notesAnim', [
      state('active', style({
        opacity : '1'
      })),
      transition ('void => *', [
        style({transform : 'translateX(-30px)', opacity: '0'}),
        animate('750ms ease-in-out')
      ]),
      transition ('* => void', [
        animate('400ms ease-in-out', style({transform: 'translateX(-30px)', opacity:'0'}))
      ])
    ])
  ]
})
export class NotesComponent implements OnInit{ 

  model : Note = {
    id : "",
    title: "",
    content: "",
    date: ""
  }

  notes: Note[] = [];
  selectedNote : Note;

  constructor(private router: Router, private noteService: NoteService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
      this.noteService.getNotes().subscribe(
        data  => { this.notes = data },
        error => { alert("getNotes() error" + error) });   
  }

 
  deleteNote(note : Note){
    if(confirm("Etes-vous sûr de supprimer cette note ?")){ //https://www.youtube.com/watch?v=L7mrAYsh0-0
      this.noteService.deleteNote(note).subscribe( data => {
          this.notes = this.notes.filter(n => n !== note);
        }); 
    }
  }

  openUpdateNoteModal(model){
    this.model.title = model.title ;
    this.model.content = model.content;
  }

  updateNote(model){
    /*  this.noteService.updateNote(model).subscribe( data => {
      this.notes = this.notes.(n => n !== model);
    }); */
  }

  clearForms(){
    this.model.title = "";
    this.model.content = "";
  }

  state = 'active';
}

export interface DialogData {
  noteTitle: string;
  noteContent: string;
}