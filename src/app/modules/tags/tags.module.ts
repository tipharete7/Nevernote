import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagService } from './tags.service';
import { TagComponent } from './tags-list/tag/tag.component';

const routes: Routes = [
  {
    path: '',
    component: TagsListComponent
  }
];

@NgModule({
  declarations: [TagsListComponent, TagComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [TagService]
})
export class TagsModule { }
