import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllUserNotificationComponent} from "./all-user-notification.component";

const routes: Routes = [
  {path: '', component: AllUserNotificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllUserNotificationRoutingModule { }
