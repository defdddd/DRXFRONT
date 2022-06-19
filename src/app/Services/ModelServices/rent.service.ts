import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BilingData from 'src/app/Models/BilingData';
import RentData from 'src/app/Models/RentData';
import { Service } from '../AbstractClasses/Service';


@Injectable({
  providedIn: 'root'
})
export class RentService extends Service<RentData>{

   constructor(http: HttpClient) {
    super(http, "Rent/");
   }
   getMyRents(){
    return this.http.get<RentData[]>(this.URL + `getMyRents`);
   }
}
