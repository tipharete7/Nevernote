import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './../material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations : [ ConfirmationDialogComponent ],
  imports : [ MaterialModule, TranslateModule ],
  exports:      [ CommonModule, FormsModule, TranslateModule, MaterialModule, ConfirmationDialogComponent ],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class SharedModule { }
