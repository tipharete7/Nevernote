import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Note } from '../../../model/note.model';
import { NoteService } from '../notes.service';
import { NotebookService } from './../../notebooks/notebooks.service';
import { Notebook } from './../../../model/notebook.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent {

  note: Note;
  editMode: boolean = false;
  notebooks: Notebook[] = [];
  selectedNotebook : Notebook;
  snackbarMessage : string = "";
  public Editor = ClassicEditor;

  constructor(
     private router: Router, private noteService: NoteService,
     public activatedRoute: ActivatedRoute, private notebookService: NotebookService,
     private snackBar: MatSnackBar, private translate: TranslateService) {
      this.note = new Note();
      this.translate.get("APP.NEW_NOTE.EDITOR_PH").subscribe(res =>{
        this.note.content = res;
      })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = +params["id"];
      this.getNoteById(id);
      this.getNotebooks();
    })
  }

  private getNoteById(id: any) {
    this.noteService.getNoteById(id).subscribe(data => {
      this.note = data;
    }, error => console.error(error));
  }

  createNote() {
    this.noteService.createNote(this.note).subscribe(
      data => {
        this.clearForms();
        this.navigateToNotesPage();
      },
      err => {
        console.error("An error occurred while creating the note");
      });
  }

  updateNote(note: Note) {
    this.noteService.updateNote(note).subscribe(
      data => {
        this.clearForms();
        this.navigateToNotesPage();
      },
      err => {
        console.error("An error occurred while updating the note");
      });
  }

  saveNote() {
    this.editMode ? this.updateNote(this.note) : this.createNote();
  }

  clearForms() {
    this.note.title = "";
    this.note.content = "";
  }

  navigateToNotesPage() {
    this.router.navigate(['/notes']);
  }

  getNotebooks() {
    this.notebookService.getNotebooks().subscribe(
      data => { this.notebooks = data },
      error => { console.error("An error occured while getting list of notebooks"); }
    );
  }

  addNoteToNotebook(){
    this.noteService.addNoteToNotebook(this.note.id, this.selectedNotebook.id).subscribe(
      res => {
        this.showAddedToNotebookSnackbar(this.selectedNotebook.name);
      }, err => { console.error(err); }
    );
  }

  showAddedToNotebookSnackbar(notebookName : string){
    this.translate.get("APP.NOTE_EDIT.NOTE_MOVED_TO_NOTEBOOK", { value : notebookName } ).subscribe(res => {
          this.snackbarMessage = res;
    });

    this.snackBar.open(this.snackbarMessage, '', {
      horizontalPosition : 'center',
      duration: 2000
     });
  }
}
