import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import UserData from 'src/app/Models/UserData';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/ModelServices/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  userForm !: FormGroup;
  actionBtn: string = "Add";

  constructor(private service: UserService, private formbuilder: FormBuilder, private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: UserData) {
  }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      isAdmin: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.userForm.controls['userName'].setValue(this.editData.userName);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['isAdmin'].setValue(this.editData.isAdmin);
    }
  }

  addUser() {

    if (this.userForm.valid) {

      let person : UserData = this.userForm.value;
      if (this.editData){
        person.id = this.editData.id;
        person.picture = this.editData.picture;
      }else{
        person.id = 0;
        person.picture = "NaN";
      }
     
      if (this.actionBtn == "Add")
        this.service.add(person).subscribe(data => {
          if (data) {
            this.userForm.reset();
            this.dialogRef.close(JSON.stringify(data));
          }
        });
      else {
        this.service.update(person).subscribe(data => {
          if (data) {
            this.userForm.reset();
            this.dialogRef.close(JSON.stringify(data));
          }
        });
      }
    }
  }


}
