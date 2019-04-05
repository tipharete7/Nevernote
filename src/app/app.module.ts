import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotesComponent } from './notesList/notes.component';
import { NewNoteComponent } from './newNote/newNote.component';
import { NoteService } from './shared/notes.service';
import { HttpClientModule } from "@angular/common/http";
import { NoteBooksComponent } from './noteBooks/noteBooks.component';
import { NoteComponent } from './notesList/note/note.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotesComponent,
    NewNoteComponent,
    NoteBooksComponent,
    NoteComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    routes
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
