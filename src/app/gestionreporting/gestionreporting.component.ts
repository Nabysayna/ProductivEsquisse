import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';

import * as sha1 from 'js-sha1';
import * as _ from "lodash";

import {GestionreportingServiceWeb, Gestionreporting, Servicepoint} from '../webServiceClients/Gestionreporting/gestionreporting.service';


import { ComptabiliteServiceWeb } from '../webServiceClients/Comptabilite/comptabilite.service';


@Component({
  selector: 'app-gestionreporting',
  templateUrl: './gestionreporting.component.html',
  styleUrls: ['./gestionreporting.component.css']
})
export class GestionreportingComponent implements OnInit {

  public gestionreporting:Gestionreporting[];
  public servicepoint:Servicepoint[];


  libelleCharge : string ;
  montantCharge : number ;
  service : string ;
  sujet:string;
  nomservice:string;
  message:string;
  quantite:number;
  designation:string;
  servicevente:string = "";
  datedebut:any;
  datefin:any;
  noma:string;
  prenoma:string;
  telephonea:string;
  choosenServiceName : string ;
  estselectassuranceform:boolean=false;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  loading = false ;

    nom="";
    asc="";
    filtre:"";

    caisseEtat: any;

  constructor(
     private location: Location,
     private route:ActivatedRoute,
  	 private gestionreportingServiceWeb:GestionreportingServiceWeb,
     private comptabiliteServiceWeb:ComptabiliteServiceWeb

  	) {}

  ngOnInit() {

     this.loading = true ;
     this.gestionreportingServiceWeb.servicepoint(this.token).then(serviceptserviceList => {
        this.servicepoint = serviceptserviceList;
        console.log(this.servicepoint);
        this.loading = false ;
     });
  }

  getDesignations(){
    if(this.servicevente){
      let designationsNames = [] ;
      let currentService = this.getCurrentService() ;
      let allDesignations = JSON.parse(currentService.designations) ;
      for (var i = allDesignations.length - 1; i >= 0; i--) {
           designationsNames.push(allDesignations[i].name);
        }
      return designationsNames;
    }else return [] ;
  }

  getCurrentService(){
    for (var i = this.servicepoint.length - 1; i >= 0; i--) {
      if(this.servicepoint[i].nom == this.servicevente){
          return this.servicepoint[i] ;
      }
    }
  }

  getName(design : string ){
    return JSON.parse(design).name ;
  }

  histop(){
     this.loading = true ;

        this.gestionreportingServiceWeb.gestionreporting(this.token).then(gestreportserviceList => {
        this.gestionreporting = gestreportserviceList;
        console.log(this.gestionreporting);
        this.loading = false ;
      });

      }

      validCharge(){
       this.loading = true ;
       this.gestionreportingServiceWeb.ajoutdepense(this.token,this.libelleCharge, this.service, this.montantCharge).then(gestionreportingServiceWeb => {
       // console.log(gestionreportingServiceWeb);
        this.loading = false ;

       });

        this.libelleCharge = "" ;
        this.service = "" ;
        this.montantCharge = 0 ;

      }

      validreclamation(){

        this.loading = true ;
       this.gestionreportingServiceWeb.reclamation(this.token,this.sujet, this.nomservice, this.message).then(gestionreportingServiceWeb => {
       // console.log(gestionreportingServiceWeb);
        this.loading = false ;

       });

        this.sujet = "" ;
        this.nomservice = "" ;
        this.message = "" ;

      }

      validvente(){
         this.loading = true ;
         if(this.servicevente.toLowerCase()=='assurance'.toLowerCase())
         {
            let tempdesignation=this.designation;
            this.designation=JSON.stringify({desig:tempdesignation, nom:this.noma, prenom:this.prenoma, telephone:this.telephonea, datedebut:this.datedebut.toString(), datefin:this.datefin.toString()})
            console.log("Obj designé "+this.designation);
         }

        console.log("Paramètres : "+this.token+" "+this.designation+" "+this.servicevente+" "+this.quantite.toString() );

       this.gestionreportingServiceWeb.vente(this.token,this.designation, this.servicevente, this.quantite).then(gestionreportingServiceWeb => {
       // console.log(gestionreportingServiceWeb);
        this.loading = false ;

       });

        this.designation = "" ;
        this.servicevente = "" ;
        this.quantite=0;
        this.datedebut="";
        this.datefin="";
        this.noma="";
        this.telephonea="";
        this.prenoma="";


      }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }

  etatcaisse(){

    this.comptabiliteServiceWeb.etatcaisse().then(adminmultipdvServiceWeb => {
      this.caisseEtat = adminmultipdvServiceWeb.response;
      // console.log(adminmultipdvServiceWeb.response);
    });
  }

  validerapprovision(idcaisse){
    this.comptabiliteServiceWeb.validerapprovisionn(idcaisse).then(adminmultipdvServiceWeb => {
      // console.log(adminmultipdvServiceWeb.response);
      this.caisseEtat.etat =1;
      this.caisseEtat.soldeFermet = this.caisseEtat.soldeOuvert;
    });
  }

  enregistrerassurance(){}

}

