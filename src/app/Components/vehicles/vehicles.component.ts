import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import VehicleData from 'src/app/Models/VehicleData';
import { AuthService } from 'src/app/Services/auth.service';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles !: VehicleData[];
  changes !: number ;

  constructor(private auth: AuthService, private route: Router) {  }

  ngOnInit(): void {
    if (!this.auth.LoggedIn())
      this.route.navigate(['/']);
  }

  setChanges(){
    this.changes = 0;
  }
}
