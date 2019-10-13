import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotebooksListComponent } from './modules/notebooks/notebook-list/notebooks-list.component';
import { TagsListComponent } from './modules/tags/tags-list/tags-list.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const router: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  {
    path: 'notes',
    loadChildren: () => import('./modules/notes/notes.module').then(mod => mod.NotesModule)
  },
  {
    path: 'notebooks',
    loadChildren: () => import('./modules/notebooks/notebooks.module').then(mod => mod.NotebooksModule)
  },
  {
    path: 'tags',
    loadChildren: () => import('./modules/tags/tags.module').then(mod => mod.TagsModule)
  },
  { path: '**', component: PageNotFoundComponent }
]


export const routes: ModuleWithProviders = RouterModule.forRoot(router);
