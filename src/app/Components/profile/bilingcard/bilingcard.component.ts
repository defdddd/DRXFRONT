import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import BilingData from 'src/app/Models/BilingData';
import { AuthService } from 'src/app/Services/auth.service';
import { BilingService } from 'src/app/Services/ModelServices/biling.service';

@Component({
  selector: 'app-bilingcard',
  templateUrl: './bilingcard.component.html',
  styleUrls: ['./bilingcard.component.css']
})
export class BilingcardComponent implements OnInit {

  bilingObject !: BilingData;
  form !: FormGroup;
  Edit: boolean = false;
  setInsert: boolean = true;
  EditButtonName: string = 'Edit';

  constructor(private bilingService: BilingService, private auth: AuthService, private fromBuilder: FormBuilder) {
    this.bilingObject = new BilingData();
  }

  ngOnInit(): void {
    this.setForm();
    this.bilingService.getMyData().subscribe(value => {
      if (value) {
        this.bilingObject = value;
        this.setForm();
        this.setInsert = false;
      }  
    });

  }

  setEdit() {

    if (this.Edit) {
      this.Edit = false;
      this.EditButtonName = 'Edit';
      if (this.form.valid) {
        var bilingData = new BilingData();
        bilingData.id = this.bilingObject.id;
        bilingData.fullName = this.form.value.fullName;
        bilingData.email = this.form.value.email;
        bilingData.adress = this.form.value.adress;
        bilingData.phone = this.form.value.phone;
        bilingData.userId = this.auth.GetId();
        if (this.setInsert) {
          this.bilingService.add(bilingData).subscribe((x) => this.bilingObject = x);
        }
        else
          this.bilingService.update(bilingData).subscribe((x) => this.bilingObject = x);
      }
    }
    else {
      this.Edit = true;
      this.EditButtonName = 'Save';
    }
  }

  private setForm() {
    this.form = this.fromBuilder.group({
      fullName: [this.bilingObject.fullName, [Validators.required, Validators.minLength(4)]],
      email: [this.bilingObject.email, [Validators.required]],
      adress: [this.bilingObject.adress, [Validators.required]],
      phone: [this.bilingObject.phone, [Validators.required]]
    });
  }

}
