import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotesComponent } from './notesList/notes.component';
import { NewNoteComponent } from './notesList/newNote/newNote.component';
import { NoteBooksComponent } from './noteBooks/noteBooks.component';
import { TagsComponent } from './tags/tags.component';


export const router: Routes = [
    { path: '', redirectTo: 'notes', pathMatch: 'full' },
    { path: 'newNote', component: NewNoteComponent },
    { path: 'notes', component: NotesComponent },
    { path: 'notebooks', component: NoteBooksComponent },
    { path: 'tags', component: TagsComponent },
    { path: '**', component: NotesComponent }
]


export const routes: ModuleWithProviders = RouterModule.forRoot(router);
