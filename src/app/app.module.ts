import { NoteBookService } from './shared/notebooks.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotesComponent } from './notes/notes.component';
import { NewNoteComponent } from './notes/newNote/newNote.component';
import { NoteService } from './shared/notes.service';
import { NoteBooksComponent } from './noteBooks/noteBooks.component';
import { NoteComponent } from './notes/note/note.component';
import { TagsComponent } from './tags/tags.component';
import { NotebookComponent } from './noteBooks/notebook/notebook.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotesComponent,
    NewNoteComponent,
    NoteBooksComponent,
    NoteComponent,
    TagsComponent,
    NotebookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    routes,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  providers: [NoteService, NoteBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
