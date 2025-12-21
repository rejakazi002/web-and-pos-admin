import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllReadyLandingPageComponent} from "./all-ready-landing-page.component";

const routes: Routes = [
  { path: '', component: AllReadyLandingPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllReadyLandingPageRoutingModule { }
