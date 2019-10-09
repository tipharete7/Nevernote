import { Component, OnInit, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NoteService } from '../shared/notes.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../models/note.model';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


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

  constructor(private router: Router, private noteService: NoteService, public dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '280px',
      height: '120px',
      data: 'Confirm note deletion ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noteService.deleteNote(note.id).subscribe(
          data => {
            let indexOfNote = this.notes.indexOf(note);
            this.notes.splice(indexOfNote, 1);
          },
          err => { alert("An error has occurred while deleting the note"); }
        );
      }
    });
  }
  state = 'active';
}

export interface DialogData {
  noteTitle: string;
  noteContent: string;
}
