import { NoteBookService } from './../shared/notebooks.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NoteBook } from './../models/notebook.model';
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
export class NoteBooksComponent implements OnInit {

  notebooks: NoteBook[] = [];
  selectedNoteBook: NoteBook;

  constructor(private router: Router, private notebookService: NoteBookService) { }

  ngOnInit() {
    this.getNoteBooks();
  }

  getNoteBooks() {
    this.notebookService.getNoteBooks().subscribe(
      data => { this.notebooks = data },
      error => { alert("An error occured while getting list of notebooks /n " + error) }
    )
  }

  deleteNoteBook(notebook: NoteBook) {
    if (confirm("Are you sure to delete this notebook ?")) {
      this.notebookService.deleteNoteBook(notebook.id).subscribe(
        data => {
          let indexOfNote = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNote, 1);
        },
        error => { alert("An error has occurred while deleting this notebook /n " + error); }
      );
    }
  }

  updateNote(notebook: NoteBook) {
    /*this.notebookService.updateNoteBook(notebook).subscribe( 
       err => { alert("An error occurred while updating the notebook /n" + error); }); */
  }

  state = 'active';
}