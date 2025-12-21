import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllPcBuilderComponent} from "./all-pc-builder.component";

const routes: Routes = [
  {path: '', component: AllPcBuilderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllPcBuilderRoutingModule {
}
