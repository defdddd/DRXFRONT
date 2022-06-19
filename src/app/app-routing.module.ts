import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { InovicesComponent } from './Components/inovices/inovices.component';
import { MyinovicesComponent } from './Components/myinovices/myinovices.component';
import { MyrentsComponent } from './Components/myrents/myrents.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RentsComponent } from './Components/rents/rents.component';
import { UsersComponent } from './Components/users/users.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';

const routes: Routes = 
[
  {path: "", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "inovices", component: InovicesComponent},
  {path: "rents", component: RentsComponent},
  {path: "myinovices", component: MyinovicesComponent},
  {path: "myrents", component: MyrentsComponent},
  {path: "vehicles", component: VehiclesComponent},
  {path: "users", component: UsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
