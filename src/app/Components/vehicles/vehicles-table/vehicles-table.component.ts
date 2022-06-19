import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import VehicleData from 'src/app/Models/VehicleData';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css']
})
export class VehiclesTableComponent implements OnInit {
  displayedColumns!: string[];
  dataSource !: MatTableDataSource<VehicleData>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() changes !: number;

  constructor(private liveAnnouncer: LiveAnnouncer, private vehiclesService: VehicleService) {
    this.displayedColumns = ["Id", "Type", "Model",'Name','Price Per Minute', "Location", 'Action'];
   }

  ngOnInit(): void {    
  }
  
  ngOnChanges(){
    this.setTable();
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  setTable(){
    this.vehiclesService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
