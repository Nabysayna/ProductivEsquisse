import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import * as sha1 from 'js-sha1';

import { AuthenticationService } from '../../services/authentification.service';

import { AdminpdvServiceWeb } from '../../webServiceClients/Adminpdv/adminpdv.service';
import {UtilService} from "../../services/util.service";


@Component({
  selector: 'app-adminpdv-parametre-compte',
  templateUrl: './adminpdv-parametre-compte.component.html',
  styleUrls: ['./adminpdv-parametre-compte.component.css']
})
export class AdminpdvparametrecompteComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "pdv";
  public sortOrder = "asc";

  public regions:any[] = [];
  public zones:any[] = [];
  public iszones:boolean;
  public souszones:any[] = [];
  public issouszones:boolean;

  region : any ;
  zone : any ;
  souszone : any ;
  chaine : string ;

  prenom : any ;
  nom :any ;
  email :any ;
  telephone :any ;
  nometps : any ;
  nomshop : any ;
  adresse : any ;

  existLogin = false ;

  public monitoringAdminpdvUserpdv: any;
  public modifuserpdv: any;
  public password:string;
  public confirmPassword:string;
  public errorConfirm:boolean = false;
  loading = false ;

  constructor(private adminpdvServiceWeb: AdminpdvServiceWeb, private authenticationService: AuthenticationService, private _utilService:UtilService) { }

  ngOnInit() {

    this.adminpdvServiceWeb.listuserpdv('azrrtt').then(adminpdvServiceWebList => {
      this.monitoringAdminpdvUserpdv = adminpdvServiceWebList.response;
      console.log(this.monitoringAdminpdvUserpdv);
      this.getRegionNewCaissier();
    });

  }

  getRegionNewCaissier(){
    this._utilService.getRegion()
      .subscribe(
        data => {
          this.regions = data;
        },
        error => alert(error),
        () => {
          console.log('test init sentool')
        }
      );
  }
  selectRegionNewCaissier(){
    this.iszones = false;
    this.zone = '--Choix zone--';
    this.souszone = '--Choix sous zone--';
    this._utilService.getZoneByRegion(this.region)
      .subscribe(
        data => {
          this.zones = data;
          this.iszones = true;
        },
        error => alert(error),
        () => console.log('getZoneByRegion')
      );
  }


  selectZoneNewCaissier(){
    this.issouszones = false;
    this._utilService.getSouszoneByZoneByRegion({region:this.region, zone: this.zone})
      .subscribe(
        data => {
          this.souszones = data;
          this.issouszones = true;
        },
        error => alert(error),
        () => console.log('getSouszoneByZoneByRegion')
      );
  }

  private closeModal(): void {
    this.iszones = false;
    this.issouszones = false;
    this.getRegionNewCaissier();

    this.errorConfirm = false;
    this.closeBtn.nativeElement.click();
    console.log('close');
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.pdv.length;
  }

  getAdress(adresse){
    return JSON.parse(adresse).address+" / "+JSON.parse(adresse).zone ;
  }


  public modif(item):void {
    this.modifuserpdv = item;
    console.log(this.modifuserpdv);
  }

  public validermodif():void {
    if(this.password == this.confirmPassword) {
      this.adminpdvServiceWeb.modifypdv(this.modifuserpdv.idpdv, sha1(this.password) ).then(adminpdvServiceWebList => {
      });

      this.errorConfirm = false;
      this.password= null;
      this.confirmPassword = null;
      this.closeBtn.nativeElement.click();
    }
    else{
      this.errorConfirm = true;
    }

  }

  inscrire(){
    let paramInscrpt = {'token': JSON.parse(sessionStorage.getItem("currentUser")).baseToken, 'prenom':this.prenom, 'nom':this.nom, 'email':this.email, 'telephone':this.telephone, 'nometps':this.nometps, 'nomshop':this.nomshop, adresse : JSON.stringify({'region':this.region, 'zone':this.zone, 'souszone':this.souszone, 'address':this.adresse}) } ;
    this.loading = true ;
    console.log( "Nouvel Inscrit : "+JSON.stringify(paramInscrpt) ) ;
    this.authenticationService.creerProfilCaissier(paramInscrpt).then( retourserveur => {
      this.loading = false ;
      if(retourserveur!="bad"){
        this.adminpdvServiceWeb.listuserpdv('azrrtt').then(adminpdvServiceWebList => {
          this.monitoringAdminpdvUserpdv = adminpdvServiceWebList.response;
        });

        this.prenom=undefined ;
        this.nom=undefined ;
        this.email=undefined ;
        this.telephone=undefined ;
        this.nometps=undefined ;
        this.nomshop=undefined ;
        this.region=undefined ;
        this.zone=undefined ;
        this.souszone=undefined ;
        this.adresse=undefined ;
        this.existLogin = false ;
        this.closeModal();
      }else
        this.existLogin = true ;

    }) ;
  }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }

  public deconnexionsession(pdv,i):void {
    this.loading = true ;
    this.adminpdvServiceWeb.deconnectpdv(pdv.idpdv).then(reponseServeur => {
      this.loading = false ;
      if (reponseServeur.errorCode==1){
        pdv.isconnect = !pdv.isconnect ;
      }
    });
  }


  public autoriseravoirdeposir(gerant, estautorise:number){
      this.adminpdvServiceWeb.autoriservoirdepot(gerant.idpdv, estautorise).then(adminpdvServiceWebList => {
        console.log(adminpdvServiceWebList.response);
        console.log('--------------');
      });
  }


}
