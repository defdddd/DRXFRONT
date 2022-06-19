import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BilingData from 'src/app/Models/BilingData';
import { Service } from '../AbstractClasses/Service';

@Injectable({
  providedIn: 'root'
})
export class BilingService extends Service<BilingData>{

  constructor(http: HttpClient) {
    super(http, "Biling/");
   }
  getMyData(){
    return this.http.get<BilingData>(this.URL + 'myBilingdata');
  }
}
