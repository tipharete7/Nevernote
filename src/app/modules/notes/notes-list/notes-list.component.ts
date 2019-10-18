import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../../../model/note.model';
import { Notebook } from './../../../model/notebook.model';
import { NoteService } from '../notes.service';
import { NotebookService } from './../../notebooks/notebooks.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
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
export class NotesListComponent implements OnInit {

  notes: Note[] = [];
  notebooks: Notebook[] = [];
  selectPlaceholder: string;
  selectedNote: Note;
  selectedNotebook : Notebook;

  constructor(private router: Router, private noteService: NoteService,
    private notebookService : NotebookService, public dialog: MatDialog, private translate: TranslateService) {
  }

  ngOnInit() {
    this.getNotes();
    this.setSelectPlaceholder();
    this.getNotebooks();
  }

  setSelectPlaceholder(){
    this.translate.get("APP.SELECT_NOTEBOOK.FILTER_BY_NOTEBOOK").subscribe(res =>{
      this.selectPlaceholder = res;
    })
  }

  getNotes() {
    this.noteService.getNotes().subscribe(
      data => { this.notes = data },
      err => { console.error("An error has occured while getting list of notes"); });
  }

  getNotebooks() {
    this.notebookService.getNotebooks().subscribe(
      data => { this.notebooks = data },
      err => { console.error("An error has occured while getting list of notes"); });
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

  selectNotebook(notebook : Notebook){
    this.notebookService.getNotesByNotebookId(notebook.id).subscribe(
      res => {
          this.notes = res;
      }, err => { console.error("could not get notes by notebookId"); }
    );
  }

  state = 'active';
}
