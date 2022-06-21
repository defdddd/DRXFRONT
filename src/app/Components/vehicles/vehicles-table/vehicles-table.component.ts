import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditVehiclesDialogComponent } from 'src/app/Dialogs/edit-vehicles-dialog/edit-vehicles-dialog.component';
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
  searchForm !: FormGroup;
  model: string = '';
  type: string = '';
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() changes !: number;

  constructor(private liveAnnouncer: LiveAnnouncer, private dialog: MatDialog, private vehiclesService: VehicleService, private formbuilder: FormBuilder) {
    this.displayedColumns = ["Id", "Type", "Model", 'Name', 'Price Per Minute', "Location", 'Action'];
  }

  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      typeS: [''],
      modelS: ['']
    });
  }

  ngOnChanges() {
    this.setTable();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  editVehicle(element: VehicleData) {
    this.dialog.open(EditVehiclesDialogComponent, {
      width: "auto",
      maxWidth: "700px",
      data: element

    }).afterClosed().subscribe(val => {
      if (val)
        this.setTable();
    }
    );
  }
  deleteVehicle(id: number) {
    this.vehiclesService.delete(id).subscribe(result => {
      if (result)
        this.setTable();
    });
  }

  private setSearch() {
    if(this.searchForm){
    let modelValue = this.searchForm.get('modelS')?.value;
    let typeValue = this.searchForm.get('typeS')?.value;

    if(!modelValue) modelValue = '';
    if(!typeValue) typeValue = '';

    this.model = modelValue.length > 0 ? modelValue : 'n';
    this.type = typeValue.length > 0 ? typeValue : 'n';
    }
  }
  resetSearch(){
    this.searchForm.reset();
    this.setTable();
  }

  setTable() {
    this.setSearch();
    if (this.type.length > 1 || this.model.length > 1)
      this.vehiclesService.getAllSearchByVehicles(this.type, this.model).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

    else
      this.vehiclesService.getAll().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
