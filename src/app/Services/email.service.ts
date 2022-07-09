import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiURL from '../Helpers/ApiURL';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private URL : string = ApiURL.URL + "Email/";

  constructor(private http: HttpClient) { }

  rent(){
    return this.http.get<any>(this.URL + `rent`);
  }

  finished(){
    return this.http.get<any>(this.URL + `finished`);
  }

  forgotPassword(email : string){
    return this.http.post<any>(this.URL + `forgotPasswordSend`, email);
  }

}
