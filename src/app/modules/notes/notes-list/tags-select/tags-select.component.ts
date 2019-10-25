import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from './../../../../model/tag.model';

@Component({
  selector: 'app-tags-select',
  templateUrl: './tags-select.component.html',
  styleUrls: ['./tags-select.component.css']
})
export class TagsSelectComponent {


  @Input() tags: Tag[];
  @Input() selectTagsPlaceholder: string;
  @Output() selectedTag : Tag;
  @Output() selectTagEvent: EventEmitter<Tag> = new EventEmitter<Tag>();

  selectTag() {
    this.selectTagEvent.emit(this.selectedTag);
  }

}
