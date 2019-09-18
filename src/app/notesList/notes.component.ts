import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { Note } from '../models/note.model';
import { NoteService } from '../shared/notes.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations: [
    trigger('notesAnim', [
      state('active', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({ transform: 'translateX(-30px)', opacity: '0' }),
        animate('750ms ease-in-out')
      ]),
      transition('* => void', [
        animate('400ms ease-in-out', style({ transform: 'translateX(-30px)', opacity: '0' }))
      ])
    ])
  ]
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];
  selectedNote: Note;

  constructor(private router: Router, private noteService: NoteService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getNotes().subscribe(
      data => { this.notes = data },
      error => { alert("An error has occured while getting list of notes" + error) });
  }


  deleteNote(note: Note) {
    if (confirm("Etes-vous sûr de supprimer cette note ?")) { // dialog https://www.youtube.com/watch?v=L7mrAYsh0-0
      this.noteService.deleteNote(note.id).subscribe(
        data => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => { alert("An error has occurred while deleting the note"); }
      );
    }
  }

  updateNote(note) {
    this.noteService.updateNote(note).subscribe(
      data => {
      },
      err => {
        alert("An error occurred while updating the note");
      });
  }

  state = 'active';
}

export interface DialogData {
  noteTitle: string;
  noteContent: string;
}
