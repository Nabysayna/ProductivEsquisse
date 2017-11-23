import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }  from '@angular/common';

import { CommercialServiceWeb } from '../webServiceClients/Commercial/commercial.service';


class Fichier {
	id:number;
	nom:string;
	prenom:string;
	tel:string;
	adr:string;
	qualification:string;
	choix:boolean;
	
	}

	class Rv {
	id:number;
	nom:string;
	prenom:string;
	tel:string;
	adr:string;
	nomag:string;

	
	}

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {

	fichier:Fichier[];
	rv:Rv[];

	filtre="";
  asc = "asc" ;
  nom = "nom" ;
  public zone:any;
  
  constructor(
  		   private location: Location,
         private route:ActivatedRoute,
  	     private router: Router,
         private commercialServiceWeb:CommercialServiceWeb
          ) { }

  ngOnInit():void {

    this.commercialServiceWeb.zone('dyjt','gdty').then(commercialserviceList => {
        this.zone = commercialserviceList;
        console.log(this.zone);
      });

  	 this.fichier= [{ id: 5, nom: 'ndiaye', prenom: 'naby', tel:"771111111", adr: "parcelles u24", qualification:"",choix:false},
   { id: 2, nom: 'sarr', prenom: 'marieme', tel:"774444444", adr: "djily mbaye", qualification:"", choix:false},
   { id: 3, nom: 'ka', prenom: 'assane', tel:"777777777", adr: "keur mbaye fall", qualification:"", choix:false}];


  	 this.rv= [{ id: 5, nom: 'ndiaye', prenom: 'naby', tel:"771111111", adr: "parcelles u24", nomag:"kane amath"},
   { id: 2, nom: 'sarr', prenom: 'marieme', tel:"774444444", adr: "djily mbaye", nomag:"dia mouhamed"},
   { id: 3, nom: 'ka', prenom: 'assane', tel:"777777777", adr: "keur mbaye fall", nomag:"diouf luc"}];

}
  enregistrer(){
  	for (var i = this.fichier.length - 1; i >= 0; i--) {
  		if(this.fichier[i].choix)
  			console.log(JSON.stringify(this.fichier[i]));
  	}	
  }

  valider(){
  	for (var i = this.fichier.length - 1; i >= 0; i--) {
  		
  			console.log(JSON.stringify(this.fichier[i]));
  	}
  }

}
