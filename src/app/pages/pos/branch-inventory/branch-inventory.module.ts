import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BranchInventoryRoutingModule } from './branch-inventory-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BranchInventoryListComponent } from './branch-inventory-list/branch-inventory-list.component';
import { AddBranchInventoryComponent } from './add-branch-inventory/add-branch-inventory.component';

@NgModule({
  declarations: [
    BranchInventoryListComponent,
    AddBranchInventoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BranchInventoryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BranchInventoryModule { }

