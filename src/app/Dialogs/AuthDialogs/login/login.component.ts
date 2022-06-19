import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotpasswordComponent } from 'src/app/forgotpassword/forgotpassword.component';
import AuthData from 'src/app/Models/AuthData';
import { AuthService } from 'src/app/Services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fromBuilder: FormBuilder, private auth: AuthService, private route: Router, private dialog: MatDialog, private dialogRef: MatDialogRef<LoginComponent>) {
    this.form = this.fromBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.auth.LoggedIn())
      this.route.navigate(['/']);

  }
  register() {
    this.dialog.open(RegisterComponent, {
      width: "auto"
    });
  }
  submit(): void {

    if (this.form.valid) {
      const username = this.form.get("username")?.value;
      const password = this.form.get("password")?.value;

      var auth = new AuthData(username, password);
      this.auth.Auth(auth);
      this.form.reset();
      this.dialogRef.close();
    }
  }

  forgot() {
    this.dialog.open(ForgotpasswordComponent, {
      width: "auto"
    });
  }


}
