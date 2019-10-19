import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title : string;
  itemName : string;
}

@Component({
  selector: 'new-item-popup',
  templateUrl: './new-item-dialog-component.html',
  styleUrls: ['./new-item-dialog-component.css']
})
export class NewItemDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<NewItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
