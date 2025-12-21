import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CentralProductRoutingModule } from './central-product-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoContentComponent } from '../../../shared/components/no-content/no-content.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ConfirmDialogComponent } from '../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { CentralProductListComponent } from './central-product-list/central-product-list.component';

@NgModule({
  declarations: [
    CentralProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CentralProductRoutingModule,
    MaterialModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    NoContentComponent,
    PageLoaderComponent,
    PaginationComponent,
    ConfirmDialogComponent
  ]
})
export class CentralProductModule { }

