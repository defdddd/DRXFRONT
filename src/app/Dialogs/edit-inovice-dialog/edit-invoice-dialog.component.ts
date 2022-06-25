import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import BilingData from 'src/app/Models/BilingData';
import InvoiceData from 'src/app/Models/InvoiceData';
import VehicleData from 'src/app/Models/VehicleData';
import { BilingService } from 'src/app/Services/ModelServices/biling.service';
import { InvoiceService } from 'src/app/Services/ModelServices/invoice.service';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';

@Component({
  selector: 'app-edit-invoice-dialog',
  templateUrl: './edit-invoice-dialog.component.html',
  styleUrls: ['./edit-invoice-dialog.component.css']
})
export class EditInvoiceDialogComponent implements OnInit {

  invoiceForm !: FormGroup;
  actionBtn: string = "Add";
  vehicleData !: VehicleData[];
  bilingData !: BilingData[];

  constructor(private service: InvoiceService, private formbuilder: FormBuilder, private dialogRef: MatDialogRef<EditInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: InvoiceData, private bilingService: BilingService, private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.bilingService.getAll().subscribe(result => this.bilingData = result);
    this.vehicleService.getAll().subscribe(result => this.vehicleData = result);
    this.invoiceForm = this.formbuilder.group({
      bilingId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      price: ['', Validators.required],
      usedTime: ['', Validators.required],
      date: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.invoiceForm.controls['bilingId'].setValue(this.editData.bilingId);
      this.invoiceForm.controls['vehicleId'].setValue(this.editData.vehicleId);
      this.invoiceForm.controls['price'].setValue(this.editData.price.toFixed(2));
      this.invoiceForm.controls['usedTime'].setValue(this.editData.usedTime);
      this.invoiceForm.controls['date'].setValue((new Date(this.editData.date)));

    }
  }

  addUser() {

    if (this.invoiceForm.valid) {

      let invoice : InvoiceData = this.invoiceForm.value;
      if (this.editData){
        invoice.id = this.editData.id;
      }else{
        invoice.id = 0;
      }
      invoice.date = (new Date(invoice.date)).getTime().toString();
      console.log(invoice);
      if (this.actionBtn == "Add")
        this.service.add(invoice).subscribe(data => {
          if (data) {
            this.invoiceForm.reset();
            this.dialogRef.close(JSON.stringify(data));
          }
        });
      else {
        this.service.update(invoice).subscribe(data => {
          if (data) {
            this.invoiceForm.reset();
            this.dialogRef.close(JSON.stringify(data));
          }
        });
      }
    }
  }



}
