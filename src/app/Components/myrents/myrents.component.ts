import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import InvoiceData from 'src/app/Models/InvoiceData';
import RentData from 'src/app/Models/RentData';
import VehicleData from 'src/app/Models/VehicleData';
import { AuthService } from 'src/app/Services/auth.service';
import { BilingService } from 'src/app/Services/ModelServices/biling.service';
import { InvoiceService } from 'src/app/Services/ModelServices/invoice.service';
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
  vehicles !: Map<number, VehicleData>;
  checked : boolean = false;

  constructor(private liveAnnouncer: LiveAnnouncer, private auth: AuthService, private route: Router,
    private rentService: RentService, private vehicleService: VehicleService, private invoiceService: InvoiceService,
    private bilingService: BilingService) {
    this.displayedColumns = ["Id", "Vehicle", 'Date', 'IsActive', 'Action'];
    this.vehicles = new Map<number, VehicleData>();
  }

  ngOnInit(): void {
    if (!this.auth.LoggedIn())
      this.route.navigate(['/']);
    else {
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
  isActiveFilter(){
    this.setRents();
  }

  async endRent(vehicle: number, date: number, rent: RentData) {
    var location = await this.getPosition();
    var vehicleData = this.vehicles.get(vehicle) ?? new VehicleData();
    var spentTime = ((Date.now() - date) / (1000 * 60));
    var alltoPay = Number.parseFloat((spentTime * vehicleData.pricePerMinute).toFixed(2));
    var hours = Math.floor(spentTime / 60);
    var minutes = spentTime % 60;
    Swal.fire({
      icon: 'info',
      title: 'Rent is over',
      text: `For the rent of ${vehicleData.name} your used time 
      is ${hours.toFixed()} hours and ${minutes.toFixed()} minutes and you have to pay ${(alltoPay + (19 * alltoPay) / 100).toFixed(2)} RON`
    })

    this.bilingService.getMyData().subscribe(result => {

      if (result) {

        var invoice = new InvoiceData();
        invoice.date = Date.now().toString();
        invoice.price = alltoPay;
        invoice.usedTime = spentTime.toString();
        invoice.vehicleId = vehicleData.id;
        invoice.bilingId = result.id;
        this.invoiceService.add(invoice).subscribe(value => {
          if (value) {
            rent.isActive = false;
            rent.lastLocation = JSON.stringify(location);
            this.rentService.update(rent).subscribe(x => {
              this.setRents();
            })
          }
        })

      }
    });
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        }, { timeout: 1000 });
    });

  }

  private setRents() {
    this.rentService.getMyRents().subscribe(
      (data: RentData[]) => {
        data.forEach(x => {
          this.vehicleService.getById(x.vehicleId).subscribe(result => {
            this.vehicles.set(result.id, result);
          })
        })
        let value = this.checked ? data.filter(x => x.isActive) : data;
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
