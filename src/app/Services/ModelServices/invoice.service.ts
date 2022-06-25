import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiURL from 'src/app/Helpers/ApiURL';
import BilingData from 'src/app/Models/BilingData';
import InvoiceData from 'src/app/Models/InvoiceData';
import { Service } from '../AbstractClasses/Service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends Service<InvoiceData>{

   constructor(http: HttpClient) {
    super(http, "Invoice/");
   }
   getMyInvoices(){
    return this.http.get<InvoiceData[]>(this.URL + 'myInvoicedata');
  }
}
