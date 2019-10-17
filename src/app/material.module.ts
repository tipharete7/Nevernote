import { NgModule } from '@angular/core';

// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';



const MATERIAL_MODULES = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule
];

@NgModule({
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
