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
  updateNotebookMessage: string;
  deleteNotebookMessage: string;


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

  setUpdateNotebookDialogMessage(){
    this.translateService.get("APP.NOTEBOOKS.CONFIRM_UPDATE_NOTEBOOK").subscribe(res =>{
      this.updateNotebookMessage = res;
    });
  }

  setDeleteNotebookDialogMessage(notebookName: string){
    this.translateService.get("APP.NOTEBOOKS.CONFIRM_DELETE_NOTEBOOK", { notebookName : notebookName }).subscribe(res =>{
      this.deleteNotebookMessage = res;
    });
  }

  openNewNotebookDialog() {
    this.setNewNotebookDialogPlaceholder();

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
      error => { console.error("An error occured while creating notebook ", error); }
    )
  }

  getNotebooks() {
    this.notebookService.getNotebooks().subscribe(
      data => { this.notebooks = data },
      error => { console.error("An error occured while getting list of notebooks ", error); }
    )
  }

  deleteNotebook(notebook: Notebook) {
    this.setDeleteNotebookDialogMessage(notebook.name);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '170px',
      data: this.deleteNotebookMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notebookService.deleteNotebook(notebook.id).subscribe(
          data => {
            let indexOfNote = this.notebooks.indexOf(notebook);
            this.notebooks.splice(indexOfNote, 1);
          },
          error => { console.error("An error has occurred while deleting this notebook ", error); }
        );
      }
    });

  }
  updateNotebook(notebook: Notebook) {
    this.setUpdateNotebookDialogMessage();

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '170px',
      data: this.updateNotebookMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notebookService.updateNotebook(notebook).subscribe(
          data => {
          },
          error => { console.error("An error occurred while updating the notebook ", error); });
      }
    });
  }

  state = 'active';
}
