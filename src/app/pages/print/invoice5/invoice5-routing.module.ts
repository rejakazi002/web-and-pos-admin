import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Invoice5Component} from "./invoice5.component";

const routes: Routes = [{
  path: '',
  component: Invoice5Component,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Invoice5RoutingModule {
}
