import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { VehicleService } from 'src/app/Services/ModelServices/vehicle.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  AllVehicles : number = 0;
  AvailableVehicles : number = 0;
  AllElectric : number = 0;
  AllBikes : number = 0;
  AllCars : number = 0;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getCountAll().subscribe(x => this.AllVehicles = x);
    this.vehicleService.getCountAvailable().subscribe(x => this.AvailableVehicles = x);
    this.vehicleService.getAllCarCount().subscribe(x => this.AllCars = x);
    this.vehicleService.getAllElectricCount().subscribe(x => this.AllElectric = x);
    this.vehicleService.getAllBikesCount().subscribe(x => {
      this.AllBikes = x;
      this.setBarChart();
      this.setBarChart2();
    });
  }


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

public barChartData !: ChartData<'bar'>;

private setBarChart(){
  this.barChartData = {
    labels: [ 'Activity information'],
    datasets: [
      { data: [ this.AllElectric ], label: 'Electric Vehicles' },
      { data: [ this.AllVehicles - this.AllElectric], label: 'Normal Vehicles' }
    ]
  };
}

public barChartData2 !: ChartData<'bar'>;

private setBarChart2(){
  this.barChartData2 = {
    labels: [ 'Activity information'],
    datasets: [
      { data: [ this.AllBikes ], label: 'Bikes' },
      { data: [ this.AllCars], label: 'Cars' },
      { data: [ this.AllVehicles - (this.AllBikes + this.AllCars)], label: 'Scooters' }

    ]
  };
}

}
