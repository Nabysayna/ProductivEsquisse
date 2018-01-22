import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';

import * as sha1 from 'js-sha1';
import * as _ from "lodash";

import {DemandepretServiceWeb, Demandepret} from '../webServiceClients/Demandepret/demandepret.service';


@Component({
  selector: 'app-demandepret',
  templateUrl: './demandepret.component.html',
  styleUrls: ['./demandepret.component.css']
})
export class DemandepretComponent implements OnInit {

	public demandepret:Demandepret[];
   token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
    loading = false ;

    intitule : string ;
    numcompte: string ;
    infoperso: string ;
    siegesoc: string ;
    numport: string ;
    numfixe: string ;
    email: string ;
    mntdemande: string ;
    dureedemande : string ;

    typcredit :string ;
    formejuridiq : string ;



  constructor(
  	
  	 private demandepretServiceWeb:DemandepretServiceWeb,
     private location: Location,
  	 private route:ActivatedRoute) { }

  ngOnInit() {
        this.demandepretServiceWeb.demandepret(this.token).then(demandepretserviceList => {
        this.demandepret = demandepretserviceList;
        console.log(JSON.stringify(this.demandepret));
        this.loading = false ;
      });

  	
  }

  envoyerDemande(){

    this.loading = true ;

    let requete = JSON.stringify( {"intitule":this.intitule, "numcompte":this.numcompte, "infoperso":this.infoperso, "siegesoc":this.siegesoc, "numport":this.numport, "numfixe":this.numfixe, "email":this.email, "mntdemande":this.mntdemande, "dureedemande":this.dureedemande, "typcredit":this.typcredit, "formejuridiq":this.formejuridiq} ) ;

    this.demandepretServiceWeb.envoyerDemandeDepretCofina(requete).then(gestionreportingServiceWeb => {
        this.loading = false ;

        this.intitule = undefined ;
        this.numcompte= undefined ;
        this.infoperso= undefined ;
        this.siegesoc= undefined ;
        this.numport= undefined;
        this.numfixe= undefined ;
        this.email= undefined;
        this.mntdemande= undefined ;
        this.dureedemande = undefined ;
        this.typcredit= undefined ;
        this.formejuridiq= undefined ;
    });

  }



  demandeprt() {
/*
        this.loading = true ;  
       this.demandepretServiceWeb.ajoutdemandepret(this.token,this.montantdemande).then(gestionreportingServiceWeb => {
        this.loading = false ;

       });
        
        this.montantdemande = 0 ;
*/        
  } 
  
}
