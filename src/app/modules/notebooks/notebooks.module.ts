import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NotebooksListComponent } from './notebook-list/notebooks-list.component';
import { NotebookComponent } from './notebook-list/notebook/notebook.component';
import { NewNotebookDialog } from './new-notebook-dialog/new-notebook-dialog';
import { NotebookService } from './notebooks.service';

const routes: Routes = [
  {
    path: '',
    component: NotebooksListComponent
  }
];


@NgModule({
  declarations: [NotebooksListComponent, NotebookComponent, NewNotebookDialog],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [NotebookService],
  entryComponents: [NewNotebookDialog]
})
export class NotebooksModule { }
