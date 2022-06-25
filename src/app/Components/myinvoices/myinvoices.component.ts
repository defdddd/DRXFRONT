import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import InoviceData from 'src/app/Models/InvoiceData';
import VehicleData from 'src/app/Models/VehicleData';
import { AuthService } from 'src/app/Services/auth.service';
import { InoviceService } from 'src/app/Services/ModelServices/invoice.service';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';
import { BilingService } from 'src/app/Services/ModelServices/biling.service';
import BilingData from 'src/app/Models/BilingData';
import RentData from 'src/app/Models/RentData';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { CustomTableLayout, TDocumentDefinitions } from 'pdfmake/interfaces';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-myinvoices',
  templateUrl: './myinvoices.component.html',
  styleUrls: ['./myinvoices.component.css']
})
export class MyinvoicesComponent implements OnInit {
  dataSource !: MatTableDataSource<InoviceData>;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  vehicles !: Map<number, VehicleData>;
  bilingData !: BilingData;

  constructor(private auth: AuthService, private route: Router, private liveAnnouncer: LiveAnnouncer,
    private inoviceService: InoviceService, private vehicleService: VehicleService, private bilingService: BilingService) {
    this.displayedColumns = ["Id", "Vehicle", "Date", "Download"];
    this.setInovices();
    this.vehicles = new Map<number, VehicleData>();
  }

  ngOnInit(): void {
    if (!this.auth.LoggedIn())
      this.route.navigate(['/']);
    else {
      this.bilingService.getMyData().subscribe(result => this.bilingData = result);
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  getInovicePdf(rent: InoviceData, vehicleId: number, inoiceNo: number) {
    let vehicle = this.vehicles.get(vehicleId) ?? new VehicleData();
    this.setPdf(rent, vehicle, inoiceNo);
  }

  //#region private functions

  private setInovices() {
    this.inoviceService.getMyInovices().subscribe(
      (data: InoviceData[]) => {
        data.forEach(x => {
          this.vehicleService.getById(x.vehicleId).subscribe(result => {
            this.vehicles.set(result.id, result);
          })
        })
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  private setPdf(rent: InoviceData, vehicle: VehicleData, inoiceNo: number) {
    let docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: 'Electric Vehicles Rent',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.bilingData.fullName,
                bold: true
              },
              { text: this.bilingData.adress },
              { text: this.bilingData.email },
              { text: this.bilingData.phone }
            ],
            [
              {
                text: `Date: ${new Date(Number.parseFloat(rent.date))}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${rent.id}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Name', 'Type', 'Model', 'Price per minute (RON)'],
              [vehicle.id, vehicle.name, vehicle.type, vehicle.model, {text: vehicle.pricePerMinute, alignment: 'right'}],
              [{ text: 'Price without TVA', colSpan: 4,}, {}, {}, {}, {text: rent.price.toFixed(2), alignment: 'right'}],
              [{ text: 'Total Amount (TVA 19%)', colSpan: 4 }, {}, {}, {}, {text: (rent.price + (19 * rent.price) / 100).toFixed(2), alignment: 'right'}]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
          text: this.bilingData.fullName,
          margin: [0, 0, 0, 15]
        },
        {
          columns: [
            [{ qr: `${this.bilingData.fullName}`, fit: 50 }],
            [{ text: 'Signature', alignment: 'right', italics: true }]
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
          ul: [
            'The damage to the vehicle is allocated by its insurance.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice.',
          ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    pdfMake.createPdf(docDefinition).download(`InoviceWithNumber${inoiceNo}.pdf`);
  }
  //#endregion
}
