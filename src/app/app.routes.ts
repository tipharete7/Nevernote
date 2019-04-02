import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NotesComponent } from './notesList/notes.component';
import { NewNoteComponent } from './newNote/newNote.component';
import { NoteBooksComponent } from './noteBooks/noteBooks.component';



export const router: Routes = [
 {path: '', redirectTo: 'notes', pathMatch: 'full'},
 {path: 'newNote', component: NewNoteComponent },
 {path: 'notes', component: NotesComponent },
 {path: 'notebooks', component: NoteBooksComponent },
]


export const routes: ModuleWithProviders = RouterModule.forRoot(router);