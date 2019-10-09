import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NewNoteComponent } from './notes/newNote/newNote.component';
import { NotebooksComponent } from './notebooks/notebooks.component';
import { NoteComponent } from './notes/note/note.component';
import { TagsComponent } from './tags/tags.component';
import { NotebookComponent } from './notebooks/notebook/notebook.component';
import { NewNotebookDialog } from './notebooks/new-notebook-dialog/new-notebook-dialog';

import { NoteService } from './shared/notes.service';
import { NotebookService } from './shared/notebooks.service';
import { TagService } from './shared/tags.service';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NewNoteComponent,
    NotebooksComponent,
    NoteComponent,
    TagsComponent,
    NotebookComponent,
    NewNotebookDialog,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CKEditorModule,
    routes,
    LayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  entryComponents: [NotebooksComponent, NewNotebookDialog, ConfirmationDialogComponent],
  providers: [NoteService, NotebookService, TagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
