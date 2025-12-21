import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCampaignComponent} from "./add-campaign.component";

const routes: Routes = [
  {path: '', component: AddCampaignComponent},
  {path: ':id', component: AddCampaignComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCampaignRoutingModule {
}
