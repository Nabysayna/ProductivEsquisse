import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { EcomServiceWeb, Commande } from '../webServiceClients/ecom/ecom.service';
import * as sha1 from 'js-sha1';
import * as _ from "lodash";


@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css']
})
export class ECommerceComponent implements OnInit {
  codecmd = "" ;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  loading = false ;
  ecomCaller = new EcomServiceWeb();
  infosCommande : any ;
  inforecvd = false ;
  postcmd = false ;
  prenom : string ;
  nom : string ;
  orderedArticles : string ;
  qte : number ;
  montant : number ;

  constructor() { }

  ngOnInit() {
  }

  initialize(){    
    this.codecmd = "" ;
    this.loading = false ;
    this.inforecvd = false ;
    this.postcmd = false ;
  }

  recupInfosCmd(){
  	console.log("Récupèration des informations relatives à la présente commande...") ;
    this.loading = true ;
    let requiredInfo = "infocmd#"+this.codecmd ;
    let paramObj={token : this.token, article : requiredInfo} ;
    this.ecomCaller.prendreCommande(paramObj).then( response =>
      {


        console.log("######################################################") ;


       this.infosCommande = JSON.parse(response)[0] ;
        this.prenom = this.infosCommande.prenomclient ;
        this.nom  = this.infosCommande.nomclient ;
        this.orderedArticles = this.infosCommande.orderedArticles ;
        this.montant = this.infosCommande.montant ;  

        this.loading = false ;
        this.inforecvd = true ;
      }); 
  }

  prendreCommande(){
    console.log("Récupèration des informations relatives à la présente commande...") ;
    this.loading = true ;
    let requiredInfo = "takecmd#"+this.codecmd ;
    let paramObj={token : this.token, article : requiredInfo} ;
    this.ecomCaller.prendreCommande(paramObj).then( response =>
      { 
        console.log("Reponse serveur :::: "+response) ;
        this.codecmd = "";
        this.loading = false ;
        this.postcmd = true ;
      }); 
  }

  @ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }


}
