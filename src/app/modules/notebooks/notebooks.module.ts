import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NotebookService } from './notebooks.service';
import { NotebooksListComponent } from './notebook-list/notebooks-list.component';
import { NotebookComponent } from './notebook-list/notebook/notebook.component';

const routes: Routes = [
  {
    path: '',
    component: NotebooksListComponent
  }
];


@NgModule({
  declarations: [NotebooksListComponent, NotebookComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [NotebookService]
})
export class NotebooksModule { }
