import { NotebookService } from '../shared/notebooks.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Notebook } from '../models/notebook.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-noteBooks',
  templateUrl: './noteBooks.component.html',
  styleUrls: ['./noteBooks.component.css'],
  animations: [
    trigger('notebooksAnim', [
      state('active', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({ transform: 'translateX(-30px)', opacity: '0' }),
        animate('750ms ease-in-out')
      ]),
      transition('* => void', [
        animate('400ms ease-in-out', style({ transform: 'translateX(-30px)', opacity: '0' }))
      ])
    ])
  ]
})
export class NotebooksComponent implements OnInit {

  notebooks: Notebook[] = [];
  selectedNotebook: Notebook;

  constructor(private router: Router, private notebookService: NotebookService) { }

  ngOnInit() {
    this.getNotebooks();
  }

  getNotebooks() {
    this.notebookService.getNotebooks().subscribe(
      data => { this.notebooks = data },
      error => { alert("An error occured while getting list of notebooks " + JSON.stringify(error)); }
    )
  }

  deleteNotebook(notebook: Notebook) {
    if (confirm("Are you sure to delete this notebook ?")) {
      this.notebookService.deleteNotebook(notebook.id).subscribe(
        data => {
          let indexOfNote = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNote, 1);
        },
        error => { alert("An error has occurred while deleting this notebook /n " + error); }
      );
    }
  }

  updateNote(notebook: Notebook) {
    /*this.notebookService.updateNotebook(notebook).subscribe(
       err => { alert("An error occurred while updating the notebook" + JSON.stringify(error)); }); */
  }

  state = 'active';
}
