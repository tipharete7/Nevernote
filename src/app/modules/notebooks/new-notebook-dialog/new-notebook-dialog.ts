import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  notebookName : string;
}

@Component({
  selector: 'new-notebook-popup',
  templateUrl: './new-notebook-dialog.html',
  styleUrls: ['./new-notebook-dialog.css']
})
export class NewNotebookDialog {

  constructor(
    public dialogRef: MatDialogRef<NewNotebookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
