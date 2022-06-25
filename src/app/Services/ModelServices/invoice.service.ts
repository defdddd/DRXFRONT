import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiURL from 'src/app/Helpers/ApiURL';
import BilingData from 'src/app/Models/BilingData';
import InoviceData from 'src/app/Models/InvoiceData';
import { Service } from '../AbstractClasses/Service';


@Injectable({
  providedIn: 'root'
})
export class InoviceService extends Service<InoviceData>{

   constructor(http: HttpClient) {
    super(http, "Inovice/");
   }
   getMyInovices(){
    return this.http.get<InoviceData[]>(this.URL + 'myInovicedata');
  }
}
