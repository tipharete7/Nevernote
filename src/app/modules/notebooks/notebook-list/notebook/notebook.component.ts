import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notebook } from '../../../../model/notebook.model';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent {
  @Input() notebook: Notebook;

  @Output() notebookUpdateEvent: EventEmitter<Notebook> = new EventEmitter<Notebook>();
  @Output() notebookDeleteEvent: EventEmitter<Notebook> = new EventEmitter<Notebook>();

  constructor(public router : Router){}

  updateNotebook() {
    this.notebookUpdateEvent.emit(this.notebook);
  }

  deleteNotebook() {
    this.notebookDeleteEvent.emit(this.notebook);
  }

  // viewNotebookNotes(){
  //   this.router.navigate(["/notebooks", this.notebook.id, "/notes"]);
  // }
}
