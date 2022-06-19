import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import VehicleData from 'src/app/Models/VehicleData';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent implements OnInit {

  @Output() addvehicle = new EventEmitter<VehicleData>();
  Form !: FormGroup;
  constructor(private vehiclesService: VehicleService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.Form = this.formbuilder.group({
      type: ['', Validators.required],
      model: ['', Validators.required],
      pricePerMinute: ['', Validators.required],
      location: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  add(){
    if(this.Form.valid){
      let obj : VehicleData = this.Form.value;
      obj.id = 0;
      this.vehiclesService.add(obj).subscribe(result => {
        if(result){
          this.addvehicle.emit(result);
          this.Form.reset();
        }
      });

    }
  }
}
