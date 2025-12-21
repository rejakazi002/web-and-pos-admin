import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddReadyLandingPageComponent} from "./add-ready-landing-page.component";

const routes: Routes = [
  { path: '', component: AddReadyLandingPageComponent },
  { path: ':id', component: AddReadyLandingPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddReadyLandingPageRoutingModule { }
