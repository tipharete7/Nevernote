import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notebook } from './../../../model/notebook.model';

@Component({
  selector: 'app-notebooks-select',
  templateUrl: './notebooks-select.component.html',
  styleUrls: ['./notebooks-select.component.css']
})
export class NotebooksSelectComponent  {


  @Input() notebooks: Notebook[];
  @Input() selectPlaceholder: string;
  @Output() selectedNotebook : Notebook;
  @Output() selectNotebookEvent: EventEmitter<Notebook> = new EventEmitter<Notebook>();

  selectNotebook() {
    this.selectNotebookEvent.emit(this.selectedNotebook);
  }
}
