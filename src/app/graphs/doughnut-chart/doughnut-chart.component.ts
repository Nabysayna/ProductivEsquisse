import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() doughnutChartLabels: string[];
  @Input() doughnutChartData: number[];
  
  
  constructor() { }

  ngOnInit() {
  }

  
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }

}
