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

}
