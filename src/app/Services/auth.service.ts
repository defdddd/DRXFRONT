import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../Models/Interfaces/Token';
import TokenData from '../Models/TokenData';
import jwtDecode from 'jwt-decode';
import ApiURL from '../Helpers/ApiURL';
import { Observable } from 'rxjs';
import UserData from '../Models/UserData';
import AuthData from '../Models/AuthData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH: string = "loggedIn";
  private URL : string = ApiURL.URL + "Auth/";
  private AUTH_REQUEST: string = this.URL;
  private REGISTER_REQUEST: string = this.URL + "register";
  private CHECK_EMAIL: string = this.URL + "email/";
  private FORGOT_EMAIL: string = this.URL + "SendEmail/forgotPasswordToken/";
  constructor(private http: HttpClient) {
   }

  Register(user: UserData): Observable<boolean> {
    return this.http.post<boolean>(this.REGISTER_REQUEST, user);
  }
  Auth(auth: AuthData): any {
    return this.http.post<TokenData>(this.AUTH_REQUEST, auth).subscribe(data => {
      this.setAuth(data);
      window.location.reload();
    });
  }

  IsAdmin(): boolean {
    if (this.GetToken() == "NULL") return false;
    var token = jwtDecode<Token>(this.GetToken());
    return token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Admin";
  }

  GetToken(): string {
    const value = localStorage.getItem(this.AUTH);
    if (!!value)
      return (JSON.parse(value) as TokenData).access_Token;

    return "NULL";
  }

  setAuth(token: TokenData) {
    if (token.userName == "" && token.access_Token == "")
      localStorage.removeItem(this.AUTH);
    else localStorage.setItem(this.AUTH, JSON.stringify(token));
  }
  
  LoggedIn(): boolean {
    if (this.GetToken() == "NULL") return false;
    return true;
  }

  GetId(): number {
    if (this.GetToken() == "NULL") return -1;
    var token = jwtDecode<Token>(this.GetToken());
    return token.Identifier;
  }

  public CheckToken(): void {
    if (this.GetToken() !== "NULL") {

      this.http.get<boolean>(this.URL + 'checkLogin').subscribe( x => {
        if(!x)
         this.LogOut();
      });
    }
  }
  LogOut() {
    localStorage.removeItem(this.AUTH);
    window.location.reload();
  }
}
