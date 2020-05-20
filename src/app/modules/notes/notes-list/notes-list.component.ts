import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../../../model/note.model';
import { Notebook } from './../../../model/notebook.model';
import { Tag } from './../../../model/tag.model';
import { NoteService } from '../notes.service';
import { NotebookService } from './../../notebooks/notebooks.service';
import { TagService } from './../../tags/tags.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';
import { filter } from 'rxjs/operators';


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

  notes: Note[];
  filteredNotes: Note[];
  notebooks: Notebook[];
  tags: Tag[];
  selectNotebookPlaceholder: string;
  selectTagsPlaceholder: string;
  deleteNoteMessage: string;
  selectedNote: Note;
  selectedNotebook: Notebook;
  selectedTag: Tag;
  _sortOrder: string;
  _searchFilter: string;


  get searchFilter(): string {
    return this._searchFilter;
  }

  set searchFilter(v: string) {
    this._searchFilter = v;
    this.filteredNotes = this.searchFilter ? this.performNoteSearch(this.searchFilter) : this.notes;
  }

  get sortOrder(): string {
    return this._sortOrder;
  }

  set sortOrder(o: string) {
    this._sortOrder = o;
    this.filteredNotes = this.sortOrder ? this.sortNotes(this.sortOrder) : this.notes;
  }

  constructor(private router: Router, private noteService: NoteService, private tagService: TagService,
    private notebookService: NotebookService, public dialog: MatDialog, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.getNotes();
    this.setSelectNotebookPlaceholder();
    this.setSelectTagPlaceholder();
    this.getNotebooks();
    this.getTags();
    this.setDeleteNoteDialogMessage();
  }

  setSelectNotebookPlaceholder() {
    this.translateService.get("APP.SELECT_NOTEBOOK.FILTER_BY_NOTEBOOK").subscribe(res => {
      this.selectNotebookPlaceholder = res;
    })
  }

  setSelectTagPlaceholder() {
    this.translateService.get("APP.TAGS.FILTER_BY_TAG").subscribe(res => {
      this.selectTagsPlaceholder = res;
    })
  }

  setDeleteNoteDialogMessage() {
    this.translateService.get("APP.ALL_NOTES.CONFIRM_DELETE_NOTE").subscribe(res => {
      this.deleteNoteMessage = res;
    });
  }

  getNotes() {
    this.noteService.getNotes().subscribe(
      data => {
        this.notes = data;
        this.filteredNotes = this.notes;
      },
      err => { console.error("An error has occured while getting list of notes"); });
  }

  performNoteSearch(query: string): Note[] {
    query = query.toLocaleLowerCase();

    return this.notes.filter((note: Note) =>
      note.content.toLocaleLowerCase().indexOf(query) !== -1 ||
      note.title.toLocaleLowerCase().indexOf(query) !== -1);
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  sortNotes(order: string): Note[] {

    return this.filteredNotes.sort((a: Note, b: Note): any => {
      let d1 = this.getTime(new Date(a.lastModificationDate));
      let d2 = this.getTime(new Date(b.lastModificationDate));
      if (order === "oldest") return d1 - d2;
      if (order === "newest") return d2 - d1;
    });
  }

  getNotebooks() {
    this.notebookService.getNotebooks().subscribe(
      data => { this.notebooks = data },
      err => { console.error("An error has occured while getting list of notebooks"); });
  }

  getTags() {
    this.tagService.getTags().subscribe(
      data => { this.tags = data },
      err => { console.error("An error has occured while getting list of tags"); });
  }

  deleteNote(note: Note) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '380px',
      height: '120px',
      data: this.deleteNoteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noteService.deleteNote(note.id).subscribe(
          data => {
            let indexOfNote = this.filteredNotes.indexOf(note);
            this.filteredNotes.splice(indexOfNote, 1);
          },
          err => { alert("An error has occurred while deleting the note"); }
        );
      }
    });
  }

  selectNotebook(notebook: Notebook) {

    if (!notebook) {
      return this.filteredNotes = this.notes;
    }

    this.notebookService.getNotesByNotebookId(notebook.id).subscribe(
      res => {
        this.filteredNotes = res;
      }, err => { console.error("could not get notes by notebookId"); }
    );
  }

  selectTag(tag: Tag) {

    if (!tag) {
      return this.filteredNotes = this.notes;
    }

    this.tagService.getNotesByTagId(tag.id).subscribe(
      res => {
        this.filteredNotes = res;
      }, err => { console.error("could not get notes by tagId"); }
    );
  }

  state = 'active';
}
