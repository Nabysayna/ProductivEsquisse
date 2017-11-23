import { Component, OnInit, NgZone, ViewChild, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }  from '@angular/common';
import { ModalDirective } from 'ng2-bootstrap/modal';

import * as sha1 from 'js-sha1';
import * as _ from "lodash";

import { CrmServiceWeb, Portefeuille, Relance, Promotion, Prospection, Suivicommande, Servicepoint } from '../webServiceClients/Crm/crm.service';


@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
	public relance:any[];
	public promotion:Promotion[];
	public prospection:Prospection[];
  public suivicommande:Suivicommande[];
	public portefeuille:Portefeuille[];
  public servicepoint:Servicepoint[];
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  loading = false ;
  message  : string = '' ;
  categMsg : string ;
  filtre = "" ;
  choosedCustomerPhone : string ;

  filtreSuiviCmd ="";
  filtreProspect ="";
  filtrePromo ="";
  filtreService ="---Choisir un service---";
  filtreRel ="";
  filtrePortFeuil ="";

  nom="nom";
  asc="asc";

  checkerRelance : any[] = [] ;
  checkerPromo : any[] = []  ;

  constructor(
  		   private location: Location,
         private route:ActivatedRoute,
         private router: Router,
         private crmServiceWeb:CrmServiceWeb
         ) { }


  ngOnInit() {
    this.loading = true ;     
      this.crmServiceWeb.servicepoint(this.token).then(serviceptserviceList => {
        this.servicepoint = serviceptserviceList;
        this.crmServiceWeb.portefeuille(this.token).then(crmserviceList => {
            this.portefeuille = crmserviceList;
            this.loading = false ;
          });
      });
  }


  relanceMeth(){
    this.loading = true ;
  	this.checkerRelance = [] ;
  	this.crmServiceWeb.relance(this.token).then(crmserviceList => {
        this.relance = crmserviceList;
        this.loading = false ;
      });

  }

  promotionMeth(){
    this.loading = true ;
    this.checkerPromo = [] ;
  	this.crmServiceWeb.promotion(this.token).then(crmserviceList => {
		        this.promotion = crmserviceList;
	          this.loading = false ;
		      });
  }

  getNom(infosop : string ){
  	return JSON.parse(infosop).nom ;
  }

  getPrenom(infosop:string){
  	return JSON.parse(infosop).prenom;
  }

  getTelephone(infosop:string){
  	return JSON.parse(infosop).tel;
  }

  prospect(){ 
      this.loading = true ;

       this.crmServiceWeb.prospection(this.token).then(crmserviceList => {
        this.prospection = crmserviceList;
          this.loading = false ;
      });
  }

  commandes(){
      this.loading = true ;

    this.crmServiceWeb.suivicommande(this.token).then(crmserviceList => {
        this.suivicommande = crmserviceList;
          this.loading = false ;
      });
  }

  prtflle(){
    this.loading = true ;
    this.crmServiceWeb.portefeuille(this.token).then(crmserviceList => {
        this.portefeuille = crmserviceList;
        this.loading = false ;
      });
  }

  checkThisForRelance( isChecked:boolean, customer:any, index ){
    if(isChecked){
      this.checkerRelance.push( {unicity :index, customer} ) ;
    }else
    if ( _.find( this.checkerRelance, { 'unicity': index } ) ) 
      this.checkerRelance = _.filter( this.checkerRelance, function(o) { return (o.unicity!=index) } );
  }

  checkThisForPromo( isChecked:boolean, customer:any, index ){
    if(isChecked){
      this.checkerPromo.push( {unicity :index, customer} ) ;
    }else
    if ( _.find( this.checkerPromo, { 'unicity': index } ) ) 
      this.checkerPromo = _.filter( this.checkerPromo, function(o) { return (o.unicity!=index) } );
  }

  getAddressRecup(pointderecuperation){
    return JSON.parse(pointderecuperation).address ;
  }

   mail(){}

   sms(telephone){
    let destinataire = '+221'+telephone ; 
    this.crmServiceWeb.sendSms(this.token, destinataire, this.message).then(crmserviceList => {
      this.childModal.hide();
      //console.log("SMS Sent with status "+crmserviceList) ;
      });
   }

   appel(){}


  detail(){}

  envoyersmsPromo(){   
    let destinataires : string ;
    destinataires = '+221'+this.checkerPromo[0].customer.telephone ;
    
    for( var i=1 ; i<this.checkerPromo.length ; i++ ){  
      destinataires = destinataires+'#+221'+this.checkerPromo[i].customer.telephone ;
    }

    this.crmServiceWeb.sendSms(this.token, destinataires, this.message).then(crmserviceList => {
      this.childModal.hide();
      //console.log("SMS Sent") ;
      });

  }

  envoyersmsRelance(){   
    let destinataires : string ;
    destinataires = '+221'+this.checkerRelance[0].customer.telephone ;
    for( var i=1 ; i<this.checkerRelance.length ; i++ ){
      destinataires = destinataires+'#+221'+this.checkerRelance[i].customer.telephone ;
    }

    this.crmServiceWeb.sendSms(this.token, destinataires, this.message).then(crmserviceList => {
      this.childModal.hide();
      //console.log("SMS Sent WITH STATUS "+crmserviceList) ;
      });
  }


  tester(){
    console.log("Checker activated!") ;
  }


  @ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal(typeSuivi, tel):void {
    this.categMsg = typeSuivi ;
    if (typeSuivi=='single')
      this.choosedCustomerPhone = tel ;
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.message = '' ;
    this.childModal.hide();
  }


}
