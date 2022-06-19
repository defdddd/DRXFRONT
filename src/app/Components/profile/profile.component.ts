import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EditprofileComponent } from 'src/app/Dialogs/editprofile/editprofile.component';
import BilingData from 'src/app/Models/BilingData';
import UserData from 'src/app/Models/UserData';
import VehicleData from 'src/app/Models/VehicleData';
import { AuthService } from 'src/app/Services/auth.service';
import { BilingService } from 'src/app/Services/ModelServices/biling.service';
import { UserService } from 'src/app/Services/ModelServices/user.service';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileObject !: UserData;
  ImagePath: any;

  constructor(private auth: AuthService, private userService: UserService, private dialog: MatDialog, private route: Router, private sanitizer: DomSanitizer) {
    this.profileObject = new UserData();
  }

  ngOnInit(): void {
    if (!this.auth.LoggedIn())
      this.route.navigate(['/']);

    else {
      this.userService.getMyData().subscribe(value => {
        this.profileObject = value;
        this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(value.picture)}`);
      });
    };
  }

  getRole() {
    if (this.profileObject.isAdmin) return "Administrator";
    return "User";
  }

  async addPicture(event : any){
    
    for(let i = 0; i < event.target.files.length; i++){
  
      let byteArray  = await this.base64(event.target.files[i]);
      this.profileObject.picture = JSON.stringify(byteArray);
      this.userService.update(this.profileObject).subscribe(data => {
        if(data)
        this.ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`${JSON.parse(data.picture)}`);
      });
    };
  }
  
  editProfile(){
    this.dialog.open(EditprofileComponent, {
      width:"auto",
      maxWidth:"700px",
      data: this.profileObject
      
    }).afterClosed().subscribe( val =>
      {
        if(val)
        this.profileObject = JSON.parse(val);
      }   
    );
  }


  private base64(file: any){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
