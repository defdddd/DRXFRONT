import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import BilingData from 'src/app/Models/BilingData';
import InoviceData from 'src/app/Models/InoviceData';
import VehicleData from 'src/app/Models/VehicleData';
import { BilingService } from 'src/app/Services/ModelServices/biling.service';
import { InoviceService } from 'src/app/Services/ModelServices/inovice.service';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';

@Component({
  selector: 'app-edit-inovice-dialog',
  templateUrl: './edit-inovice-dialog.component.html',
  styleUrls: ['./edit-inovice-dialog.component.css']
})
export class EditInoviceDialogComponent implements OnInit {

  inoviceForm !: FormGroup;
  actionBtn: string = "Add";
  vehicleData !: VehicleData[];
  bilingData !: BilingData[];

  constructor(private service: InoviceService, private formbuilder: FormBuilder, private dialogRef: MatDialogRef<EditInoviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: InoviceData, private bilingService: BilingService, private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.bilingService.getAll().subscribe(result => this.bilingData = result);
    this.vehicleService.getAll().subscribe(result => this.vehicleData = result);
    this.inoviceForm = this.formbuilder.group({
      bilingId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      price: ['', Validators.required],
      usedTime: ['', Validators.required],
      date: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.inoviceForm.controls['bilingId'].setValue(this.editData.bilingId);
      this.inoviceForm.controls['vehicleId'].setValue(this.editData.vehicleId);
      this.inoviceForm.controls['price'].setValue(this.editData.price.toFixed(2));
      this.inoviceForm.controls['usedTime'].setValue(this.editData.usedTime);
      this.inoviceForm.controls['date'].setValue((new Date(this.editData.date)));

    }
  }

  addUser() {

    if (this.inoviceForm.valid) {

      let inovice : InoviceData = this.inoviceForm.value;
      if (this.editData){
        inovice.id = this.editData.id;
      }else{
        inovice.id = 0;
      }
      inovice.date = (new Date(inovice.date)).getTime().toString();
      console.log(inovice);
      if (this.actionBtn == "Add")
        this.service.add(inovice).subscribe(data => {
          if (data) {
            this.inoviceForm.reset();
            this.dialogRef.close(JSON.stringify(data));
          }
        });
      else {
        this.service.update(inovice).subscribe(data => {
          if (data) {
            this.inoviceForm.reset();
            this.dialogRef.close(JSON.stringify(data));
          }
        });
      }
    }
  }



}
