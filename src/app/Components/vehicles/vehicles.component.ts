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
  dataSource !: MatTableDataSource<VehicleData>;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private auth: AuthService, private route: Router, 
    private vehiclesService: VehicleService, private liveAnnouncer: LiveAnnouncer) {
      this.displayedColumns = ["Id", "Type", "Model",'Name','Price Per Minute', "Location", 'Action'];

     }

  ngOnInit(): void {
    if (!this.auth.LoggedIn())
      this.route.navigate(['/']);
    else {
      this.setTable();
      
    }

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
  setTable(){
    this.vehiclesService.getAll().subscribe(x => {

      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

}
