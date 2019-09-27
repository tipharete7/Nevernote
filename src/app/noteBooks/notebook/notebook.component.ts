import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NoteBook } from './../../models/notebook.model';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent {
  @Input() notebook: NoteBook;

  @Output() notebookUpdateEvent: EventEmitter<NoteBook> = new EventEmitter<NoteBook>();
  @Output() notebookDeleteEvent: EventEmitter<NoteBook> = new EventEmitter<NoteBook>();


  updateNoteBook() {
    this.notebookUpdateEvent.emit(this.notebook);
  }

  deleteNoteBook() {
    this.notebookDeleteEvent.emit(this.notebook);
  }
}
