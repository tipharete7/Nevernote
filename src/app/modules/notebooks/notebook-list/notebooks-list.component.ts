import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Notebook } from '../../../model/notebook.model';
import { NotebookService } from '../notebooks.service';
import { TranslateService } from '@ngx-translate/core';
import { NewItemDialogComponent } from '../../../shared/new-item-dialog/new-item-dialog-component';
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
  newNotebookTitle: string;

  constructor(private router: Router, private notebookService: NotebookService,
     public dialog: MatDialog, private translateService: TranslateService) { }

  ngOnInit() {
    this.getNotebooks();
  }

  setNewNotebookDialogPlaceholder(){
    this.translateService.get("APP.NOTEBOOKS.NEW_NOTEBOOK").subscribe(res =>{
      this.newNotebookTitle = res;
    });
  }

  openNewNotebookDialog() {
    this.setNewNotebookDialogPlaceholder();
    console.log("this.newNotebookTitle", this.newNotebookTitle);

    const dialogRef = this.dialog.open(NewItemDialogComponent, {
      width: '250px',
      data: { title : this.newNotebookTitle, itemName: this.notebookName }
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
    this.notebookService.createNotebook(notebook).subscribe(
      data => {
        this.notebooks.push(notebook);
      },
      err => { console.error("An error occured while creating notebook "); }
    )
  }

  getNotebooks() {
    this.notebookService.getNotebooks().subscribe(
      data => { this.notebooks = data },
      err => { console.error("An error occured while getting list of notebooks "); }
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
          err => { console.error("An error has occurred while deleting this notebook "); }
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
          err => { console.error("An error occurred while updating the notebook "); });
      }
    });
  }

  state = 'active';
}
