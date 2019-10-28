import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map, startWith } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Note } from '../../../model/note.model';
import { NoteService } from '../notes.service';
import { NotebookService } from './../../notebooks/notebooks.service';
import { Notebook } from './../../../model/notebook.model';
import { Tag } from './../../../model/tag.model';
import { TagService } from './../../tags/tags.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent {

  note: Note;
  editMode: boolean = false;
  notebooks: Notebook[] = [];
  selectNotebookPlaceholder: string;
  snackbarMessage: string;
  Editor = ClassicEditor;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  allTags: Tag[] = [];
  tags: Tag[] = [];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private router: Router, private noteService: NoteService, private tagsService: TagService,
    public activatedRoute: ActivatedRoute, private notebookService: NotebookService,
    private snackBar: MatSnackBar, private translate: TranslateService) {
       this.note = new Note();
  }

  ngOnInit() {
    this.setEditorPlaceholder();
    this.setNoteToEditor();

    if (this.editMode) {
      this.setSelectNotebookPlaceholder();
      this.getNotebooks();
    }
    this.getTags();
    this.filterTagsForAutocomplete();
  }

  private setNoteToEditor() {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        let id = +params["id"];
        this.getNoteById(id);
        this.editMode = true;
      }
    });
  }

  //////////////// i18n Placeholder ///////////////////////

  private setEditorPlaceholder() {
    if (!this.note.content || this.note.content === undefined){
      this.translate.get("APP.NEW_NOTE.EDITOR_PH").subscribe(res => {
        this.note.content = res;
      });
    }
  }

  setSelectNotebookPlaceholder() {
    this.translate.get("APP.SELECT_NOTEBOOK.ADD_NOTE_TO_NOTEBOOK").subscribe(res => {
      this.selectNotebookPlaceholder = res;
    })
  }

  ////////////////  Note Management ///////////////////////

  private getNoteById(id: number) {
    if (id) {
      this.noteService.getNoteById(id).subscribe(data => {
        this.note = data;
        this.tags = this.note.tags;
      }, error => console.error("An error occurred while retreiving note by id", error));
    }
  }

  createNote() {
    this.noteService.createNote(this.note).subscribe(
      data => {
        this.navigateToNotesPage();
      },
      error => {
        console.error("An error occurred while creating the note", error);
      });
  }

  updateNote(note: Note) {
    this.noteService.updateNote(note).subscribe(
      data => {
        this.navigateToNotesPage();
      },
      error => {
        console.error("An error occurred while updating the note", error);
      });
  }

  saveNote() {
    this.editMode ? this.updateNote(this.note) : this.createNote();
    //TODO : AddTagsToUpdate if this.tags have new or removed tags
    this.addTagsToUpdatedNote(this.tags);
  }

  navigateToNotesPage() {
    this.router.navigate(['/notes']);
  }

  ////////////////  Notebook-Select ///////////////////////

  getNotebooks() {
    this.notebookService.getNotebooks().subscribe(
      data => { this.notebooks = data },
      error => { console.error("An error occured while getting list of notebooks", error); }
    );
  }

  addNoteToNotebook(notebook: Notebook) {
    this.noteService.addNoteToNotebook(this.note.id, notebook.id).subscribe(
      res => {
        this.showAddedToNotebookSnackbar(notebook.name);
      }, error => { console.error("An error occured while adding note to notebook", error); }
    );
  }

  showAddedToNotebookSnackbar(notebookName: string) {
    this.translate.get("APP.NOTE_EDIT.NOTE_MOVED_TO_NOTEBOOK", { notebookName : notebookName }).subscribe(res => {
      this.snackbarMessage = res;
    });

    this.snackBar.open(this.snackbarMessage, '', {
      horizontalPosition: 'center',
      duration: 2000
    });
  }

  ////////////////  Tag chip ///////////////////////

  getTags() {
    this.tagsService.getTags().subscribe(
      data => { this.allTags = data },
      error => { console.error("An error occured while getting list of tags", error); }
    );
  }

  createTag(tag: Tag) {
    this.tagsService.createTag(tag).subscribe(
      data => { },
      error => { console.error("An error occured while creating tag", error); }
    );
  }

  deleteTag(tagId: string) {
    this.tagsService.deleteTag(tagId).subscribe(
      data => { },
      error => { console.error("An error occured while deleting tag", error); }
    );
  }

  addTagToNote(tag: Tag) {
    this.tagsService.addTagToNote(tag.id, this.note.id).subscribe(
      data => { },
      error => { console.error("An error occured while adding tag to Note", error); }
    );
  }

  addTagsToUpdatedNote(tags: Tag[]) {
    if(tags.length > 0){
      tags.forEach(tag => {
          this.addTagToNote(tag);
      });
    }
  }

  removeTagFromNote(tag: Tag) {
    this.tagsService.removeTagFromNote(tag.id, this.note.id).subscribe(
      data => { },
      error => { console.error("An error occured while removing tag from note", error); }
    );
  }

  addTag(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add tag
      if ((value || '').trim()) {
        let tag = new Tag();
        tag.name = value.trim();
        this.tags.push(tag);
        this.createTag(tag);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.editMode ? this.removeTagFromNote(tag) : this.deleteTag(tag.id);
      this.tags.splice(index, 1);
    }
  }

  private filterTagsForAutocomplete() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
          startWith(null),
          map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  private _filter(value: string): any[] {
    if(typeof value === 'object') {
      return;
    }
    return this.allTags.filter(tag => tag.name.toLowerCase().includes(value.toLowerCase()));
  }
}
