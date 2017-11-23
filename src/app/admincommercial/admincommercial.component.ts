import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }  from '@angular/common';

import { CommercialServiceWeb, Operateurs, Commerciaux } from '../webServiceClients/Commercial/commercial.service';
import * as sha1 from 'js-sha1';
import * as _ from "lodash";



	class RvOperateurs {
	id:number;
	nom:string;
	prenom:string;
	tel:string;
	adr:string;
	nomag:string;
	etat:string;

	
	}

@Component({
  selector: 'app-admincommercial',
  templateUrl: './admincommercial.component.html',
  styleUrls: ['./admincommercial.component.css']
})
export class AdmincommercialComponent implements OnInit {

  
	operateurs:Operateurs[];
  commerciaux:Commerciaux[];
	rvoperateurs:RvOperateurs[];
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  commercialCaller: CommercialServiceWeb = new CommercialServiceWeb();
  loading = false ;

  filtre ="";
  nom="nom";
  asc="asc";

  public listoperateurs:any;
  public listcommerciaux:any;
  public zone:any;


  constructor(
  		   private location: Location,
         private route:ActivatedRoute,
  	     private router: Router,
         private commercialServiceWeb:CommercialServiceWeb
  ) { }

  ngOnInit(){
      
    this.loading = true ;
    this.commercialCaller.listoperateurs(this.token).then( response =>
      {
        console.log("Le serveur a répondu : "+JSON.stringify(response)) ;
        this.loading = false ;
        this.operateurs = response; 
      });     
    
     this.commercialCaller.listcommerciaux(this.token).then( response =>
      {
        console.log("Le serveur a répondu : "+JSON.stringify(response)) ;
        this.loading = false ;
        this.commerciaux = response; 
      });     
    


    this.commercialServiceWeb.zone('dyjt','gdty').then(commercialserviceList => {
        this.zone = commercialserviceList;
        console.log(this.zone);
      });




  	 this.rvoperateurs= [{ id: 5, nom: 'ndiaye', prenom: 'naby', tel:"771111111", adr: "parcelles u24", nomag:"kane amath",etat:"effectif"},
   { id: 2, nom: 'sarr', prenom: 'marieme', tel:"774444444", adr: "djily mbaye", nomag:"dia mouhamed",etat:"programmé"},
   { id: 3, nom: 'ka', prenom: 'assane', tel:"777777777", adr: "keur mbaye fall", nomag:"diouf luc",etat:"annulé"}];


  
  }

  enregistrer(){
  	// for (var i = this.operateurs.length - 1; i >= 0; i--) {
  	// 	if(this.operateurs[i].choix)
  	// 		console.log(JSON.stringify(this.operateurs[i]));
  	// }	
  }

  valider(){
  	for (var i = this.rvoperateurs.length - 1; i >= 0; i--) {
  		
  			console.log(JSON.stringify(this.rvoperateurs[i]));
  	}

  }

  assigner(){
  	// for (var i = this.operateurs.length - 1; i >= 0; i--) {
  	// 	if(this.operateurs[i].choix)
  	// 		console.log(JSON.stringify(this.operateurs[i]));
  	// }
  }

}
