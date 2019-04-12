import { NoteBookService } from './shared/notebooks.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotesComponent } from './notesList/notes.component';
import { NewNoteComponent } from './newNote/newNote.component';
import { NoteService } from './shared/notes.service';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NoteBooksComponent } from './noteBooks/noteBooks.component';
import { NoteComponent } from './notesList/note/note.component';
import { TagsComponent } from './tags/tags.component';
import { NotebookComponent } from './noteBooks/notebook/notebook.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { SideNavComponent } from './side-nav/side-nav.component';

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
    NotebookComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    routes,
    LayoutModule,
    MatToolbarModule,
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
