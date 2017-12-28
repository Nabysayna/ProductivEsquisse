import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { AdminmultipdvNombredeReclamationAgentPdvVente }    from '../../models/adminmultipdv-dashboard-nrpv';
import { AdminmultipdvActiviteservices }    from '../../models/adminmultipdv-dashboard-as';
import { AdminmultipdvServiceWeb } from '../../webServiceClients/Adminmultipdv/adminmultipdv.service';

@Component({
  selector: 'app-admin-multi-pdv-dashboard',
  templateUrl: './admin-multi-pdv-dashboard.component.html',
  styleUrls: ['./admin-multi-pdv-dashboard.component.css']
})
export class AdminmultipdvDashboardComponent implements OnInit {

  public lineChartData:Array<any>;
  public lineTilte:string;
  public lineChartLabels:Array<any>;
  public lineChartOptions:any = { responsive: true };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  adminmultpdvperformancesservices: any;
  loading = false ;
  nbreOp : number = undefined;
  adminmultipdvActiviteservices: any;
  AdminmultipdvNombredereclamationagentpdvvente: AdminmultipdvNombredeReclamationAgentPdvVente;
  detailAdminPerformance:any;

  public checkPerformance:any = {journee: true, semaine: false, mois: false, annee: false, tous: false};
  typeperformance:string = " dans la journée";
  detailperformancepdv:any;
  performanceadminpdv:any;


  @ViewChild('childModal') public childModal:ModalDirective;
  public showChildModal():void {
    this.childModal.show();
  }
  public hideChildModal():void {
    this.childModal.hide();
    this.detailperformancepdv = null;
    this.performanceadminpdv = null;
  }

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "fullname";
  public sortOrder = "desc";
  public performancesadminclasserbylotbydate:any


  constructor(private adminmultipdvServiceWeb: AdminmultipdvServiceWeb) {}

  ngOnInit(): void {
    this.nombredereclamationagentpdvvente();
    this.activiteservice("Nombre d'opérations par mois");
    this.estcheckPerformance('journee');
  }

  public colorsEmptyObject: Array<Color> = [{}];
  public datasets: any[];

  public chartClickedps(e:any):void {
//    console.log(e);
  }

  public chartClicked(e:any):void {
    if (e.active[0]){
      console.log(e.active[0]._model.label);
      this.estdetailPerformance(e.active[0]._model.label);
      this.showChildModal();
    }
  }

  public nombredereclamationagentpdvvente():void {
    this.adminmultipdvServiceWeb.nombredereclamationagentpdvvente('azrrtt').then(adminpdvServiceWebList =>
      this.AdminmultipdvNombredereclamationagentpdvvente = adminpdvServiceWebList.response
    );
  }

  public performancesadminclasserbydate(type:string):void {
    console.log(type);
    this.adminmultipdvServiceWeb.performancesadminclasserbydate(type).then(adminmultipdvServiceWebList => {
      this.adminmultpdvperformancesservices = adminmultipdvServiceWebList.response ;
      this.nbreOp = adminmultipdvServiceWebList.nbreop ;
      this.datasets = [{
        data: this.adminmultpdvperformancesservices.montanttotal,
        backgroundColor: ["red", "yellow", "orange", "green"]
      }];
    });
  }

  public activiteservice(lineTitle):void {
    this.adminmultipdvServiceWeb.activiteservices(lineTitle).then(adminpdvServiceWebList =>{
      this.adminmultipdvActiviteservices = adminpdvServiceWebList.response;
      this.lineChartData = this.adminmultipdvActiviteservices.datas;
      this.lineChartLabels = this.adminmultipdvActiviteservices.dateactivite;
      this.lineTilte = this.adminmultipdvActiviteservices.typeactivite;
    });
  }

  estcheckPerformance(type: string){
    if(type == 'journee'){
      this.checkPerformance.journee = true;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = false;
      this.checkPerformance.annee = false;
      this.checkPerformance.tous = false;
      this.typeperformance = "dans la journée";

      this.detailperformancepdv = null;
      this.performanceadminpdv = null;
    }
    else if(type == 'semaine'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = true;
      this.checkPerformance.mois = false;
      this.checkPerformance.annee = false;
      this.checkPerformance.tous = false;
      this.typeperformance = "dans la semaine";

      this.detailperformancepdv = null;
      this.performanceadminpdv = null;
    }
    else if(type == 'mois'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = true;
      this.checkPerformance.annee = false;
      this.checkPerformance.tous = false;
      this.typeperformance = "dans le mois";

      this.detailperformancepdv = null;
      this.performanceadminpdv = null;
    }
    else if(type == 'annee'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = false;
      this.checkPerformance.annee = true;
      this.checkPerformance.tous = false;
      this.typeperformance = "dans l'année";

      this.detailperformancepdv = null;
      this.performanceadminpdv = null;
    }
    else if(type == 'tous'){
      this.checkPerformance.journee = false;
      this.checkPerformance.semaine = false;
      this.checkPerformance.mois = false;
      this.checkPerformance.annee = false;
      this.checkPerformance.tous = true;
      this.typeperformance = "dans l'ensemble";

      this.detailperformancepdv = null;
      this.performanceadminpdv = null;
    }

    this.performancesadminclasserbydate(type);
  }

  estdetailPerformance(lot:string){
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
    console.log(type+' '+lot);

    this.loading = true ;
    this.adminmultipdvServiceWeb.performancesadminclasserbylotbydate(lot, type).then(adminmultipdvServiceWebList => {
      console.log(adminmultipdvServiceWebList);
      if(adminmultipdvServiceWebList.errorCode == 1){
        this.performancesadminclasserbylotbydate = adminmultipdvServiceWebList.response;
      }
      else{
        this.performancesadminclasserbylotbydate = [];
      }
      this.loading = false ;
    });

  }

  public detailperformancesadminclasserbydate(adminpdv: any){
    this.performanceadminpdv = adminpdv;
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
    this.adminmultipdvServiceWeb.detailperformancesadminclasserbydate(adminpdv.idadminpdv, type).then(adminmultipdvServiceWebList => {
      if(adminmultipdvServiceWebList.errorCode == 1){
        console.log('-------------------------');
        this.detailperformancepdv = adminmultipdvServiceWebList.response.map(function (op) {
          return {
            dateoperation: op.dateoperation.date.split('.')[0],
            fullname: op.fullname,
            idadminpdv: op.idadminpdv,
            montanttotal: op.montanttotal,
            operateur: op.operateur,
            telephone: op.telephone,
            traitement: op.traitement,
          }
        });
        console.log(this.detailperformancepdv);
      }
      else{
        this.detailperformancepdv = null;
      }
    });
  }

  public activiteserviceparno():void {
    this.activiteservice("Nombre d'opérations par mois");
  }

  public activiteserviceparmp():void {
    this.activiteservice("Montant perçus par mois");
  }

  public activiteserviceparmd():void {
    this.activiteservice("Montant donnés par mois");
  }

}
