import { Component, OnInit, OnDestroy ,ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { ModalDirective } from 'ng2-bootstrap/modal';

import { AdminpdvServiceWeb } from '../../webServiceClients/Adminpdv/adminpdv.service';
import {UtilService} from "../../services/util.service";
import {CrmDoorServiceWeb} from "../../webServiceClients/CrmDoor/crmdoor.service";
import {stringify} from "querystring";



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
  agentcc:any;
  montant:number;
  ibanExcessif = false ;
  listedeposit:any[] = [];
  viewonedetaildeposit:any;
  killsetinterval:any;

  dataImpression:any;

  @ViewChild('depositeModal') public depositeModal:ModalDirective;
  @ViewChild('dechargeModal') public dechargeModal:ModalDirective;
  @ViewChild('apercudechargeModal') public apercudechargeModal:ModalDirective;

  constructor(private route:ActivatedRoute, private router: Router, private adminpdvServiceWeb: AdminpdvServiceWeb, private _crmdoorServiceWeb: CrmDoorServiceWeb, private _utilService:UtilService) { }

  ngOnInit() {
    console.log('monitoring deposit');
    this.adminpdvServiceWeb.bilandeposit('azrrtt').then(adminpdvServiceWebList => {
      this.monitoringAdminpdvDeposit = adminpdvServiceWebList.response;
      this.getEtatDepot();
    });
    this.killsetinterval = setInterval(() => {
      this.getEtatDepot();
      console.log('step');
    }, 10000);
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
          console.log(data);
          console.log('-------');
          this.agentcc = data.response;
        },
        error => alert(error),
        () => {
          console.log('est testé init getInitDeposit')
        }
      );
  }
  public demndedeposit(data){
    this._utilService.demandedeposit(data)
      .subscribe(
        data => {
          console.log(data);
        },
        error => alert(error),
        () => {
          console.log('est testé init demandedeposit')
        }
      );
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
      console.log(adminpdvServiceWebList);
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
    console.log(this.viewonedetaildeposit);
    this.apercudechargeModal.show();
    console.log('showapercudechargeModal')
  }
  public hideapercudechargeModal():void {
    this.viewonedetaildeposit = undefined;
    this.apercudechargeModal.hide();
    console.log('hideapercudechargeModal')
  }

  imprimerdecharge(decharge:any){
    this.dataImpression = {
      apiservice:'adminpdv',
      service:'faireundepot',
      infotransaction:{
        client:{
          transactionBBS: 'Id BBS',
          montant:decharge.montantdemande,
        },
      },
    };
    console.log(this.dataImpression);
    sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
    this.router.navigate(['accueiladmpdv/impressionadminpdv']);
  }


}
