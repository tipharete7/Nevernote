import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NewNoteComponent } from './notes/newNote/newNote.component';
import { NotebooksComponent } from './notebooks/notebooks.component';
import { TagsComponent } from './tags/tags.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const router: Routes = [
    { path: '', redirectTo: 'notes', pathMatch: 'full' },
    { path: 'newNote', component: NewNoteComponent },
    { path: 'newNote/:id', component: NewNoteComponent },
    { path: 'notes', component: NotesComponent },
    { path: 'notebooks', component: NotebooksComponent },
    { path: 'tags', component: TagsComponent },
    { path: '**', component: PageNotFoundComponent }
]


export const routes: ModuleWithProviders = RouterModule.forRoot(router);
