import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule, Params } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NoteComponent } from './notes-list/note/note.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { NotebookService } from './../notebooks/notebooks.service';
import { NoteService } from './notes.service';


const routes: Routes = [
      {
        path: '',
        component: NotesListComponent
      },
      {
        path: ':id',
        component: NoteEditComponent
      },
      {
        path: 'new',
        component: NoteEditComponent
      }
];

@NgModule({
  declarations: [NotesListComponent, NoteComponent, NoteEditComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CKEditorModule
  ],
  providers: [NoteService, NotebookService]
})
export class NotesModule { }
