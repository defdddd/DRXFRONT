import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import InoviceData from 'src/app/Models/InoviceData';
import RentData from 'src/app/Models/RentData';
import VehicleData from 'src/app/Models/VehicleData';
import { AuthService } from 'src/app/Services/auth.service';
import { BilingService } from 'src/app/Services/ModelServices/biling.service';
import { InoviceService } from 'src/app/Services/ModelServices/inovice.service';
import { RentService } from 'src/app/Services/ModelServices/rent.service';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myrents',
  templateUrl: './myrents.component.html',
  styleUrls: ['./myrents.component.css']
})
export class MyrentsComponent implements OnInit {
  dataSource !: MatTableDataSource<RentData>;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  vehicles !: Map<number,VehicleData>;
  
  constructor(private liveAnnouncer: LiveAnnouncer, private auth: AuthService, private route: Router, 
    private rentService: RentService, private vehicleService: VehicleService, private inoviceService: InoviceService,
    private bilingService: BilingService) { 
    this.displayedColumns = ["Id","Vehicle","LastLocation",'Date','IsActive','Action'];
    this.vehicles = new Map<number,VehicleData>();
  }

  ngOnInit(): void {
    if(!this.auth.LoggedIn())
    this.route.navigate(['/']);
    else{
      this.setRents();
    }
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }


  endRent(vehicle: number, date: number, rent: RentData){
    var vehicleData = this.vehicles.get(vehicle) ?? new VehicleData();
    var spentTime =  ((Date.now() - date)/ (1000 * 60));
    var alltoPay  =  Number.parseFloat((spentTime * vehicleData.pricePerMinute).toFixed(2));
    var hours = Math.floor(spentTime / 60);          
    var minutes = spentTime % 60;
    Swal.fire({
      icon: 'info',
      title: 'Rent is over',
      text: `For the rent of ${vehicleData.name} your used time 
      is ${hours.toFixed()} hours and ${minutes.toFixed()} minutes and you have to pay ${(alltoPay + (19 * alltoPay)/100).toFixed(2)} RON`
    })

    this.bilingService.getMyData().subscribe(result => {

      if(result){

        var inovice = new InoviceData();
        inovice.date = Date.now().toString();
        inovice.price = alltoPay;
        inovice.usedTime = spentTime.toString();
        inovice.vehicleId = vehicleData.id;
        inovice.bilingId = result.id;
        this.inoviceService.add(inovice).subscribe(value => {
          if(value)
          {
            rent.isActive = false;
            this.rentService.update(rent).subscribe(x => {
              console.log(x)
              this.setRents();
            })
          }
        })

      }
    });
    

  }

  private setRents(){
    this.rentService.getMyRents().subscribe(
      (data: RentData[]) => {
        data.forEach(x => {
          this.vehicleService.getById(x.vehicleId).subscribe( result => {
          this.vehicles.set(result.id, result);
          })
        })
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
}
