import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminpdvServiceWeb } from '../../webServiceClients/Adminpdv/adminpdv.service';
import {UtilService} from "../../services/util.service";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-adminpdv-dashboardTest',
  templateUrl: 'adminpdv-dashboardTest.component.html',
  styleUrls: ['adminpdv-dashboardTest.component.css']
})
export class AdminpdvDashboardTestComponent implements OnInit {

  adminpdvDashboardNbreReclVente: any;
  loading = false ;

  constructor(private adminpdvServiceWeb: AdminpdvServiceWeb, private _utilService:UtilService) {

  }

  ngOnInit(): void {
    this.adminpdvServiceWeb.nombredereclamationpdvvente('azrrtt').then(adminpdvServiceWebList => {
      this.adminpdvDashboardNbreReclVente = adminpdvServiceWebList.response ;
    }).then( () => {
      console.log("Here Dashboard Test")
      this.suivionepointIntervalleDashboard();
    });

  }


  /************************************************************************************
   *********************************   PARTIE SUIVI ONE POINT   ****************************
   ***********************************************************************************/

  tocurrency(number){
    return Number(number).toLocaleString();
  }

  public datapointrecup:any;
  public touslesgerants:any[] = [];
  public suivionepointSelectionintervalledateinit:string;
  public suivionepointSelectionintervalledatefinal:string;

  public suivionepointIntervalleDashboard(){
    this.loading = true;
    this._utilService.getOnePointSuivicc({infoinit:'initdashboard', type:'intervalle', infotype:this.suivionepointSelectionintervalledateinit+" "+this.suivionepointSelectionintervalledatefinal})
      .subscribe(
        data => {
          this.id_gerant_selectionne = -1;
          if(data.errorCode){
            this.datapointrecup = data.message;
            this.suivionepointSelectionintervalledateinit = data.dateinitial;
            this.suivionepointSelectionintervalledatefinal = data.datefinale;
            this.touslesgerants = this.datapointrecup.gerants.map(function(type){
              return {
                id_gerant: type.id_gerant,
                nom_gerant: type.nom_gerant,
                telephone: type.telephone,
                last_connection: type.last_connection.date.split('.')[0],
              }
            });
            this.touslescommissions = this.datapointrecup.commissions.map(function(type){
              return {
                id_gerant: type.idUser,
                dateop: type.dateoperation.date.split('.')[0],
                dateop_jour: type.dateoperation.date.split('.')[0].split(' ')[0],
                montant: Number(type.montant),
                commission: Number(type.commissionpdv),
                service: type.nomservice,
                produit: type.libelleoperation,
              }
            });
          }
        },
        error => alert(error),
        () => {
          this.suivionepointSelectionGerant(-1);
          this.loading = false;
        }
      );
  }


  //*********** DETAIL SUIVI ONE POINT *****************
  @ViewChild("baseChart")  chart: BaseChartDirective;
  public suivionepointIntervalle(gerant:any){
    this.touslescommissions = [];
    this.loading = true;
    this._utilService.getOnePointSuivicc({infoinit:'notinitdashboard', type:'intervalle', infotype:this.suivionepointSelectionintervalledateinit+" "+this.suivionepointSelectionintervalledatefinal})
      .subscribe(
        data => {
          this.id_gerant_selectionne = -1;
          if(data.errorCode){
            this.touslescommissions = data.message.map(function(type){
              return {
                id_gerant: type.idUser,
                dateop: type.dateoperation.date.split('.')[0],
                dateop_jour: type.dateoperation.date.split('.')[0].split(' ')[0],
                montant: Number(type.montant),
                commission: Number(type.commissionpdv),
                service: type.nomservice,
                produit: type.libelleoperation,
              }
            });
          }
        },
        error => alert(error),
        () => {
          this.suivionepointSelectionGerant(-1);
          this.loading = false;
        }
      );
  }

  public touslescommissions:any[] = [];
  public touslesjours:any[] = [];
  public touslescommissionsbyGerant:any[] = [];
  public id_gerant_selectionne:number=-1;

  public test(){
    console.log("Hi, je teste");
  }

  public suivionepointSelectionGerant(indice: number){
    this.lineChartData = [];
    this.lineChartLabels = [];
    this.touslesjours = [];

    this.id_gerant_selectionne = indice;
    if(this.id_gerant_selectionne==-1){ this.touslescommissionsbyGerant = this.touslescommissions;  }
    else {  this.touslescommissionsbyGerant = this.touslescommissions.filter( opt => opt.id_gerant==this.id_gerant_selectionne); }

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
    tabjours.forEach(type => {
      let nbrebyjouromSom:number = 0;
      let nbrebyjourtntSom:number = 0;
      let nbrebyjourpostSom:number = 0;
      let nbrebyjourwizallSom:number = 0;

      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='orangemoney'){ nbrebyjouromSom += Number(opt.montant); } }); nbrebyjourom.push( nbrebyjouromSom );
      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='TNT'){ nbrebyjourtntSom += Number(opt.montant); } }); nbrebyjourtnt.push( nbrebyjourtntSom );
      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='POSTCASH'){ nbrebyjourpostSom += Number(opt.montant); } }); nbrebyjourpost.push( nbrebyjourpostSom );
      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='WIZALL'){ nbrebyjourwizallSom += Number(opt.montant); } }); nbrebyjourwizall.push( nbrebyjourwizallSom );
    });

    this.lineChartData = [
      {data: nbrebyjourom, label: 'OM'},
      {data: nbrebyjourtnt, label: 'TNT'},
      {data: nbrebyjourpost, label: 'POSTECASH'},
      {data: nbrebyjourwizall, label: 'WIZALL'},
    ];
  }

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = { responsive: true };
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = true;


}
