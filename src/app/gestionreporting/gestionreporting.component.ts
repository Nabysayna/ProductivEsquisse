import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';
import { Router } from '@angular/router';
import {GestionreportingServiceWeb, Gestionreporting, Servicepoint} from '../webServiceClients/Gestionreporting/gestionreporting.service';
import { ComptabiliteServiceWeb } from '../webServiceClients/Comptabilite/comptabilite.service';


@Component({
  selector: 'app-gestionreporting',
  templateUrl: './gestionreporting.component.html',
  styleUrls: ['./gestionreporting.component.css']
})
export class GestionreportingComponent implements OnInit {

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
      private router: Router,
      private location: Location,
      private route:ActivatedRoute,
  	  private gestionreportingServiceWeb:GestionreportingServiceWeb,
      private comptabiliteServiceWeb:ComptabiliteServiceWeb

  	) {}

  ngOnInit() {
    this.histop();
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


  depenseop(){
     this.loading = true ;
     this.gestionreportingServiceWeb.servicepoint(this.token).then(serviceptserviceList => {
      this.servicepoint = serviceptserviceList;
       this.loading = false ;
     });
  }

  validCharge(){
       this.loading = true ;
       this.gestionreportingServiceWeb.ajoutdepense(this.token,this.libelleCharge, this.service, this.montantCharge).then(gestionreportingServiceWeb => {
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

  trimer(infosclient) : string{
    return infosclient.replace('R', '') ;
  }

  enregistrerassurance(){}

  /************************************************************************************
   ********************   PARTIE HISTORIQUE OPERATION   ****************************
   ***********************************************************************************/

  public gestionreporting:Gestionreporting[];
  selectionjour:string;
  selectionintervalledateinit:string;
  selectionintervalleddatefinal:string;

  historiquejour(){
    this.selectionintervalledateinit = undefined;
    this.selectionintervalleddatefinal = undefined;
    this.gestionreportingServiceWeb.reportingdate(this.token,10, 'jour', this.selectionjour).then(gestreportserviceList => {
      console.log('reportingdate jour');
      this.gestionreporting = gestreportserviceList;
      this.loading = false ;
    });

  }

  historiqueintervalle(){
    this.selectionjour = undefined;
    this.gestionreportingServiceWeb.reportingdate(this.token,10, 'intervalle', this.selectionintervalledateinit+" "+this.selectionintervalleddatefinal).then(gestreportserviceList => {
      console.log('reportingdate intervalle');
      this.gestionreporting = gestreportserviceList;
      this.loading = false ;
    });
  }

  histop(){
    this.loading = true ;
    let datenow = ((new Date()).toJSON()).split("T",2)[0];
    this.selectionjour = datenow;
    this.gestionreportingServiceWeb.reportingdate(this.token,10, 'jour', this.selectionjour).then(gestreportserviceList => {
      console.log('reportingdate init');
      this.gestionreporting = gestreportserviceList;
      this.loading = false ;
    });
  }

  reimprimerhistop(operation){
    this.gestionreportingServiceWeb.reimpression(this.token,10, JSON.stringify(operation), operation.operateur).then(gestreportserviceList => {
      console.log('reimpression');
      let getdataimpression = gestreportserviceList;
      if(operation.operateur=="TNT"){
        let dataImpression = null;
        if(getdataimpression.typeoperation=="abonnement"){
          let infos = JSON.parse(getdataimpression.infosoperation);
          let typebouquet = "";
          if (infos.id_typeabonnement==1){
            typebouquet = "Maanaa";
          }
          if (infos.id_typeabonnement==2){
            typebouquet = "Boul Khool";
          }
          if (infos.id_typeabonnement==3){
            typebouquet = "Maanaa + Boul Khool";
          }
          dataImpression = {
            apiservice:'tntreimpression',
            service:'abonnement',
            infotransaction:{
              client:{
                transactionBBS: getdataimpression.idoperation,
                prenom:infos.prenom,
                nom:infos.nom,
                telephone:infos.tel,
                carte: infos.n_carte,
                chip:infos.n_chip,
                typebouquet:typebouquet,
                montant: infos.montant,
                duree:infos.duree
              },

            },
          }
        }
        if(getdataimpression.typeoperation=="decodeur"){
          let infos = JSON.parse(getdataimpression.infosoperation);
          console.log(infos);
          /*let typebouquet = "";
          if (infos.id_typeabonnement==1){
            typebouquet = "Maanaa";
          }
          if (infos.id_typeabonnement==2){
            typebouquet = "Boul Khool";
          }
          if (infos.id_typeabonnement==3){
            typebouquet = "Maanaa + Boul Khool";
          }
          dataImpression = {
            apiservice:'tntreimpression',
            service:'decodeur',
            infotransaction:{
              client:{
                transactionBBS: getdataimpression.idoperation,
                prenom:infos.prenom,
                nom:infos.nom,
                telephone:infos.tel,
                carte: infos.n_carte,
                chip:infos.n_chip,
                typebouquet:typebouquet,
                montant: infos.montant,
                duree:infos.duree
              },

            },
          }*/
        }
        if(getdataimpression.typeoperation=="carte"){
          let infos = JSON.parse(getdataimpression.infosoperation);
          console.log(infos);
          /*let typebouquet = "";
           if (infos.id_typeabonnement==1){
           typebouquet = "Maanaa";
           }
           if (infos.id_typeabonnement==2){
           typebouquet = "Boul Khool";
           }
           if (infos.id_typeabonnement==3){
           typebouquet = "Maanaa + Boul Khool";
           }
           dataImpression = {
           apiservice:'tntreimpression',
           service:'decodeur',
           infotransaction:{
           client:{
           transactionBBS: getdataimpression.idoperation,
           prenom:infos.prenom,
           nom:infos.nom,
           telephone:infos.tel,
           carte: infos.n_carte,
           chip:infos.n_chip,
           typebouquet:typebouquet,
           montant: infos.montant,
           duree:infos.duree
           },

           },
           }*/
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(dataImpression));
        this.router.navigate(['accueil/impression']);
      }
      if(operation.operateur=="POSTCASH"){
        console.log('POSTCASH');
      }

    });
  }


}

