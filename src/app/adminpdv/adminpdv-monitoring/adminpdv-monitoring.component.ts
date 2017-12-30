import { Component, OnInit ,ViewChild } from '@angular/core';
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
  public agentcommercial:any;
  public id_agentcommercial:number;
  public montantdeposit:number;
  mesagentcommerciaux:any;
  agentcc:any;
  montant:number;
  ibanExcessif = false ;
  listedeposit:any[] = [];
  viewonedetaildeposit:any;

  dataImpression:any;

  constructor(private route:ActivatedRoute, private router: Router, private adminpdvServiceWeb: AdminpdvServiceWeb, private _crmdoorServiceWeb: CrmDoorServiceWeb, private _utilService:UtilService) { }

  ngOnInit() {
    console.log('monitoring deposit');
    this.adminpdvServiceWeb.bilandeposit('azrrtt').then(adminpdvServiceWebList => {
      this.monitoringAdminpdvDeposit = adminpdvServiceWebList.response;

      this.getEtatDepot();
    });
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

    @ViewChild('depositeModal') public depositeModal:ModalDirective;
  @ViewChild('dechargeModal') public dechargeModal:ModalDirective;
  @ViewChild('apercudechargeModal') public apercudechargeModal:ModalDirective;

    public getEtatDepot(){
      this._crmdoorServiceWeb.getEtatDemandeDepot('infosup').then(adminpdvServiceWebList => {
        if(adminpdvServiceWebList.errorCode==0){
          this.listedeposit = adminpdvServiceWebList.response.map(function (opt) {
            return {
              datedemande: opt.datedemande.date.split('.')[0],
              montantdemande: opt.montantdemande,
              representantbbs: JSON.parse(opt.accepteur).prenom+" "+JSON.parse(opt.accepteur).nom,
              etatdemande: opt.etatdemande
            }
          });
        }
      });
    }

    public getInitDeposit(){
    this._utilService.recupererInfosCC()
      .subscribe(
        data => {
          this.mesagentcommerciaux = data.response.infocommerciaux;
          this.agentcc = data.response.infocc;
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
    this.agentcommercial=undefined;
    this.id_agentcommercial=undefined;
    this.getInitDeposit();
    this.depositeModal.show();
    console.log('showdepositeModal')
  }
  public hidedepositeModal():void {
    this.depositeModal.hide();
    console.log('hidedepositeModal')
  }
  public validerdeposite(){
    this._crmdoorServiceWeb.validerDemandeDepot(this.montantdeposit, JSON.stringify(this.agentcc), JSON.stringify(this.agentcommercial)).then(adminpdvServiceWebList => {
      console.log(adminpdvServiceWebList);
      if(adminpdvServiceWebList.errorCode == 0){
        this.demndedeposit({infocc:this.agentcc, infocom:this.agentcommercial, date:adminpdvServiceWebList.result});
      }
    });
    this.hidedepositeModal();
    console.log('validerdeposite')
  }
  public chargercommercial(){
    this.agentcommercial = this.mesagentcommerciaux.filter(opt  =>  opt.id==this.id_agentcommercial)[0];
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
  /*
  public showdechargeModal():void {
    console.log(this.agentcommercial);
    console.log(this.montantdeposit);
    this.dechargeModal.show();
    console.log('showdechargeModal')
  }
  public hidedechargeModal():void {
    this.dechargeModal.hide();
    this.montantdeposit=undefined;
    this.agentcommercial=undefined;
    console.log('hidedechargeModal')
  }
*/

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
