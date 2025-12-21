import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddPcBuilderComponent} from "./add-pc-builder.component";

const routes: Routes = [
  {path:'',component:AddPcBuilderComponent},
  {path:':id',component:AddPcBuilderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPcBuilderRoutingModule { }
