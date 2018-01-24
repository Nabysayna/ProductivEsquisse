import { Component, OnInit, OnDestroy ,ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { ModalDirective } from 'ng2-bootstrap/modal';

import { AdminpdvServiceWeb } from '../../webServiceClients/Adminpdv/adminpdv.service';
import {UtilService} from "../../services/util.service";
import {CrmDoorServiceWeb} from "../../webServiceClients/CrmDoor/crmdoor.service";
import {stringify} from "querystring";
import {BaseChartDirective} from "ng2-charts";



@Component({
  selector: 'app-adminpdv-monitoring',
  templateUrl: './adminpdv-monitoring.component.html',
  styleUrls: ['./adminpdv-monitoring.component.css']
})
export class AdminpdvMonitoringComponent implements OnInit {
  selectdemanretrait=false;
  loading = false ;
  public monitoringAdminpdvDeposit: any;
  public montantdeposit:number;
  public montantdepotdirect:number;
  agentcc:any;
  montant:number;
  ibanExcessif = false ;
  listedeposit:any[] = [];
  public listedepositsvalide:any[] = [];
  public listedepositsencours:any[] = [];
  viewonedetaildeposit:any;
  killsetinterval:any;

  dataImpression:any;

  @ViewChild('depotdirectModal') public depotdirectModal:ModalDirective;
  @ViewChild('depositeModal') public depositeModal:ModalDirective;
  @ViewChild('dechargeModal') public dechargeModal:ModalDirective;
  @ViewChild('apercudechargeModal') public apercudechargeModal:ModalDirective;
  @ViewChild('apercuPhotoComModal') public apercuPhotoComModal:ModalDirective;
  @ViewChild('voirplusdedemandeModal') public voirplusdedemandeModal:ModalDirective;

  constructor(private route:ActivatedRoute, private router: Router, private adminpdvServiceWeb: AdminpdvServiceWeb, private _crmdoorServiceWeb: CrmDoorServiceWeb, private _utilService:UtilService) { }

  ngOnInit() {
    console.log('monitoring deposit');
    this.adminpdvServiceWeb.bilandeposit('azrrtt').then(adminpdvServiceWebList => {
      this.monitoringAdminpdvDeposit = adminpdvServiceWebList.response;
      this.getEtatDepot();
    }).then( () => {
      this.getAlldepotsSup();
    });
    this.killsetinterval = setInterval(() => {
      this.getEtatDepot();

      this.adminpdvServiceWeb.bilandeposit('azrrtt').then(adminpdvServiceWebList => {
        this.monitoringAdminpdvDeposit = adminpdvServiceWebList.response;
      });

      console.log('step');
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.killsetinterval);
  }

  validerdmde(){
      this.selectdemanretrait = false;
      if (this.monitoringAdminpdvDeposit.etatdeposit < this.montant){
        this.ibanExcessif = true ;
        return 1 ;
      }

      this.loading = true ;
      this.adminpdvServiceWeb.demandeRetrait(this.montant.toString()).then(adminpdvserviceList => {
        this.loading = false ;
        this.montant = undefined ;
      });

    }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }

  clickeddemanderetrait(){
      this.selectdemanretrait = true;
    }

  public getEtatDepot(){
      this._crmdoorServiceWeb.getEtatDemandeDepot('infosup').then(adminpdvServiceWebList => {
        if(adminpdvServiceWebList.errorCode==0){
          let newdepot = false;
          this.listedeposit = adminpdvServiceWebList.response.map(function (opt) {
            if ( (newdepot==false && opt.etatdemande==0) || (newdepot==false && opt.etatdemande==1) ){
              newdepot = true;
            }
            console.log('-------------test--------------');
            return {
              datedemande: opt.datedemande.date.split('.')[0],
              montantdemande: opt.montantdemande,
              accepteur: opt.accepteur,
              representantbbs: (opt.accepteur=='attente' || opt.etatdemande==0)?'attente':JSON.parse(opt.accepteur).prenom+" "+JSON.parse(opt.accepteur).nom,
              etatdemande: opt.etatdemande,
              statusetatdemande: opt.etatdemande==0?'En cours de traitement':opt.etatdemande==1?'En cours de validation':opt.etatdemande==2?'chargement deposit':'Validé',
            }
          });
          this.listedepositsencours = this.listedeposit.filter(opt => opt.etatdemande!=3);
          this.listedepositsvalide = this.listedeposit.filter(opt => opt.etatdemande==3);
          if (!newdepot){
            clearInterval(this.killsetinterval);
          }

        }
      });
    }

  public getInitDeposit(){
    this._utilService.recupererInfosCC()
      .subscribe(
        data => {
          this.agentcc = data.response;
        },
        error => alert(error),
        () => {
          console.log('est')
        }
      );
  }
  public demndedeposit(data){
    this._utilService.demandedeposit(data)
      .subscribe(
        data => {
          console.log('--');
        },
        error => alert(error),
        () => {
          console.log('est')
        }
      );
  }

  showdepotdirectModal():void {
    this.montantdepotdirect=undefined;
    //this.getInitDeposit();
    this.depotdirectModal.show();
    console.log('showdepotdirectModal')
  }
  public showdepositeModal():void {
    this.montantdeposit=undefined;
    this.getInitDeposit();
    this.depositeModal.show();
    console.log('showdepositeModal')
  }
  public hidedepositeModal():void {
    this.depositeModal.hide();
    console.log('hidedepositeModal')
  }
  public validerdeposite(){
    this._crmdoorServiceWeb.validerDemandeDepot(this.montantdeposit, JSON.stringify(this.agentcc), 'attente').then(adminpdvServiceWebList => {
      console.log('---------');
      if(adminpdvServiceWebList.errorCode == 0){
        this.demndedeposit({infocc:this.agentcc, infocom:'attente', date:adminpdvServiceWebList.result});
      }
    });
    this.hidedepositeModal();
    console.log('validerdeposite')
  }

  public showdechargeModal():void {
    this.dechargeModal.show();
    console.log('showdechargeModal')
  }
  public hidedechargeModal():void {
    this.dechargeModal.hide();
    console.log('hidedechargeModal')
  }

  public showapercudechargeModal(detail:any):void {
    this.viewonedetaildeposit = detail;
    console.log('------------');
    this.apercudechargeModal.show();
    console.log('showapercudechargeModal')
  }
  public hideapercudechargeModal():void {
    this.viewonedetaildeposit = undefined;
    this.apercudechargeModal.hide();
    console.log('hideapercudechargeModal')
  }

  imprimerdecharge(decharge:any){
    console.log('-----------');
    this.dataImpression = {
      apiservice:'adminpdv',
      service:'faireundepot',
      infotransaction:{
        client:decharge,
      },
    };
    console.log('--------');
    sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
    this.router.navigate(['accueiladmpdv/impressionadminpdv']);
  }

  public showapercuPhotoComModal():void {
    this.apercuPhotoComModal.show();
  }
  public hideapercuPhotoComModal():void {
    this.apercuPhotoComModal.hide();
    console.log('hideapercuPhotoComModal')
  }

  public showvoirplusdedemandeModal():void {
    this.voirplusdedemandeModal.show();
  }
  public hidevoirplusdedemandeModal():void {
    this.voirplusdedemandeModal.hide();
    console.log('hidevoirplusdedemandeModal')
  }

///////////////////////// LIST DEPOTS //////////////////////////////////////
  public touslesdepots:any[] = [];
  public affichelesdepots:any = {jours:[], montant:[]};

  @ViewChild("baseChart3")  chart3: BaseChartDirective;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [];

  public suiviDepots(depots){
    this.touslesdepots = depots.map(function(type){
      return {
        date_depot: type.daterenflu.date.split('.')[0],
        date_depot_jour: type.daterenflu.date.split('.')[0].split(' ')[0],
        montant_depot: JSON.parse(type.infosup).montant,
      }
    });
    let depotjours = this.touslesdepots.map(type => type.date_depot_jour);
    depotjours.sort();

    let tabjours:string[] = [];
    let jour:string = depotjours[0];
    tabjours.push(jour);
    depotjours.forEach(type => { if(type!=jour){
      tabjours.push(type);
      jour = type;
    }});

    let tabjoursmontant:number[] = [];
    tabjours.forEach(date => {
      let montant:number = 0
      this.touslesdepots.forEach( type=> { if(type.date_depot_jour==date){ montant  += Number(type.montant_depot); } });
      tabjoursmontant.push(montant);
    });

    this.affichelesdepots.jours = tabjours;
    this.affichelesdepots.montant = tabjoursmontant;

    this.barChartLabels = tabjours;
    this. barChartData = [{data: tabjoursmontant, label: 'Dépots'}];
  }

  getAlldepotsSup(){
    this._utilService.getOnePointSuivicc({infoinit:'initmonitoringsup', type:'depots'})
      .subscribe(
        data => {
          if(data.errorCode){
            console.log('--------')
            this.suiviDepots(data.message);
          }
        },
        error => alert(error),
        () => {
          if(this.chart3 !== undefined){
            this.chart3.chart.config.data.labels = this.barChartLabels;
          }
          this.loading = false;
        }
      );

  }

}
