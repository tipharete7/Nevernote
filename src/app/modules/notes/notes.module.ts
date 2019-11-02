import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule, Params } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NoteComponent } from './notes-list/note/note.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { NoteService } from './notes.service';
import { NotebookService } from './../notebooks/notebooks.service';
import { TagService } from './../tags/tags.service';
import { NotebooksSelectComponent } from './notes-list/notebooks-select/notebooks-select.component';
import { TagsSelectComponent } from './notes-list/tags-select/tags-select.component';
import { SearchNotesPipe } from './notes-list/search-notes.pipe';
import { StripHtmlPipe } from './notes-list/strip-html.pipe';


const routes: Routes = [
      {
        path: '',
        component: NotesListComponent
      },
      {
        path: 'new',
        component: NoteEditComponent
      },
      {
        path: ':id',
        component: NoteEditComponent
      }
];

@NgModule({
  declarations: [NotesListComponent, NoteComponent, NoteEditComponent, NotebooksSelectComponent, SearchNotesPipe,
     TagsSelectComponent, StripHtmlPipe],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CKEditorModule
  ],
  providers: [NoteService, NotebookService, TagService]
})
export class NotesModule { }
