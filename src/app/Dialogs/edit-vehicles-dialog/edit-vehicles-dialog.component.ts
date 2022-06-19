import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import VehicleData from 'src/app/Models/VehicleData';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';

@Component({
  selector: 'app-edit-vehicles-dialog',
  templateUrl: './edit-vehicles-dialog.component.html',
  styleUrls: ['./edit-vehicles-dialog.component.css']
})
export class EditVehiclesDialogComponent implements OnInit {
  vehicleForm !: FormGroup;
  constructor(private dialogRef: MatDialogRef<EditVehiclesDialogComponent>, @Inject(MAT_DIALOG_DATA) private editData: VehicleData,private formbuilder: FormBuilder,
  private vehiclesService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleForm = this.formbuilder.group({
      type: ['', Validators.required],
      model: ['', Validators.required],
      name: ['', Validators.required],
      pricePerMinute: ['', Validators.required],
      location: ['', Validators.required]
    });

    if (this.editData) {
      this.vehicleForm.controls['type'].setValue(this.editData.type);
      this.vehicleForm.controls['model'].setValue(this.editData.model);
      this.vehicleForm.controls['name'].setValue(this.editData.name);
      this.vehicleForm.controls['pricePerMinute'].setValue(this.editData.pricePerMinute);
      this.vehicleForm.controls['location'].setValue(this.editData.location);
    }
  }


  editVehicle(){
    let data = this.vehicleForm.value;
    data.id = this.editData.id;
    this.vehiclesService.update(data).subscribe(data => {
      if (data) {
        this.vehicleForm.reset();
        this.dialogRef.close(JSON.stringify(data));
      }
    });

  }
}
