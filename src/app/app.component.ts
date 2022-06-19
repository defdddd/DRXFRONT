import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { LoginComponent } from './Dialogs/AuthDialogs/login/login.component';
import { RegisterComponent } from './Dialogs/AuthDialogs/register/register.component';
import { SliderTrigger } from './Helpers/SliderTrigger';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/ModelServices/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DRXFRONT';
  IsLogged : boolean = false;
  IsAdmin : boolean = false;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private authService: AuthService, private observer: BreakpointObserver, private _formBuilder: FormBuilder, private dialog: MatDialog) {
      this.IsLogged = this.authService.LoggedIn();
      this.IsAdmin = this.authService.IsAdmin();
  }

  LogIn() {
    this.dialog.open(LoginComponent, {
    });
  }
  
  Register() {
    this.dialog.open(RegisterComponent, {
    });
  }

  Logout() {
    this.authService.LogOut();

  }
  ngAfterViewInit() {
      this.observer
        .observe(['(max-width: 800px)'])
        .pipe(delay(1))
        .subscribe((res) => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        });
       
  }

  onSelect() {
      this.observer
        .observe(['(max-width: 800px)'])
        .pipe(delay(1))
        .subscribe((res) => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        });
  }

  check(){
   return typeof this.sidenav.mode !== 'undefined';
  }

  tirggerSlider() {
      this.observer
        .observe(['(max-width: 800px)'])
        .pipe(delay(1))
        .subscribe((res) => {
          if (!res.matches) {
            if (SliderTrigger.Trigger) {
              this.sidenav.mode = 'over';
              this.sidenav.close();
            } else {
              this.sidenav.mode = 'side';
              this.sidenav.open();
            }
          }
        });
      }
}
