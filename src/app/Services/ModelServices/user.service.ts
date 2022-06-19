import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserData from 'src/app/Models/UserData';
import { Service } from '../AbstractClasses/Service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends Service<UserData> {

  constructor(http: HttpClient) {
    super(http, "User/");
   }

  //#region search options
  getByUsername(username : string) {
    return this.http.get<UserData>(this.URL + `username/${username}`);
  }

  getByEmail(email : string) {
    return this.http.get<UserData>(this.URL + `email/${email}`);
  }
  getMyData(){
    return this.http.get<UserData>(this.URL + "myProfile");
  }
  //#endregion

}
