import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllServiceComponent} from './all-service.component';

const routes: Routes = [
  {path: '', component: AllServiceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllServiceRoutingModule { }
