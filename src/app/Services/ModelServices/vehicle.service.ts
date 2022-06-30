import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiURL from '../../Helpers/ApiURL';
import VehicleData from '../../Models/VehicleData';
import { Service } from '../AbstractClasses/Service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends Service<VehicleData> {

   constructor(http: HttpClient) {
    super(http, "Vehicle/");
   }

   getAvailableVehicles(type: string, model: string){
    return this.http.get<VehicleData[]>(this.URL + `available/${type},${model}`);
   }

   getAllSearchByVehicles(type: string, model: string){
    return this.http.get<VehicleData[]>(this.URL + `searchBy/${type},${model}`);
   }

   async getCountAllAsync(){
    var result = await this.http.get<number>(this.URL + 'AllCount').toPromise();
    return typeof result !== "undefined" ? result : 0;
   }

   async getCountAvailableAsync(){
    var result = await this.http.get<number>(this.URL + 'availableCount').toPromise();
    return typeof result !== "undefined" ? result : 0;
   }

   async getAllCarCountAsync(){
    var result = await this.http.get<number>(this.URL + 'AllCarCount').toPromise();
    return typeof result !== "undefined" ? result : 0;
   }

   async getAllBikesCountAsync(){
    var result =  await this.http.get<number>(this.URL + 'AllBikesCount').toPromise();
    return typeof result !== "undefined" ? result : 0;
   }

   async getAllElectricCountAsync(){
    var result = await this.http.get<number>(this.URL + 'AllElectricCount').toPromise();
    return typeof result !== "undefined" ? result : 0;
   }
}

