import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EditInvoiceDialogComponent } from 'src/app/Dialogs/edit-inovice-dialog/edit-invoice-dialog.component';
import InoviceData from 'src/app/Models/InvoiceData';
import VehicleData from 'src/app/Models/VehicleData';
import { AuthService } from 'src/app/Services/auth.service';
import { InoviceService } from 'src/app/Services/ModelServices/invoice.service';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { BilingService } from 'src/app/Services/ModelServices/biling.service';
import BilingData from 'src/app/Models/BilingData';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  dataSource !: MatTableDataSource<InoviceData>;
  searchForm !: FormGroup;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  vehicles !: Map<number, VehicleData>;
  biling !: Map<number, BilingData>;
  constructor(private authService: AuthService, private route: Router, private inoviceService: InoviceService, private dialog: MatDialog,
     private vehicleService: VehicleService, private liveAnnouncer: LiveAnnouncer, private bilingService: BilingService) {
    this.displayedColumns = ["Id", "User", "Vehicle", "Date", "Action"];
    this.vehicles = new Map<number, VehicleData>();
    this.biling = new Map<number, BilingData>();


   }

  ngOnInit(): void {
    if (!this.authService.LoggedIn() && !this.authService.IsAdmin())
     this.route.navigate(['/']);
    else{
      this.setTable();
    }

  }

  editInovice(element: any) {
    this.dialog.open(EditInvoiceDialogComponent, {
      width: "auto",
      maxWidth: "700px",
      data: element

    }).afterClosed().subscribe(val => {
      if (val)
        this.setTable();
    }
    );
  }
  deleteInovice(id: number) {
    this.inoviceService.delete(id).subscribe(result => {
      if (result)
        this.setTable();
    });
  }
  setTable() {
    this.setInovices();
      this.inoviceService.getAll().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  getInovicePdf(rent: InoviceData, vehicleId: number, inoiceNo: number) {
    let vehicle = this.vehicles.get(vehicleId) ?? new VehicleData();
    this.setPdf(rent, vehicle, inoiceNo);
  }

  private setInovices() {
    this.inoviceService.getAll().subscribe(
      (data: InoviceData[]) => {
        data.forEach(x => {

          this.vehicleService.getById(x.vehicleId).subscribe(result => {
            this.vehicles.set(result.id, result);
          });
          this.bilingService.getById(x.bilingId).subscribe(result => {
            this.biling.set(result.id, result);
          });

        })
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  private setPdf(rent: InoviceData, vehicle: VehicleData, inoiceNo: number) {
    let bilingData : BilingData = this.biling.get(rent.bilingId) ?? new BilingData();
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
                text: bilingData.fullName,
                bold: true
              },
              { text: bilingData.adress },
              { text: bilingData.email },
              { text: bilingData.phone }
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
          text: bilingData.fullName,
          margin: [0, 0, 0, 15]
        },
        {
          columns: [
            [{ qr: `${bilingData.fullName}`, fit: 50 }],
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


}
