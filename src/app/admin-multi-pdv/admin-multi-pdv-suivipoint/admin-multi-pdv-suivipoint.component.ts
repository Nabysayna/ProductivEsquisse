import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { AdminmultipdvMajcaution }    from '../../models/adminmultipdv-majcaution';
import { AdminmultipdvServiceWeb } from '../../webServiceClients/Adminmultipdv/adminmultipdv.service';
import {ModalDirective} from "ng2-bootstrap";
import {BaseChartDirective} from "ng2-charts";


@Component({
  selector: 'app-admin-multi-pdv-suivipoint',
  templateUrl: 'admin-multi-pdv-suivipoint.component.html',
  styleUrls: ['admin-multi-pdv-suivipoint.component.css']
})
export class AdminmultipdvSuivipointComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "adminpdv";
    public sortOrder = "desc";
    public categoriepoint='---' ;
    public adminmultipdvMajcaution: AdminmultipdvMajcaution[];
    loading = false ;

    inputCaution: number;
    majcaution:AdminmultipdvMajcaution;
  constructor(private adminmultipdvServiceWeb: AdminmultipdvServiceWeb) { }

  ngOnInit() {
    this.loading = true ;
    this.listmajcautions();
  }

  listmajcautions(){
    this.adminmultipdvServiceWeb.listmajcautions('azrrtt').then(adminmultipdvServiceWebList => {
      if(adminmultipdvServiceWebList.errorCode == 1){
        this.adminmultipdvMajcaution = adminmultipdvServiceWebList.response.map(function (elt) {
          return {
            adminpdv:elt.adminpdv,
            adresse: JSON.parse(elt.adresse).address,
            cautioninitiale:elt.cautioninitiale,
            date_last_deposit:elt.date_last_deposit.date.split('.')[0],
            idcaution:elt.idcaution,
            iduser:elt.idUser,
            montantconsomme:elt.montantconsomme,
            telephone:elt.telephone,
            categorie: (elt.cautioninitiale==0)?'pas':((100*elt.montantconsomme)/elt.cautioninitiale)<25?'faible':((100*elt.montantconsomme)/elt.cautioninitiale)>=25 && ((100*elt.montantconsomme)/elt.cautioninitiale)<=50?'passable':'bien',
          }
        })
        console.log(this.adminmultipdvMajcaution);
      }
      else{
        this.loading = false;
        this.adminmultipdvMajcaution = [];
      }
    }).then( () => {
      this.getCategorie('Tous');
      this.loading = false;
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.adminpdv.length;
  }

  public maj(item):void {
    this.inputCaution = null;
    this.majcaution = item;
  }

  public validermaj(item):void {
    this.loading = true ;
    this.adminmultipdvServiceWeb.modifymajcaution('azrrtt', this.majcaution.idcaution, this.inputCaution, this.categoriepoint).then(adminmultipdvServiceWebList => {
      console.log(adminmultipdvServiceWebList);
      this.closeModal();
      this.loading = false ;
      this.listmajcautions();
      this.categoriepoint = '---' ;
    });
  }

  // -------------- Categorisations
  public categorie:string = 'Tous';
  public listepoints:any[] = [];
  public pointasuivre:any;

  getCategorie(categorie: string){
    console.log(categorie)
    if(categorie=='Tous'){
      this.categorie = 'Tous';
      this.listepoints = this.adminmultipdvMajcaution;
    }
    if(categorie=='Pas de depot'){
      this.categorie = 'Pas de depot';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='pas');
    }
    if(categorie=='Faible'){
      this.categorie = 'Faible';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='faible');
    }
    if(categorie=='Passable'){
      this.categorie = 'Passable';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='passable');
    }
    if(categorie=='Bien'){
      this.categorie = 'Bien';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='bien');
    }
    this.loading = false ;
  }

/////////////////////// SUIVRE POINT /////////////////
  public point:any;
  @ViewChild('childModalSuivipoint') public childModalSuivipoint:ModalDirective;


/////////////////////// All Detail POINT /////////////////

  public superviseurpoint:any;
  public touslescommissions:any[] = [];
  public touslesgerants:any[] = [];
  public montanttotaldepot:number = 0;
  public touslesdepots:any[] = [];
  public affichelesdepots:any = {jours:[], montant:[]};
  public suiviserviceSelectionintervalledateinit:string;
  public suiviserviceSelectionintervalledatefinal:string;


  @ViewChild("baseChart2")  chart2: BaseChartDirective;
  public suivionepointSelectionDepot(){
    this.touslesdepots = this.point.depots.map(function(type){
      return {
        date_depot: type.daterenflu.date.split('.')[0],
        date_depot_jour: type.daterenflu.date.split('.')[0].split(' ')[0],
        montant_depot: JSON.parse(type.infosup).montant,
      }
    });

    let depotjours = this.touslesdepots.map(type => type.date_depot_jour);
    depotjours.sort();

    let tabjours:string[] = [];
    let jour:string = depotjours[0];
    tabjours.push(jour);
    depotjours.forEach(type => { if(type!=jour){
      tabjours.push(type);
      jour = type;
    }});

    let tabjoursmontant:number[] = [];
    tabjours.forEach(date => {
      let montant:number = 0
      this.touslesdepots.forEach( type=> { if(type.date_depot_jour==date){ montant  += Number(type.montant_depot); } });
      tabjoursmontant.push(montant);
    });
    this.affichelesdepots.jours = tabjours;
    this.affichelesdepots.montant = tabjoursmontant;

    this.barChartLabels = tabjours;
    if(this.chart2 !== undefined){
      this.chart2.chart.config.data.labels = this.barChartLabels;
    }

    this. barChartData = [{data: tabjoursmontant, label: 'Dépots'}];
  }

//************************DEPOT DIAGRAM*************************
  public barChartOptions:any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels:string[] = [];
  public barChartType:string = 'line';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [];

  @ViewChild("baseChart1")  chart1: BaseChartDirective;
  public touslesjours:any[] = [];
  public touslescommissionsbyGerant:any[] = [];
  public bilantouslescommissionsbyGerant:any[] = [];
  public touslescommissionsbyGerantbyservice:any[] = [];
  public id_gerant_selectionne:number=-1;

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = { responsive: true };
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = true;

  public suivrepoint(pdv:any){
    this.pointasuivre = null;
    this.point = null;

    this.childModalSuivipoint.show();
    this.loading = true ;
    let datenow = ((new Date()).toJSON()).split("T",2)[0];
    this.suiviserviceSelectionintervalledateinit = datenow;
    this.suiviserviceSelectionintervalledatefinal = datenow;
    this.pointasuivre = pdv;

    this.adminmultipdvServiceWeb.activiteservices("suivre points init "+pdv.iduser+" "+this.suiviserviceSelectionintervalledateinit+" "+this.suiviserviceSelectionintervalledatefinal).then(adminpdvServiceWebList =>{
      this.point = adminpdvServiceWebList.response;

      this.superviseurpoint = {
        date_ajout: this.point.superviseur.dateCreation.date.split('.')[0],
        date_last_connection: this.point.superviseur.last_connection.date.split('.')[0],
        info_point: JSON.parse(this.point.superviseur.infosup),
        fullname: this.point.superviseur.nom_gerant,
        tel: this.point.superviseur.telephone,
        email: this.point.superviseur.login,
        adressecomplet: JSON.parse(this.point.superviseur.adresse),
      };

      this.point.depots.forEach(type => { this.montanttotaldepot += Number(JSON.parse(type.infosup).montant); });
      this.suivionepointSelectionDepot();

      this.touslesgerants = this.point.gerants.map(function(type){
        return {
          id_gerant: type.id_gerant,
          nom_gerant: type.nom_gerant,
          telephone: type.telephone,
          last_connection: type.last_connection.date.split('.')[0],
        }
      });
      this.touslescommissions = this.point.commissions.map(function(type){
        return {
          id_gerant: type.idUser,
          dateop: type.dateoperation.date.split('.')[0],
          dateop_jour: type.dateoperation.date.split('.')[0].split(' ')[0],
          montant: type.montant,
          commission: type.commissionpdv,
          service: type.nomservice.toLowerCase(),
          produit: type.libelleoperation.toLowerCase(),
        }
      });

      this.loading = false;
    }).then(() => {
      this.suivionepointSelectionGerant(-1);
    });
  }

  public suivionepointSelectionGerant(indice: number){
    this.lineChartData = [];
    this.lineChartLabels = [];
    this.touslesjours = [];
    console.log(indice);
    this.id_gerant_selectionne = indice;
    if(this.id_gerant_selectionne==-1){ this.touslescommissionsbyGerant = this.touslescommissions;  }
    else {  this.touslescommissionsbyGerant = this.touslescommissions.filter( opt => opt.id_gerant==this.id_gerant_selectionne); }

    this.suivionepointgraphe();
    this.suivionepointdetail();
  }

  public suivionepointIntervalle(){
    this.touslescommissions = [];
    console.log("--------------------------------------------------")
    console.log(this.suiviserviceSelectionintervalledateinit+" "+this.suiviserviceSelectionintervalledatefinal)
    this.adminmultipdvServiceWeb.activiteservices("suivre points intervalle "+this.pointasuivre.iduser+" "+this.suiviserviceSelectionintervalledateinit+" "+this.suiviserviceSelectionintervalledatefinal).then(adminpdvServiceWebList => {
      this.id_gerant_selectionne = -1;
      this.touslescommissions = adminpdvServiceWebList.response.map(function(type){
        return {
          id_gerant: type.idUser,
          dateop: type.dateoperation.date.split('.')[0],
          dateop_jour: type.dateoperation.date.split('.')[0].split(' ')[0],
          montant: type.montant,
          commission: type.commissionpdv,
          service: type.nomservice,
          produit: type.libelleoperation,
        }
      });
      console.log(this.touslescommissions);
      console.log("--------------------------------------------------");
    }).then( () => {
      this.suivionepointSelectionGerant(-1);
    });
  }

  public suivionepointgraphe(){
    this.touslesjours = this.touslescommissions.map( type => type.dateop_jour);
    this.touslesjours.sort();
    let tabjours:string[] = [];
    let jour:string = this.touslesjours[0];
    tabjours.push(jour);
    this.lineChartLabels.push(jour);
    this.touslesjours.forEach(type => {
      if(type!=jour){
        tabjours.push(type);
        this.lineChartLabels.push(type);
        jour = type;
      }
    });

    if(this.chart1 !== undefined){
      this.chart1.chart.config.data.labels = this.lineChartLabels;
    }

    let nbrebyjourom:number[] = [];
    let nbrebyjourtnt:number[] = [];
    let nbrebyjourpost:number[] = [];
    let nbrebyjourtigocash:number[] = [];
    let nbrebyjourwizall:number[] = [];
    tabjours.forEach(type => {
      let nbrebyjouromSom:number = 0;
      let nbrebyjourtntSom:number = 0;
      let nbrebyjourpostSom:number = 0;
      let nbrebyjourtigocashSom:number = 0;
      let nbrebyjourwizallSom:number = 0;

      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='orangemoney'){ nbrebyjouromSom += Number(opt.montant); } }); nbrebyjourom.push( nbrebyjouromSom );
      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='tnt'){ nbrebyjourtntSom += Number(opt.montant); } }); nbrebyjourtnt.push( nbrebyjourtntSom );
      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='postcash'){ nbrebyjourpostSom += Number(opt.montant); } }); nbrebyjourpost.push( nbrebyjourpostSom );
      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='tigocash'){ nbrebyjourtigocashSom += Number(opt.montant); } }); nbrebyjourtigocash.push( nbrebyjourtigocashSom );
      this.touslescommissionsbyGerant.forEach( opt => { if(opt.dateop_jour==type && opt.service=='wizall'){ nbrebyjourwizallSom += Number(opt.montant); } }); nbrebyjourwizall.push( nbrebyjourwizallSom );
    });


    this.lineChartData = [
      {data: nbrebyjourom, label: 'OM'},
      {data: nbrebyjourtnt, label: 'TNT'},
      {data: nbrebyjourpost, label: 'POSTECASH'},
      {data: nbrebyjourwizall, label: 'TIGOCASH'},
      {data: nbrebyjourwizall, label: 'WIZALL'},
    ];
  }

  public suivionepointdetail(){
    this.bilantouslescommissionsbyGerant = [
      {service:'tnt', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'postcash', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'wizall', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'orangemoney', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'tigocash', cashin:0, cashout:0, commission:0, liste:[]},
      {service:'Total', cashin:0, cashout:0, commission:0, liste:[]},
    ];
    this.touslescommissionsbyGerant.forEach(type => {
      this.bilantouslescommissionsbyGerant[5].liste.push(type);
      this.bilantouslescommissionsbyGerant[5].commission+=type.commission;
      if(type.service == 'tnt'){
        this.bilantouslescommissionsbyGerant[0].liste.push(type);
        this.bilantouslescommissionsbyGerant[0].cashin+=Number(type.montant);
        this.bilantouslescommissionsbyGerant[0].commission+=type.commission;
        this.bilantouslescommissionsbyGerant[5].cashin+=Number(type.montant);
      }
      if(type.service == 'postcash'){
        this.bilantouslescommissionsbyGerant[1].liste.push(type);
        this.bilantouslescommissionsbyGerant[1].cashin+=Number(type.montant);
        this.bilantouslescommissionsbyGerant[1].commission+=type.commission;
        this.bilantouslescommissionsbyGerant[5].cashin+=Number(type.montant);
      }
      if(type.service == 'wizall'){
        this.bilantouslescommissionsbyGerant[2].liste.push(type);
        this.bilantouslescommissionsbyGerant[2].cashin+=Number(type.montant);
        this.bilantouslescommissionsbyGerant[2].commission+=type.commission;
        this.bilantouslescommissionsbyGerant[5].cashin+=Number(type.montant);
      }
      if(type.service == 'tigocash'){
        this.bilantouslescommissionsbyGerant[4].liste.push(type);
        this.bilantouslescommissionsbyGerant[4].cashin+=Number(type.montant);
        this.bilantouslescommissionsbyGerant[4].commission+=type.commission;
        this.bilantouslescommissionsbyGerant[5].cashin+=Number(type.montant);
      }
      if(type.service == 'orangemoney'){
        if(type.produit == 'depot'){
          this.bilantouslescommissionsbyGerant[3].cashin+=Number(type.montant);
          this.bilantouslescommissionsbyGerant[5].cashin+=Number(type.montant);
        }
        else{
          this.bilantouslescommissionsbyGerant[3].cashout+=Number(type.montant);
          this.bilantouslescommissionsbyGerant[5].cashout+=Number(type.montant);
        }
        this.bilantouslescommissionsbyGerant[3].liste.push(type);
        this.bilantouslescommissionsbyGerant[3].commission+=type.commission;
      }
    });
    console.log(this.bilantouslescommissionsbyGerant);
  }

  public hideChildModalSuivipoint():void {
    this.childModalSuivipoint.hide();
  }

  public showModalVoirDetailtouslescommissionsbyGerant(indice:number) {
    this.touslescommissionsbyGerantbyservice = this.bilantouslescommissionsbyGerant[indice].liste;
    console.log(this.touslescommissionsbyGerantbyservice);
  }

  tocurrency(number){
    return Number(number).toLocaleString();
  }






}
