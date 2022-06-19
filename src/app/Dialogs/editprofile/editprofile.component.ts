import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import UserData from 'src/app/Models/UserData';
import { UserService } from 'src/app/Services/ModelServices/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  profileForm !: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private editData: UserData, private formbuilder: FormBuilder,
    private userService: UserService, private dialogRef: MatDialogRef<EditprofileComponent>) { }

  ngOnInit(): void {
    this.profileForm = this.formbuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.editData) {
      this.profileForm.controls['userName'].setValue(this.editData.userName);
      this.profileForm.controls['password'].setValue(this.editData.password);
      this.profileForm.controls['email'].setValue(this.editData.email);
    }

  }
  editUser() {
    if (this.profileForm.valid) {
      this.editData.userName = this.profileForm.get("userName")?.value;
      this.editData.password = this.profileForm.get("password")?.value;
      this.editData.email = this.profileForm.get("email")?.value;

      this.userService.update(this.editData).subscribe(data => {
        if (data) {
          this.profileForm.reset();
          this.dialogRef.close(JSON.stringify(data));
        }
      });
    }
  }

}