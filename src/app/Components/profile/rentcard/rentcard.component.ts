import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import RentData from 'src/app/Models/RentData';
import VehicleData from 'src/app/Models/VehicleData';
import { AuthService } from 'src/app/Services/auth.service';
import { RentService } from 'src/app/Services/ModelServices/rent.service';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';

@Component({
  selector: 'app-rentcard',
  templateUrl: './rentcard.component.html',
  styleUrls: ['./rentcard.component.css']
})
export class RentcardComponent implements OnInit {

  Model !: string;
  Type !: string;
  AvailableVehicles: VehicleData[] = [];
  VehicleInfo !: VehicleData;
  Form !: FormGroup
  constructor(private vehicleService: VehicleService,private authService: AuthService, private formbuilder: FormBuilder, private rentService: RentService) {
    this.VehicleInfo = new VehicleData();
  }

  ngOnInit(): void {
    this.Form = this.formbuilder.group({
      model: ['', Validators.required],
      type: ['', Validators.required],
      vehicle: ['', Validators.required]
    });
  }

  setModel(model: string) {
    this.Model = model;
    this.setVehicles();
  }
  setType(type: string) {
    this.Type = type;
    this.setVehicles();
  }
  setVehicles() {
    if (this.Model && this.Type)
      this.vehicleService.getAvailableVehicles(this.Type, this.Model).subscribe(result => this.AvailableVehicles = result);
  }
  infoVehicle(id: number) {
    this.vehicleService.getById(id).subscribe(value => this.VehicleInfo = value);
  }
  rentVehicle(){
    if(this.Form.valid){
      var rent = new RentData();
      rent.vehicleId = this.VehicleInfo.id;
      rent.userId = this.authService.GetId();
      rent.rentDate = Date.now().toString();
      rent.isActive = true;
      rent.lastLocation = "unknown";
      this.rentService.add(rent).subscribe(x => {
        if(x)
        this.Form.reset();
        this.VehicleInfo = new VehicleData();
      });
    }
  }

}
