import { Component, OnInit } from '@angular/core';

import { AdminpdvServiceWeb } from '../../webServiceClients/Adminpdv/adminpdv.service';

@Component({
  selector: 'app-adminpdv-dashboard',
  templateUrl: './adminpdv-dashboard.component.html',
  styleUrls: ['./adminpdv-dashboard.component.css']
})
export class AdminpdvDashboardComponent implements OnInit {

  adminpdvDashboardMontantTransfertParservices: any;
  adminpdvDashboardPerformancepdv: any;
  adminpdvDashboardNbreReclVente: any;
  loading = false ;
  public checkPerformance:any = {journee: true, semaine: false, mois: false};
  typeperformance:string = " de la journée";
  detailperformancepdv:any;
  performancepdv:any;

  constructor(private adminpdvServiceWeb: AdminpdvServiceWeb) {

  }

  ngOnInit(): void {
    this.adminpdvServiceWeb.nombredereclamationpdvvente('azrrtt').then(adminpdvServiceWebList => {
      console.log(adminpdvServiceWebList);
      this.adminpdvDashboardNbreReclVente = adminpdvServiceWebList.response ;
    });
    
    this.estcheckPerformance('journee');
  }

  estcheckPerformance(type: string){
    if(type == 'journee'){
      this.checkPerformance.journee = true;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = false;
      this.typeperformance = "de la journée";

      this.adminpdvServiceWeb.performancepdv('journee').then(adminpdvServiceWebList => {
        this.adminpdvDashboardPerformancepdv = adminpdvServiceWebList.response;
      });

      this.detailperformancepdv = null;
      this.performancepdv = null;
    }
    else if(type == 'semaine'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = true;
      this.checkPerformance.mois = false;
      this.typeperformance = "de la semaine";

      this.adminpdvServiceWeb.performancepdv('semaine').then(adminpdvServiceWebList => {
        this.adminpdvDashboardPerformancepdv = adminpdvServiceWebList.response;
      });

      this.detailperformancepdv = null;
      this.performancepdv = null;
    }
    else if(type == 'mois'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = true;
      this.typeperformance = "du mois";
      
      this.adminpdvServiceWeb.performancepdv('mois').then(adminpdvServiceWebList => {
        this.adminpdvDashboardPerformancepdv = adminpdvServiceWebList.response;
      });

      this.detailperformancepdv = null;
      this.performancepdv = null;
    }
  }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }


  estdetailPerformance(pdv:any){
    this.performancepdv = pdv; 
    let type:string="";
    if (this.checkPerformance.journee) {
      type = "journee";
    }
    if (this.checkPerformance.semaine) {
      type = "semaine";
    }
    if (this.checkPerformance.mois) {
      type = "mois";
    }
    this.adminpdvServiceWeb.detailperformancepdv(type, pdv.idpdv).then(adminpdvServiceWebList => {
      console.log(adminpdvServiceWebList.response);
      this.detailperformancepdv = adminpdvServiceWebList.response;
    });
  }
  

}
