import { Component, OnInit } from '@angular/core';

import { AdminmultipdvDeposit }    from '../../models/adminmultipdv-monitoring';
import { AdminmultipdvDepositInitialConsommeParService }    from '../../models/adminmultipdv-monitoring-dicps';
import { AdminmultipdvServiceWeb } from '../../webServiceClients/Adminmultipdv/adminmultipdv.service';



@Component({
  selector: 'app-admin-multi-pdv-monitoring',
  templateUrl: './admin-multi-pdv-monitoring.component.html',
  styleUrls: ['./admin-multi-pdv-monitoring.component.css']
})
export class AdminmultipdvMonitoringComponent implements OnInit {

  public monitoringAdminmultipdvDeposit: AdminmultipdvDeposit;
  public monitoringAdminmultipdvDepositParService: AdminmultipdvDepositInitialConsommeParService;
  loading = false ;

  // For progreesbar
  public max: number;
  public showWarning: boolean;
  public dynamic: number;
  public type: string;


  // Bar
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[];



  constructor(private adminmultipdvServiceWeb: AdminmultipdvServiceWeb) { }

  ngOnInit() {
    this.loading = true ;
    this.adminmultipdvServiceWeb.bilandeposit('azrrtt').then(adminmultipdvServiceWebList => {
      console.log(adminmultipdvServiceWebList.response);
      this.monitoringAdminmultipdvDeposit = adminmultipdvServiceWebList.response;
      this.max = this.monitoringAdminmultipdvDeposit.depositInitial;
      this.dynamic = this.monitoringAdminmultipdvDeposit.depositConsomme;
      if ( this.dynamic <= (this.max*0.3) ){ this.type = 'danger'; }
      else if ( (this.dynamic > (this.max*0.3)) && (this.dynamic <= (this.max*0.5)) ){ this.type = 'warning'; }
      else if ( (this.dynamic > (this.max*0.5)) && (this.dynamic <= (this.max*1)) ){ this.type = 'info'; }
      else if ( this.dynamic > (this.max*1) ){ this.type = 'success'; }
      this.loading = false ;
    });

    this.adminmultipdvServiceWeb.depositinitialconsommeparservice('azrrtt').then(adminmultipdvServiceWebList => {
      this.monitoringAdminmultipdvDepositParService = adminmultipdvServiceWebList.response;
      this.barChartLabels = this.monitoringAdminmultipdvDepositParService.services;
      this.barChartData = [
      {data: this.monitoringAdminmultipdvDepositParService.depositinitial, label: 'Déposit initial'},
      {data: this.monitoringAdminmultipdvDepositParService.depositconsomme, label: 'Etat Déposit'}
      ]
    });



  }



}
