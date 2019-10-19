import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from './../../../../model/tag.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() tag: Tag;

  @Output() tagUpdateEvent: EventEmitter<Tag> = new EventEmitter<Tag>();
  @Output() tagDeleteEvent: EventEmitter<Tag> = new EventEmitter<Tag>();

  updateTag() {
    this.tagUpdateEvent.emit(this.tag);
  }

  deleteTag() {
    this.tagDeleteEvent.emit(this.tag);
  }
}
