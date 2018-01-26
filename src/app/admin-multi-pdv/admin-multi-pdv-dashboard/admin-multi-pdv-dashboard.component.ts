import { ViewChild, ElementRef, Component, OnInit} from '@angular/core';
import {Color, BaseChartDirective} from 'ng2-charts';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { AdminmultipdvNombredeReclamationAgentPdvVente }    from '../../models/adminmultipdv-dashboard-nrpv';
import { AdminmultipdvServiceWeb } from '../../webServiceClients/Adminmultipdv/adminmultipdv.service';

@Component({
  selector: 'app-admin-multi-pdv-dashboard',
  templateUrl: './admin-multi-pdv-dashboard.component.html',
  styleUrls: ['./admin-multi-pdv-dashboard.component.css']
})
export class AdminmultipdvDashboardComponent implements OnInit {

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
    this.loading = true;
    this.adminmultipdvServiceWeb.nombredereclamationagentpdvvente('azrrtt').then(adminpdvServiceWebList =>
      this.AdminmultipdvNombredereclamationagentpdvvente = adminpdvServiceWebList.response
    ).then(() => {
        this.suiviserviceInit();
    }).then(() => {
      this.estcheckPerformance('journee');
    });
  }

  public colorsEmptyObject: Array<Color> = [{}];
  public datasets: any[];

  public chartClickedps(e:any):void {
//    console.log(e);
  }

  tocurrency(number){
    return Number(number).toLocaleString();
  }


  public chartClicked(e:any):void {
    if (e.active[0]){
      this.estdetailPerformance(e.active[0]._model.label);
      this.showChildModal();
    }
  }

  public performancesadminclasserbydate(type:string):void {
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

    this.loading = true ;
    this.adminmultipdvServiceWeb.performancesadminclasserbylotbydate(lot, type).then(adminmultipdvServiceWebList => {
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

  //***************************** Activité service ************************
  @ViewChild("baseChart")  chart: BaseChartDirective;
  public suiviserviceSelectionintervalledateinit:string;
  public suiviserviceSelectionintervalledatefinal:string;
  public touslescommissions:any[] = [];
  public touslesjours:any[] = [];
  public bilantouslescommissions:any[] = [];
  public touslescommissionsbyservice:any[] = [];

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = { responsive: true };
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = true;

  public lineTilte:string;

  public suiviserviceInit(){
    let datenow = ((new Date()).toJSON()).split("T",2)[0];
    this.suiviserviceSelectionintervalledateinit = datenow;
    this.suiviserviceSelectionintervalledatefinal = datenow;
    this.adminmultipdvServiceWeb.activiteservices(this.suiviserviceSelectionintervalledateinit+" "+this.suiviserviceSelectionintervalledatefinal).then(adminpdvServiceWebList =>{
      this.touslescommissions = adminpdvServiceWebList.response;
      this.touslescommissions = this.touslescommissions.map(function(type){
        return {
          id_gerant: type.idUser,
          dateop: type.dateoperation.date.split('.')[0],
          dateop_jour: type.dateoperation.date.split('.')[0].split(' ')[0],
          dateop_heure: type.dateoperation.date.split('.')[0].split(':')[0],
          montant: Number(type.montant),
          commission: Number(type.commissionbbs),
          service: type.nomservice.toLowerCase(),
          adminpdv: type.adminpdv,
          pdv: type.pdv,
          produit: type.libelleoperation.toLowerCase(),
        }
      });
    }).then(()  => {
      this.suiviSelectionByHeure();
    }).then(()  => {
      this.suivipointsdetail();
      console.log('-------------------------------')
    });
  }

  public suiviSelectionByHeure(){
    this.lineChartData = [];
    this.lineChartLabels = [];

    this.touslesjours = this.touslescommissions.map( type => type.dateop_heure);
    this.touslesjours.sort();

    let tabjours:string[] = [];
    let jour:string = this.touslesjours[0];
    tabjours.push(jour);
    this.lineChartLabels.push(jour);
    this.touslesjours.forEach(type => {
      if(type!=jour){
        tabjours.push(type);
        this.lineChartLabels.push(type);
        jour = type;
      }
    });

    if(this.chart !== undefined){
      this.chart.chart.config.data.labels = this.lineChartLabels;
    }

    let nbrebyjourom:number[] = [];
    let nbrebyjourtnt:number[] = [];
    let nbrebyjourpost:number[] = [];
    let nbrebyjourwizall:number[] = [];
    let nbrebyjourtigocash:number[] = [];
    tabjours.forEach(type => {
      let nbrebyjouromSom:number = 0;
      let nbrebyjourtntSom:number = 0;
      let nbrebyjourpostSom:number = 0;
      let nbrebyjourwizallSom:number = 0;
      let nbrebyjourtigocashSom:number = 0;

      this.touslescommissions.forEach( opt => { if(opt.dateop_heure==type && opt.service=='orangemoney'){ nbrebyjouromSom += Number(opt.montant); } }); nbrebyjourom.push( nbrebyjouromSom );
      this.touslescommissions.forEach( opt => { if(opt.dateop_heure==type && opt.service=='tnt'){ nbrebyjourtntSom += Number(opt.montant); } }); nbrebyjourtnt.push( nbrebyjourtntSom );
      this.touslescommissions.forEach( opt => { if(opt.dateop_heure==type && opt.service=='postcash'){ nbrebyjourpostSom += Number(opt.montant); } }); nbrebyjourpost.push( nbrebyjourpostSom );
      this.touslescommissions.forEach( opt => { if(opt.dateop_heure==type && opt.service=='wizall'){ nbrebyjourwizallSom += Number(opt.montant); } }); nbrebyjourwizall.push( nbrebyjourwizallSom );
      this.touslescommissions.forEach( opt => { if(opt.dateop_heure==type && opt.service=='tigocash'){ nbrebyjourtigocashSom += Number(opt.montant); } }); nbrebyjourtigocash.push( nbrebyjourtigocashSom );
    });

    this.lineChartData = [
      {data: nbrebyjourom, label: 'OM'},
      {data: nbrebyjourtnt, label: 'TNT'},
      {data: nbrebyjourpost, label: 'POSTECASH'},
      {data: nbrebyjourwizall, label: 'WIZALL'},
      {data: nbrebyjourtigocash, label: 'TIGOCASH'},
    ];

    this.loading = false;
  }

  public suiviserviceIntervalle(){
    this.loading = true;
    console.log('intervalle');
    this.adminmultipdvServiceWeb.activiteservices(this.suiviserviceSelectionintervalledateinit+" "+this.suiviserviceSelectionintervalledatefinal).then(adminpdvServiceWebList =>{
      console.log(adminpdvServiceWebList.response);
      console.log('-----------------------------');
      this.touslescommissions = adminpdvServiceWebList.response.map(function(type){
        return {
          id_gerant: type.idUser,
          dateop: type.dateoperation.date.split('.')[0],
          dateop_jour: type.dateoperation.date.split('.')[0].split(' ')[0],
          dateop_heure: type.dateoperation.date.split('.')[0].split(':')[0],
          montant: Number(type.montant),
          commission: Number(type.commissionbbs),
          service: type.nomservice.toLowerCase(),
          adminpdv: type.adminpdv,
          pdv: type.pdv,
          produit: type.libelleoperation.toLowerCase(),
        }
      });
    }).then(()  => {
      if(this.suiviserviceSelectionintervalledateinit==this.suiviserviceSelectionintervalledatefinal){
        this.suiviSelectionByHeure();
      }
      else{
        this.suivionepointSelectionGerant();
      }
    }).then(()  => {
      this.suivipointsdetail();
    });
  }

  public suivionepointSelectionGerant(){
    this.lineChartData = [];
    this.lineChartLabels = [];

    this.touslesjours = this.touslescommissions.map( type => type.dateop_jour);
    this.touslesjours.sort();
    let tabjours:string[] = [];
    let jour:string = this.touslesjours[0];
    tabjours.push(jour);
    this.lineChartLabels.push(jour);
    this.touslesjours.forEach(type => {
      if(type!=jour){
        tabjours.push(type);
        this.lineChartLabels.push(type);
        jour = type;
      }
    });

    if(this.chart !== undefined){
      this.chart.chart.config.data.labels = this.lineChartLabels;
    }

    let nbrebyjourom:number[] = [];
    let nbrebyjourtnt:number[] = [];
    let nbrebyjourpost:number[] = [];
    let nbrebyjourwizall:number[] = [];
    let nbrebyjourtigocash:number[] = [];
    tabjours.forEach(type => {
      let nbrebyjouromSom:number = 0;
      let nbrebyjourtntSom:number = 0;
      let nbrebyjourpostSom:number = 0;
      let nbrebyjourwizallSom:number = 0;
      let nbrebyjourtigocashSom:number = 0;

      this.touslescommissions.forEach( opt => { if(opt.dateop_jour==type && opt.service.toLowerCase()=='orangemoney'){ nbrebyjouromSom += Number(opt.montant); } }); nbrebyjourom.push( nbrebyjouromSom );
      this.touslescommissions.forEach( opt => { if(opt.dateop_jour==type && opt.service.toLowerCase()=='tnt'){ nbrebyjourtntSom += Number(opt.montant); } }); nbrebyjourtnt.push( nbrebyjourtntSom );
      this.touslescommissions.forEach( opt => { if(opt.dateop_jour==type && opt.service.toLowerCase()=='postcash'){ nbrebyjourpostSom += Number(opt.montant); } }); nbrebyjourpost.push( nbrebyjourpostSom );
      this.touslescommissions.forEach( opt => { if(opt.dateop_jour==type && opt.service.toLowerCase()=='wizall'){ nbrebyjourwizallSom += Number(opt.montant); } }); nbrebyjourwizall.push( nbrebyjourwizallSom );
      this.touslescommissions.forEach( opt => { if(opt.dateop_jour==type && opt.service.toLowerCase()=='tigocash'){ nbrebyjourtigocashSom += Number(opt.montant); } }); nbrebyjourtigocash.push( nbrebyjourtigocashSom );
    });
    this.lineChartData = [
      {data: nbrebyjourom, label: 'OM'},
      {data: nbrebyjourtnt, label: 'TNT'},
      {data: nbrebyjourpost, label: 'POSTECASH'},
      {data: nbrebyjourwizall, label: 'WIZALL'},
      {data: nbrebyjourtigocash, label: 'TIGOCASH'},
    ];
    this.loading = false;
  }

  public suivipointsdetail(){
    this.bilantouslescommissions = [
      {service:'tnt', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'postcash', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'wizall', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'orangemoney', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'tigocash', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'Total', cashin:0, cashout:0, commission:0, liste:[]},
    ];

    this.touslescommissions.forEach(type => {
      this.bilantouslescommissions[5].liste.push(type);
      this.bilantouslescommissions[5].commission+=type.commission;

      if(type.service == 'tnt'){
        this.bilantouslescommissions[0].liste.push(type);
        this.bilantouslescommissions[0].cashout+=type.montant;
        this.bilantouslescommissions[0].commission+=type.commission;

        this.bilantouslescommissions[5].cashout+=type.montant;
      }
      if(type.service == 'postcash'){
        if( (type.produit == 'ACHAT DE CODE WOYOFAL'.toLowerCase()) || (type.produit == 'REGLEMENT FACTURE SENELEC'.toLowerCase())){
          this.bilantouslescommissions[1].cashin+=type.montant;

          this.bilantouslescommissions[5].cashin+=type.montant;
        }
        else{
          this.bilantouslescommissions[1].cashout+=type.montant;

          this.bilantouslescommissions[5].cashout+=type.montant;
        }
        this.bilantouslescommissions[1].liste.push(type);
        this.bilantouslescommissions[1].commission+=type.commission;


      }
      if(type.service == 'wizall'){
        this.bilantouslescommissions[2].liste.push(type);
        this.bilantouslescommissions[2].cashout+=type.montant;
        this.bilantouslescommissions[2].commission+=type.commission;

        this.bilantouslescommissions[5].cashout+=type.montant;
      }
      if(type.service == 'tigocash'){
        this.bilantouslescommissions[4].liste.push(type);
        this.bilantouslescommissions[4].cashout+=type.montant;
        this.bilantouslescommissions[4].commission+=type.commission;

        this.bilantouslescommissions[5].cashout+=type.montant;
      }
      if(type.service == 'orangemoney'){
        if(type.produit == 'retrait'){
          this.bilantouslescommissions[3].cashin+=type.montant;

          this.bilantouslescommissions[5].cashin+=type.montant;
        }
        else{
          this.bilantouslescommissions[3].cashout+=type.montant;

          this.bilantouslescommissions[5].cashout+=type.montant;
        }
        this.bilantouslescommissions[3].liste.push(type);
        this.bilantouslescommissions[3].commission+=type.commission;


      }
    });
  }

  @ViewChild('childModalActiviteTrans') public childModalActiviteTrans:ModalDirective;
  public showChildModalActiviteTrans(indice:number):void {
    this.touslescommissionsbyservice = this.bilantouslescommissions[indice].liste;
    this.childModalActiviteTrans.show();
  }
  public hideChildModalActiviteTrans():void {
    this.childModalActiviteTrans.hide();
  }

}
