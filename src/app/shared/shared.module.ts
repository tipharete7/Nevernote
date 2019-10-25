import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './../material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NewItemDialogComponent } from './new-item-dialog/new-item-dialog-component';

@NgModule({
  declarations : [ ConfirmationDialogComponent, NewItemDialogComponent ],
  imports : [ MaterialModule, TranslateModule, FormsModule, ReactiveFormsModule ],
  exports:      [ CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, MaterialModule, ConfirmationDialogComponent ],
  entryComponents: [ ConfirmationDialogComponent, NewItemDialogComponent ]
})
export class SharedModule { }
