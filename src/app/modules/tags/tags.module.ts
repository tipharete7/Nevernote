import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagService } from './tags.service';

const routes: Routes = [
  {
    path: '',
    component: TagsListComponent
  }
];

@NgModule({
  declarations: [TagsListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [TagService]
})
export class TagsModule { }
