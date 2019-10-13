import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Notebook } from '../../../model/notebook.model';
import { NotebookService } from '../notebooks.service';
import { NewNotebookDialog } from '../new-notebook-dialog/new-notebook-dialog';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.css'],
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
export class NotebooksListComponent implements OnInit {

  notebooks: Notebook[] = [];
  selectedNotebook: Notebook;
  notebookName: string;

  constructor(private router: Router, private notebookService: NotebookService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getNotebooks();
  }

  openNewNotebookDialog() {
    const dialogRef = this.dialog.open(NewNotebookDialog, {
      width: '300px',
      height: '250px',
      data: { notebookName: this.notebookName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notebookName = result;
        this.createNewNotebook();
      }
    });
  }

  createNewNotebook() {
    let notebook = new Notebook();
    notebook.name = this.notebookName;
    notebook.creationDate = new Date();
    console.log(JSON.stringify(notebook));
    this.notebookService.createNotebook(notebook).subscribe(
      data => {
        this.notebooks.push(notebook);
      },
      error => { alert("An error occured while creating notebook " + JSON.stringify(error)); }
    )
  }

  getNotebooks() {
    this.notebookService.getNotebooks().subscribe(
      data => { this.notebooks = data },
      error => { alert("An error occured while getting list of notebooks " + JSON.stringify(error)); }
    )
  }

  deleteNotebook(notebook: Notebook) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '280px',
      height: '120px',
      data: 'Confirm notebook deletion ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notebookService.deleteNotebook(notebook.id).subscribe(
          data => {
            let indexOfNote = this.notebooks.indexOf(notebook);
            this.notebooks.splice(indexOfNote, 1);
          },
          error => { alert("An error has occurred while deleting this notebook " + error); }
        );
      }
    });

  }
  updateNotebook(notebook: Notebook) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '280px',
      height: '120px',
      data: 'Confirm notebook update ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notebookService.updateNotebook(notebook).subscribe(
          data => {
          },
          err => { alert("An error occurred while updating the notebook " + JSON.stringify(err)); });
      }
    });
  }

  state = 'active';
}
