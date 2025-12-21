import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MultipleStickerComponent} from "./multiple-sticker.component";

const routes: Routes = [
  { path: '', component: MultipleStickerComponent },
  { path: ':id', component: MultipleStickerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultipleStickerRoutingModule { }
