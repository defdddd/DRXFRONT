import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Interceptor } from './Interceptor/Interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Dialogs/AuthDialogs/login/login.component';
import { RegisterComponent } from './Dialogs/AuthDialogs/register/register.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './Components/home/home.component';
import { MyrentsComponent } from './Components/myrents/myrents.component';
import { MyinvoicesComponent } from './Components/myinvoices/myinvoices.component';
import { UsersComponent } from './Components/users/users.component';
import { InvoicesComponent } from './Components/invoices/inovices.component';
import { RentsComponent } from './Components/rents/rents.component';
import { RentcardComponent } from './Components/profile/rentcard/rentcard.component';
import { BilingcardComponent } from './Components/profile/bilingcard/bilingcard.component';
import { EditprofileComponent } from './Dialogs/editprofile/editprofile.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { AddvehicleComponent } from './Components/vehicles/addvehicle/addvehicle.component';
import { VehiclesTableComponent } from './Components/vehicles/vehicles-table/vehicles-table.component';
import { EditVehiclesDialogComponent } from './Dialogs/edit-vehicles-dialog/edit-vehicles-dialog.component';
import { EditUserDialogComponent } from './Dialogs/edit-user-dialog/edit-user-dialog.component';
import { EditInvoiceDialogComponent } from './Dialogs/edit-inovice-dialog/edit-invoice-dialog.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotpasswordComponent,
    HomeComponent,
    MyrentsComponent,
    MyinvoicesComponent,
    UsersComponent,
    InvoicesComponent,
    RentsComponent,
    RentcardComponent,
    BilingcardComponent,
    EditprofileComponent,
    VehiclesComponent,
    AddvehicleComponent,
    VehiclesTableComponent,
    EditVehiclesDialogComponent,
    EditUserDialogComponent,
    EditInvoiceDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    NgChartsModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
