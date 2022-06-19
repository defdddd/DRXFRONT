import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import UserData from 'src/app/Models/UserData';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder, private auth: AuthService,
    private dialog: MatDialog, private dialogRef: MatDialogRef<RegisterComponent>) {
    this.form = this.fromBuilder.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }
  login() {
    this.dialog.open(LoginComponent, {
      width: "auto"
    });
  }
  submit(): void {
    if (this.form.valid) {
      const username = this.form.get("username")?.value;
      const password = this.form.get("password")?.value;
      const confirmpassword = this.form.get("confirmpassword")?.value;
      const email = this.form.get("email")?.value;

      if (confirmpassword == password) {
        var person = new UserData();
        person.userName = username;
        person.password = password;
        person.email = email;
        person.isAdmin = false;
        this.auth.Register(person).subscribe(data => {
          if (data) {
            //this.emailService.sendEmailWelcome(person.email).subscribe(x => x);
            Swal.fire('Welcome!', 'Account created with succes', 'success');
            this.form.reset();
            this.dialogRef.close();
          }
        });
      }
      else {
        Swal.fire('Hey!', 'Password does not match', 'warning');
      }
    }
  }
}
