import { Component, OnInit } from '@angular/core';

import { AdminpdvServiceWeb } from '../../webServiceClients/Adminpdv/adminpdv.service';

@Component({
  selector: 'app-adminpdv-dashboard',
  templateUrl: './adminpdv-dashboard.component.html',
  styleUrls: ['./adminpdv-dashboard.component.css']
})
export class AdminpdvDashboardComponent implements OnInit {

  adminpdvDashboardPerformancepdv: any;
  adminpdvDashboardNbreReclVente: any;
  loading = false ;
  public checkPerformance:any = {journee: true, semaine: false, mois: false, annee: false, tous: false};
  typeperformance:string = " de la journée";
  detailperformancepdv:any;
  performancepdv:any;

  constructor(private adminpdvServiceWeb: AdminpdvServiceWeb) {

  }

  ngOnInit(): void {
    this.adminpdvServiceWeb.nombredereclamationpdvvente('azrrtt').then(adminpdvServiceWebList => {
      console.log(adminpdvServiceWebList);
      this.adminpdvDashboardNbreReclVente = adminpdvServiceWebList.response ;
      this.lineChartData = this.adminpdvDashboardNbreReclVente.activitesoperateur.datas;
      this.lineChartLabels = this.adminpdvDashboardNbreReclVente.activitesoperateur.dateactivite;
      console.log(this.lineChartLabels);
    });

    this.estcheckPerformance('journee');
  }

  estcheckPerformance(type: string){
    if(type == 'journee'){
      this.checkPerformance.journee = true;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = false;
      this.checkPerformance.annee = false;
      this.checkPerformance.tous = false;
      this.typeperformance = "de la journée";

      this.adminpdvServiceWeb.performancepdv('journee').then(adminpdvServiceWebList => {
        this.adminpdvDashboardPerformancepdv = adminpdvServiceWebList.response;
        console.log(this.adminpdvDashboardPerformancepdv);

      });

      this.detailperformancepdv = null;
      this.performancepdv = null;
    }
    else if(type == 'semaine'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = true;
      this.checkPerformance.mois = false;
      this.checkPerformance.annee = false;
      this.checkPerformance.tous = false;
      this.typeperformance = "de la semaine";

      this.adminpdvServiceWeb.performancepdv('semaine').then(adminpdvServiceWebList => {
        console.log(adminpdvServiceWebList);
        this.adminpdvDashboardPerformancepdv = adminpdvServiceWebList.response;
      });

      this.detailperformancepdv = null;
      this.performancepdv = null;
    }
    else if(type == 'annee'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = false;
      this.checkPerformance.annee = true;
      this.checkPerformance.tous = false;
      this.typeperformance = "dans l'année";

      this.adminpdvServiceWeb.performancepdv('annee').then(adminpdvServiceWebList => {
        console.log(adminpdvServiceWebList);
        this.adminpdvDashboardPerformancepdv = adminpdvServiceWebList.response;
      });

      this.detailperformancepdv = null;
      this.performancepdv = null;
    }
    else if(type == 'tous'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = false;
      this.checkPerformance.annee = false;
      this.checkPerformance.tous = true;
      this.typeperformance = "de l'ensemble";

      this.adminpdvServiceWeb.performancepdv('tous').then(adminpdvServiceWebList => {
        console.log(adminpdvServiceWebList);
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
        console.log(adminpdvServiceWebList);
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
    if (this.checkPerformance.annee) {
      type = "annee";
    }
    if (this.checkPerformance.tous) {
      type = "tous";
    }
    this.adminpdvServiceWeb.detailperformancepdv(type, pdv.idpdv).then(adminpdvServiceWebList => {
      this.detailperformancepdv = adminpdvServiceWebList.response.map(function (op) {
        return{
          dateoperation: op.dateoperation.date.split('.')[0],
          operateur:op.operateur,
          traitement:op.traitement,
          montant:op.montant
        }
      });
      console.log(adminpdvServiceWebList);

    });
  }

  public lineChartData:Array<any> = [{data: [], label: ''}];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };




}
