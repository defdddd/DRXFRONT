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

   getCountAll(){
    return this.http.get<number>(this.URL + 'AllCount');
   }

   getCountAvailable(){
    return this.http.get<number>(this.URL + 'availableCount');
   }

   getAllCarCount(){
    return this.http.get<number>(this.URL + 'AllCarCount');
   }

   getAllBikesCount(){
    return this.http.get<number>(this.URL + 'AllBikesCount');
   }

   getAllElectricCount(){
    return this.http.get<number>(this.URL + 'AllElectricCount');
   }
}

