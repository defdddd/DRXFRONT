import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { InvoicesComponent } from './Components/invoices/inovices.component';
import { MyinvoicesComponent } from './Components/myinvoices/myinvoices.component';
import { MyrentsComponent } from './Components/myrents/myrents.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RentsComponent } from './Components/rents/rents.component';
import { UsersComponent } from './Components/users/users.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';

const routes: Routes = 
[
  {path: "", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "invoices", component: InvoicesComponent},
  {path: "rents", component: RentsComponent},
  {path: "myinvoices", component: MyinvoicesComponent},
  {path: "myrents", component: MyrentsComponent},
  {path: "vehicles", component: VehiclesComponent},
  {path: "users", component: UsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
