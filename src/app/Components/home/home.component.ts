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
  public barChartData2 !: ChartData<'bar'>;
  public barChartData !: ChartData<'bar'>;

  AllVehicles : number = 0;
  AvailableVehicles : number = 0;
  AllElectric : number = 0;
  AllBikes : number = 0;
  AllCars : number = 0;

  constructor(private vehicleService: VehicleService) { }

  async ngOnInit(): Promise<void> {
    this.AllVehicles = await this.vehicleService.getCountAllAsync();
    this.AvailableVehicles = await this.vehicleService.getCountAvailableAsync();
    this.AllCars = await this.vehicleService.getAllCarCountAsync();
    this.AllElectric = await this.vehicleService.getAllElectricCountAsync();
    this.AllBikes = await this.vehicleService.getAllBikesCountAsync();
    this.setBarChart();
    this.setBarChart2();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
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


private setBarChart(){
  this.barChartData = {
    labels: [ 'Model information'],
    datasets: [
      { data: [ this.AllElectric ], label: 'Electric Vehicles' },
      { data: [ this.AllVehicles - this.AllElectric], label: 'Normal Vehicles' }
    ]
  };
}


private setBarChart2(){
  this.barChartData2 = {
    labels: [ 'Type information'],
    datasets: [
      { data: [ this.AllBikes ], label: 'Bikes' },
      { data: [ this.AllCars], label: 'Cars' },
      { data: [ this.AllVehicles - (this.AllBikes + this.AllCars)], label: 'Scooters' }
    ]
  };
}

}
