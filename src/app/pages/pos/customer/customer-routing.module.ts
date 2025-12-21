import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { MembershipCardListComponent } from './membership-card-list/membership-card-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'customer-list', pathMatch: 'full'},
  {path: 'customer-list', component: CustomerListComponent},
  {path: 'add-customer', component: AddCustomerComponent},
  {path: 'add-customer/:id', component: AddCustomerComponent},
  {path: 'customer-details/:id', component: CustomerDetailsComponent},
  {path: 'membership-card-list', component: MembershipCardListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

