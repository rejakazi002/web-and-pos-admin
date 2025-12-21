import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddUserNotificationComponent} from "./add-user-notification.component";

const routes: Routes = [
  {path: '', component: AddUserNotificationComponent},
  {path: ':id', component: AddUserNotificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUserNotificationRoutingModule { }
