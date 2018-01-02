import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }  from '@angular/common';

import * as sha1 from 'js-sha1';
import * as _ from "lodash";

import { ComptabiliteServiceWeb } from '../webServiceClients/Comptabilite/comptabilite.service';


class UserExploitation{
  nom : string;
  prenom : number;
  idpdv:number;
}

class PdvCaisse{
  nom : string ;
  caisse : number ;
  prenom : number ;
  id : number ;
  idpdv:number;
}

class Charges{
  dateajout:string;
  libelle:string;
  montant:number;
  service:string;

}

class Revenus{
  date:string;
  libelle:string;
  montant:number;
  service:string;

}
class Revenustransfert{
  date:string;
  libelle:string;
  montant:number;
  frais:number;
  commission:number;
  service:string;

}

class Exploitation{
  dateajout:string;
  designation:string;
  stocki:number;
  vente:number;
  stockf:number;
  mnt:number;
}

class Exploitationaveccommission{
  dateajout:string;
  designation:string;
  vente:number;
  mnt:number;
  frais:number;
  commission:number;
}

class Supservice{
  idservice:number;
  services:string;
  design:string;
}

class Designation{
  name:string;
  stock:number;
  prixAchat:number;
  prixunitaire:number;
}



@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {

  pdvCaisses : PdvCaisse[] ;
  libelleCharge : string ;
  montantCharge : number ;
  loading = false ;

  service : string ;
  designationsService: Designation[] = [];
  nbreDesignation:number = 0;

  approvisionnement = "" ;
  estselectionne:number = -1;
  estselectionr:number;
  estselectionf:number;
  estselectionouvert:number;
  estselectionfff:number;
  estselectionas:number;
  estselectionms:number;
  estselectionss:number;
  montreautredesignation:number;
  estselectionmods:number = -1;

  onPostUpdate = false ;

  estclickeJour = true;
  estclickeAnnee = false;
  estclickeIntervalle = false;

  charges:Charges[];
  revenus:Revenus[];
  revenustransfert:Revenustransfert[];
  supservice:Supservice[];

  usersExploitation:UserExploitation[];

  montantajoutecaisse:number;

  public checkModel:any = {jour: true, annee: false, intervalle: false};
  selectionannee:string;
  selectionjour:string;
  selectionintervalledateinit:string;
  selectionintervalleddatefinal:string;
  selectionintervalle:string;

  filtre:any;
  filtreaveccommission:any;
  nom="nom";
  asc="asc";

  isselectlisterrevenuautre:boolean = true;

  constructor(
         private location: Location,
         private route:ActivatedRoute,
         private router: Router,
         private comptabiliteServiceWeb: ComptabiliteServiceWeb,

  ) { }


  ngOnInit() {
  this.loading = true ;
    this.comptabiliteServiceWeb.listecaisse().then(adminmultipdvServiceWeb => {
      this.pdvCaisses = adminmultipdvServiceWeb.response;
      this.loading = false ;
    });
  }

  estcheckModel(type: string){
    if(type == 'jour'){
      this.checkModel.jour = true;
      this.checkModel.annee = false;
      this.checkModel.intervalle = false;

      this.selectionannee = "";
      this.selectionintervalledateinit = "";
      this.selectionintervalleddatefinal = "";
    }
    else if(type == 'annee'){
      this.checkModel.jour = false;
      this.checkModel.annee = true;
      this.checkModel.intervalle = false;

      this.selectionjour = "";
      this.selectionannee = "2017";
      this.selectionintervalledateinit = "";
      this.selectionintervalleddatefinal = "";
    }
    else if(type == 'intervalle'){
      this.checkModel.jour = false;
      this.checkModel.annee = false;
      this.checkModel.intervalle = true;

      this.selectionjour = "";
      this.selectionannee = "";
    }
    else{
      this.checkModel.jour = true;
      this.checkModel.annee = false;
      this.checkModel.intervalle = false;

      this.selectionjour = "";
      this.selectionannee = "";
      this.selectionintervalledateinit = "";
      this.selectionintervalleddatefinal = "";
    }
    this.selectionintervalle="";
  }

  goBack() {
    this.location.back();
  }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }




  /************************************************************************************
   *********************************   PARTIE CAISSE   ****************************
   ***********************************************************************************/

  isActif(nomPdv : string) : boolean{
    return (this.approvisionnement.indexOf("-"+nomPdv+"-")>-1) ;
  }

  approvisionnercaisse(idpdv: number, i:number){
    this.approvisionnement="" ;
    this.loading = true ;
    this.comptabiliteServiceWeb.approvisionner(idpdv, this.montantajoutecaisse).then(adminmultipdvServiceWeb => {
      // console.log(adminmultipdvServiceWeb);
      this.pdvCaisses[i].caisse = Number(this.pdvCaisses[i].caisse) + Number(this.montantajoutecaisse);
      this.loading = false ;
    });
  }



  /************************************************************************************
   *********************************   PARTIE JOURNAL   ****************************
   ***********************************************************************************/

  listercharges(i){
    this.estselectionne = i ;
    this.loading = true ;
    this.comptabiliteServiceWeb.listecharge(this.pdvCaisses[i].idpdv).then(adminmultipdvServiceWeb => {
      console.log("Charges "+this.charges) ;
      this.charges = adminmultipdvServiceWeb.response;
      this.loading = false ;
    });
  }

  listerrevenus(i){
    this.estselectionr = i;
    this.estselectionne = i ;
    this.loading = true ;
    this.comptabiliteServiceWeb.listerevenu(this.pdvCaisses[i].idpdv).then(adminmultipdvServiceWeb => {
      console.log(adminmultipdvServiceWeb);
      this.revenus = adminmultipdvServiceWeb.response;
      this.loading = false ;
    });
  }

  listerrevenustransfert(i){
    this.estselectionr = i;
    this.estselectionne = i ;
    this.loading = true ;
    this.comptabiliteServiceWeb.listerevenutransfert(this.pdvCaisses[i].idpdv).then(adminmultipdvServiceWeb => {
      this.revenustransfert = adminmultipdvServiceWeb.response;
      this.loading = false ;
    });
  }

  ajoutercharges(i){
    this.estselectionf = i;
    this.estselectionne = i ;
  }

  validerajoutercharges(pdv){
    this.loading = true ;
    this.comptabiliteServiceWeb.ajoutcharge(this.libelleCharge, pdv.idpdv, this.service, this.montantCharge).then(adminmultipdvServiceWeb => {
      this.loading = false ;
    });
  }




  /************************************************************************************
   *********************************   PARTIE EXPLOITATION   ****************************
   ***********************************************************************************/

  exploitation:Exploitation[];
  exploitationaveccommission:Exploitationaveccommission[];
  exploitationbilan:any[]=[];
  bilanexploitationaveccommission = [{service:'tnt', cashin:0, cashout:0, commission:0},{service:'postcash', cashin:0, cashout:0, commission:0},{service:'wizall', cashin:0, cashout:0, commission:0},{service:'orangemoney', cashin:0, cashout:0, commission:0},]

  listeruserexploitation(){
    this.loading = true ;
    this.comptabiliteServiceWeb.userexploitation().then(adminmultipdvServiceWeb => {
      console.log(adminmultipdvServiceWeb.response);
      this.usersExploitation = adminmultipdvServiceWeb.response;
      this.loading = false ;
    });
  }

  listerexploitation(i:number, isouvesrt:number, isferme:number ){
    this.estcheckModel("");
    this.estselectionne = i ;
    this.estselectionouvert = isouvesrt;
    this.estselectionfff = isferme;
    console.log(this.estselectionne +" "+ this.estselectionouvert +" "+ this.estselectionfff);
    let datenow = ((new Date()).toJSON()).split("T",2)[0];

    this.loading = true ;
    this.comptabiliteServiceWeb.exploitation(this.usersExploitation[i].idpdv, "jour", datenow).then(adminmultipdvServiceWeb => {
      console.log("-----2---------");
      console.log(adminmultipdvServiceWeb.response);
      this.exploitation = adminmultipdvServiceWeb.response.map(function (type) {
        return {
          dateajout: type.dateajout.date.split(".")[0],
          designation: type.designation,
          stocki: type.stocki,
          vente: type.vente,
          stockf: type.stockf,
          mnt: type.mnt,
        }
      });
      this.loading = false ;
    });
  }

  listerexploitationaveccommission(i:number, isouvesrt:number, isferme:number ){
    this.estcheckModel("");
    this.estselectionne = i ;
    this.estselectionouvert = isouvesrt;
    this.estselectionfff = isferme;
    console.log(this.estselectionne +" "+ this.estselectionouvert +" "+ this.estselectionfff);
    let datenow = ((new Date()).toJSON()).split("T",2)[0];

    this.loading = true ;
    this.comptabiliteServiceWeb.exploitationaveccommission(this.usersExploitation[i].idpdv, "jour", datenow).then(adminmultipdvServiceWeb => {
      console.log(adminmultipdvServiceWeb.response);
      this.exploitationaveccommission = adminmultipdvServiceWeb.response.map(function (type) {
        return {
          dateajout: type.dateajout.date.split(".")[0],
          designation: type.designation,
          mnt: type.mnt,
          frais: type.frais,
          commission: type.commission,
          service: type.service,
        }
      });
      this.loading = false ;
    }).then( type => {
      this.bilanexploitationaveccommission = [
        {service:'tnt', cashin:0, cashout:0, commission:0},
        {service:'postcash', cashin:0, cashout:0, commission:0},
        {service:'wizall', cashin:0, cashout:0, commission:0},
        {service:'orngemoney', cashin:0, cashout:0, commission:0},
        {service:'Total', cashin:0, cashout:0, commission:0},
      ];
      this.exploitationbilan = this.exploitationaveccommission;
      this.exploitationbilan.forEach(type => {
        this.bilanexploitationaveccommission[4].cashin+=type.mnt;
        this.bilanexploitationaveccommission[4].commission+=type.commission;
        if(type.service == 'TNT'){
          this.bilanexploitationaveccommission[0].cashin+=type.mnt;
          this.bilanexploitationaveccommission[0].commission+=type.commission;
        }
        if(type.service == 'POSTCASH'){
          this.bilanexploitationaveccommission[1].cashin+=type.mnt;
          this.bilanexploitationaveccommission[1].commission+=type.commission;
        }
        if(type.service == 'wizall'){
          this.bilanexploitationaveccommission[2].cashin+=type.mnt;
          this.bilanexploitationaveccommission[2].commission+=type.commission;
        }
        if(type.service == 'orangemoney'){
          if(type.designation == 'depot'){
            this.bilanexploitationaveccommission[3].cashin+=type.mnt;
          }
          else{
            this.bilanexploitationaveccommission[3].cashout+=type.mnt;
            this.bilanexploitationaveccommission[4].cashout+=type.mnt;
            this.bilanexploitationaveccommission[4].cashin-=type.mnt;
          }
          this.bilanexploitationaveccommission[3].commission+=type.commission;
        }
      });
    });
  }

  listerexploitationrecherche(idpdv, iscommission){
    console.log(iscommission);
    let datenow = ((new Date()).toJSON()).split("T",2)[0];
    this.loading = true ;
    if(iscommission == 0){
      this.comptabiliteServiceWeb.exploitationaveccommission(idpdv, "jour", datenow).then(adminmultipdvServiceWeb => {
        console.log("-----4---------");
        console.log(adminmultipdvServiceWeb.response);
        this.exploitationaveccommission = adminmultipdvServiceWeb.response.map(function (type) {
          return {
            dateajout: type.dateajout.date.split(".")[0],
            designation: type.designation,
            mnt: type.mnt,
            frais: type.frais,
            commission: type.commission,
            service: type.service,
          }
        });
        this.loading = false ;
      }).then( type => {
        this.bilanexploitationaveccommission = [
          {service:'tnt', cashin:0, cashout:0, commission:0},
          {service:'postcash', cashin:0, cashout:0, commission:0},
          {service:'wizall', cashin:0, cashout:0, commission:0},
          {service:'orngemoney', cashin:0, cashout:0, commission:0},
          {service:'Total', cashin:0, cashout:0, commission:0},
        ];
        this.exploitationbilan = this.exploitationaveccommission;
        this.exploitationbilan.forEach(type => {
          this.bilanexploitationaveccommission[4].cashin+=type.mnt;
          this.bilanexploitationaveccommission[4].commission+=type.commission;
          if(type.service == 'TNT'){
            this.bilanexploitationaveccommission[0].cashin+=type.mnt;
            this.bilanexploitationaveccommission[0].commission+=type.commission;
          }
          if(type.service == 'POSTCASH'){
            this.bilanexploitationaveccommission[1].cashin+=type.mnt;
            this.bilanexploitationaveccommission[1].commission+=type.commission;
          }
          if(type.service == 'wizall'){
            this.bilanexploitationaveccommission[2].cashin+=type.mnt;
            this.bilanexploitationaveccommission[2].commission+=type.commission;
          }
          if(type.service == 'orangemoney'){
            if(type.designation == 'depot'){
              this.bilanexploitationaveccommission[3].cashin+=type.mnt;
            }
            else{
              this.bilanexploitationaveccommission[3].cashout+=type.mnt;
              this.bilanexploitationaveccommission[4].cashout+=type.mnt;
              this.bilanexploitationaveccommission[4].cashin-=type.mnt;
            }
            this.bilanexploitationaveccommission[3].commission+=type.commission;
          }
        });
      });
    }
    else {
      this.comptabiliteServiceWeb.exploitation(idpdv, "jour", datenow).then(adminmultipdvServiceWeb => {
        console.log("-----5---------");
        console.log(adminmultipdvServiceWeb.response);
        this.exploitation = adminmultipdvServiceWeb.response.map(function (type) {
          return {
            dateajout: type.dateajout.date.split(".")[0],
            designation: type.designation,
            stocki: type.stocki,
            vente: type.vente,
            stockf: type.stockf,
            mnt: type.mnt,
          }
        });
        this.loading = false ;
      });
    }

  }

  listerexploitationrechercheannee(idpdv, iscommission){
    console.log(iscommission);
    this.loading = true ;
    if(iscommission == 0){
      this.comptabiliteServiceWeb.exploitationaveccommission(idpdv, "annee", this.selectionannee).then(adminmultipdvServiceWeb => {
        console.log("-----6---------");
        console.log(adminmultipdvServiceWeb.response);
        this.exploitationaveccommission = adminmultipdvServiceWeb.response.map(function (type) {
          return {
            dateajout: type.dateajout.date.split(".")[0],
            designation: type.designation,
            mnt: type.mnt,
            frais: type.frais,
            commission: type.commission,
            service: type.service,
          }
        });
        this.loading = false ;
      }).then( type => {
        this.bilanexploitationaveccommission = [
          {service:'tnt', cashin:0, cashout:0, commission:0},
          {service:'postcash', cashin:0, cashout:0, commission:0},
          {service:'wizall', cashin:0, cashout:0, commission:0},
          {service:'orngemoney', cashin:0, cashout:0, commission:0},
          {service:'Total', cashin:0, cashout:0, commission:0},
        ];
        this.exploitationbilan = this.exploitationaveccommission;
        this.exploitationbilan.forEach(type => {
          this.bilanexploitationaveccommission[4].cashin+=type.mnt;
          this.bilanexploitationaveccommission[4].commission+=type.commission;
          if(type.service == 'TNT'){
            this.bilanexploitationaveccommission[0].cashin+=type.mnt;
            this.bilanexploitationaveccommission[0].commission+=type.commission;
          }
          if(type.service == 'POSTCASH'){
            this.bilanexploitationaveccommission[1].cashin+=type.mnt;
            this.bilanexploitationaveccommission[1].commission+=type.commission;
          }
          if(type.service == 'wizall'){
            this.bilanexploitationaveccommission[2].cashin+=type.mnt;
            this.bilanexploitationaveccommission[2].commission+=type.commission;
          }
          if(type.service == 'orangemoney'){
            if(type.designation == 'depot'){
              this.bilanexploitationaveccommission[3].cashin+=type.mnt;
            }
            else{
              this.bilanexploitationaveccommission[3].cashout+=type.mnt;
              this.bilanexploitationaveccommission[4].cashout+=type.mnt;
              this.bilanexploitationaveccommission[4].cashin-=type.mnt;
            }
            this.bilanexploitationaveccommission[3].commission+=type.commission;
          }
        });
      });
    }
    else {
      this.comptabiliteServiceWeb.exploitation(idpdv, "annee", this.selectionannee).then(adminmultipdvServiceWeb => {
        console.log("-----7---------");
        console.log(adminmultipdvServiceWeb.response);
        this.exploitation = adminmultipdvServiceWeb.response.map(function (type) {
          return {
            dateajout: type.dateajout.date.split(".")[0],
            designation: type.designation,
            stocki: type.stocki,
            vente: type.vente,
            stockf: type.stockf,
            mnt: type.mnt,
          }
        });
        this.loading = false ;
      });
    }

  }

  listerexploitationparjour(idpdv, iscommission){
    console.log(iscommission);
    if(this.selectionjour != ""){
      this.loading = true ;
      if(iscommission == 0){
        this.comptabiliteServiceWeb.exploitationaveccommission(idpdv, "jour", this.selectionjour).then(adminmultipdvServiceWeb => {
          console.log("-----8---------");
          console.log(adminmultipdvServiceWeb.response);
          this.exploitationaveccommission = adminmultipdvServiceWeb.response.map(function (type) {
            return {
              dateajout: type.dateajout.date.split(".")[0],
              designation: type.designation,
              mnt: type.mnt,
              frais: type.frais,
              commission: type.commission,
              service: type.service,
            }
          });
          this.loading = false ;
        }).then( type => {
          this.bilanexploitationaveccommission = [
            {service:'tnt', cashin:0, cashout:0, commission:0},
            {service:'postcash', cashin:0, cashout:0, commission:0},
            {service:'wizall', cashin:0, cashout:0, commission:0},
            {service:'orngemoney', cashin:0, cashout:0, commission:0},
            {service:'Total', cashin:0, cashout:0, commission:0},
          ];
          this.exploitationbilan = this.exploitationaveccommission;
          this.exploitationbilan.forEach(type => {
            this.bilanexploitationaveccommission[4].cashin+=type.mnt;
            this.bilanexploitationaveccommission[4].commission+=type.commission;
            if(type.service == 'TNT'){
              this.bilanexploitationaveccommission[0].cashin+=type.mnt;
              this.bilanexploitationaveccommission[0].commission+=type.commission;
            }
            if(type.service == 'POSTCASH'){
              this.bilanexploitationaveccommission[1].cashin+=type.mnt;
              this.bilanexploitationaveccommission[1].commission+=type.commission;
            }
            if(type.service == 'wizall'){
              this.bilanexploitationaveccommission[2].cashin+=type.mnt;
              this.bilanexploitationaveccommission[2].commission+=type.commission;
            }
            if(type.service == 'orangemoney'){
              if(type.designation == 'depot'){
                this.bilanexploitationaveccommission[3].cashin+=type.mnt;
              }
              else{
                this.bilanexploitationaveccommission[3].cashout+=type.mnt;
                this.bilanexploitationaveccommission[4].cashout+=type.mnt;
                this.bilanexploitationaveccommission[4].cashin-=type.mnt;
              }
              this.bilanexploitationaveccommission[3].commission+=type.commission;
            }
          });
        });
      }
      else {
        this.comptabiliteServiceWeb.exploitation(idpdv, "jour", this.selectionjour).then(adminmultipdvServiceWeb => {
          console.log("-----9---------");
          console.log(adminmultipdvServiceWeb.response);
          this.exploitation = adminmultipdvServiceWeb.response.map(function (type) {
            return {
              dateajout: type.dateajout.date.split(".")[0],
              designation: type.designation,
              stocki: type.stocki,
              vente: type.vente,
              stockf: type.stockf,
              mnt: type.mnt,
            }
          });
          this.loading = false ;
        });
      }
    }
  }

  listerexploitationparannee(idpdv, iscommission){
    console.log(iscommission);
    this.loading = true ;
    if(iscommission == 0){
      this.comptabiliteServiceWeb.exploitationaveccommission(idpdv, "annee", this.selectionannee).then(adminmultipdvServiceWeb => {
        console.log("-----10---------");
        console.log(adminmultipdvServiceWeb.response);
        this.exploitationaveccommission = adminmultipdvServiceWeb.response.map(function (type) {
          return {
            dateajout: type.dateajout.date.split(".")[0],
            designation: type.designation,
            mnt: type.mnt,
            frais: type.frais,
            commission: type.commission,
            service: type.service,
          }
        });
        this.loading = false ;
      }).then( type => {
        this.bilanexploitationaveccommission = [
          {service:'tnt', cashin:0, cashout:0, commission:0},
          {service:'postcash', cashin:0, cashout:0, commission:0},
          {service:'wizall', cashin:0, cashout:0, commission:0},
          {service:'orngemoney', cashin:0, cashout:0, commission:0},
          {service:'Total', cashin:0, cashout:0, commission:0},
        ];
        this.exploitationbilan = this.exploitationaveccommission;
        this.exploitationbilan.forEach(type => {
          this.bilanexploitationaveccommission[4].cashin+=type.mnt;
          this.bilanexploitationaveccommission[4].commission+=type.commission;
          if(type.service == 'TNT'){
            this.bilanexploitationaveccommission[0].cashin+=type.mnt;
            this.bilanexploitationaveccommission[0].commission+=type.commission;
          }
          if(type.service == 'POSTCASH'){
            this.bilanexploitationaveccommission[1].cashin+=type.mnt;
            this.bilanexploitationaveccommission[1].commission+=type.commission;
          }
          if(type.service == 'wizall'){
            this.bilanexploitationaveccommission[2].cashin+=type.mnt;
            this.bilanexploitationaveccommission[2].commission+=type.commission;
          }
          if(type.service == 'orangemoney'){
            if(type.designation == 'depot'){
              this.bilanexploitationaveccommission[3].cashin+=type.mnt;
            }
            else{
              this.bilanexploitationaveccommission[3].cashout+=type.mnt;
              this.bilanexploitationaveccommission[4].cashout+=type.mnt;
              this.bilanexploitationaveccommission[4].cashin-=type.mnt;
            }
            this.bilanexploitationaveccommission[3].commission+=type.commission;
          }
        });
      });
    }
    else {
      this.comptabiliteServiceWeb.exploitation(idpdv, "annee", this.selectionannee).then(adminmultipdvServiceWeb => {
        console.log("-----11---------");
        console.log(adminmultipdvServiceWeb.response);
        this.exploitation = adminmultipdvServiceWeb.response.map(function (type) {
          return {
            dateajout: type.dateajout.date.split(".")[0],
            designation: type.designation,
            stocki: type.stocki,
            vente: type.vente,
            stockf: type.stockf,
            mnt: type.mnt,
          }
        });
        this.loading = false ;
      });
    }
  }

  listerexploitationintervalle(idpdv, iscommission){
    console.log(iscommission);
    if(this.selectionintervalledateinit && this.selectionintervalleddatefinal){
      this.loading = true ;
      this.selectionintervalle = this.selectionintervalledateinit+" "+this.selectionintervalleddatefinal;
      if(iscommission == 0){
        this.comptabiliteServiceWeb.exploitationaveccommission(idpdv, "intervalle", this.selectionintervalle).then(adminmultipdvServiceWeb => {
          console.log("-----12---------");
          console.log(adminmultipdvServiceWeb.response);
          this.exploitationaveccommission = adminmultipdvServiceWeb.response.map(function (type) {
            return {
              dateajout: type.dateajout.date.split(".")[0],
              designation: type.designation,
              mnt: type.mnt,
              frais: type.frais,
              commission: type.commission,
              service: type.service,
            }
          });
          this.loading = false ;
        }).then( type => {
          this.bilanexploitationaveccommission = [
            {service:'tnt', cashin:0, cashout:0, commission:0},
            {service:'postcash', cashin:0, cashout:0, commission:0},
            {service:'wizall', cashin:0, cashout:0, commission:0},
            {service:'orngemoney', cashin:0, cashout:0, commission:0},
            {service:'Total', cashin:0, cashout:0, commission:0},
          ];
          this.exploitationbilan = this.exploitationaveccommission;
          this.exploitationbilan.forEach(type => {
            this.bilanexploitationaveccommission[4].cashin+=type.mnt;
            this.bilanexploitationaveccommission[4].commission+=type.commission;
            if(type.service == 'TNT'){
              this.bilanexploitationaveccommission[0].cashin+=type.mnt;
              this.bilanexploitationaveccommission[0].commission+=type.commission;
            }
            if(type.service == 'POSTCASH'){
              this.bilanexploitationaveccommission[1].cashin+=type.mnt;
              this.bilanexploitationaveccommission[1].commission+=type.commission;
            }
            if(type.service == 'wizall'){
              this.bilanexploitationaveccommission[2].cashin+=type.mnt;
              this.bilanexploitationaveccommission[2].commission+=type.commission;
            }
            if(type.service == 'orangemoney'){
              if(type.designation == 'depot'){
                this.bilanexploitationaveccommission[3].cashin+=type.mnt;
              }
              else{
                this.bilanexploitationaveccommission[3].cashout+=type.mnt;
                this.bilanexploitationaveccommission[4].cashout+=type.mnt;
                this.bilanexploitationaveccommission[4].cashin-=type.mnt;
              }
              this.bilanexploitationaveccommission[3].commission+=type.commission;
            }
          });
        });
      }
      else {
        this.comptabiliteServiceWeb.exploitation(idpdv, "intervalle", this.selectionintervalle).then(adminmultipdvServiceWeb => {
          console.log("-----13---------");
          console.log(adminmultipdvServiceWeb.response);
          this.exploitation = adminmultipdvServiceWeb.response.map(function (type) {
            return {
              dateajout: type.dateajout.date.split(".")[0],
              designation: type.designation,
              stocki: type.stocki,
              vente: type.vente,
              stockf: type.stockf,
              mnt: type.mnt,
            }
          });
          this.loading = false ;
        });
      }
    }
  }




  /************************************************************************************
   *********************************   PARTIE PERSONNALISATION   ****************************
   ***********************************************************************************/



  clickIsselectlisterrevenuautre(){

  }

  ajouterdesignation(){
    this.designationsService.push(new Designation());
  }

  ajouterservice(i){
    this.estselectionne = i ;
    this.estselectionas = i;
    this.service = null;
    this.designationsService = [];
    this.designationsService.push(new Designation());
  }

  modifierservice(i){
    this.estselectionne = i ;
    this.estselectionms = i;
    this.loading = true ;
    this.comptabiliteServiceWeb.listeservice(this.pdvCaisses[i].idpdv).then(adminmultipdvServiceWeb => {
      this.supservice = adminmultipdvServiceWeb.response;
      this.loading = false ;
    });
  }

  supprimerservice(i){
    this.estselectionne = i;
    this.service = null;
    this.designationsService = [];
    this.loading = true ;
    this.comptabiliteServiceWeb.listeservice(this.pdvCaisses[i].id).then(adminmultipdvServiceWeb => {
      this.supservice = adminmultipdvServiceWeb.response;
      this.loading = false ;
    });
  }

  effacerunedesignation(i){
    this.designationsService = this.designationsService.filter(item => item !==this.designationsService[i]);
  }

  validerajouterservice(pdv:any){
    this.loading = true ;
    this.comptabiliteServiceWeb.ajoutservice(this.service, pdv.idpdv, ""+JSON.stringify(this.designationsService)).then(adminmultipdvServiceWeb => {
      this.comptabiliteServiceWeb.listeservice(pdv.idpdv).then(adminmultipdvServiceWeb => {
        this.supservice = adminmultipdvServiceWeb.response;
        this.loading = false ;
      });
    });


  }

  validermodifierservice(pdv:any){
    this.loading = true ;
    this.comptabiliteServiceWeb.modifierservice(this.service, ""+JSON.stringify(this.designationsService), this.serviceamodifier().idservice).then(adminmultipdvServiceWeb => {
      this.comptabiliteServiceWeb.listeservice(pdv.idpdv).then(adminmultipdvServiceWeb => {
        this.supservice = adminmultipdvServiceWeb.response;
        this.estselectionmods = -1 ;
        this.loading = false ;
      });
    });
  }

  deleteservice(supservice:Supservice, pdv) {
    this.loading = true ;
    this.comptabiliteServiceWeb.supprimerservice(supservice.idservice).then(adminmultipdvServiceWeb => {
      this.comptabiliteServiceWeb.listeservice(pdv.idpdv).then(adminmultipdvServiceWeb => {
        this.supservice = adminmultipdvServiceWeb.response;
        this.loading = false ;
      });
    });
  }

  serviceamodifier(){
    return this.supservice[this.estselectionmods];
  }

  modifyservice(i){
    // this.estselectionne = i ;
    this.estselectionmods=i;
    this.service = this.supservice[i].services;
    this.designationsService = JSON.parse(this.supservice[i].design);
  }

  autredesignation(i){
    this.estselectionne = i ;
    this.montreautredesignation=i;
  }

}
