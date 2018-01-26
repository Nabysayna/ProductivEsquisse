import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { AdminmultipdvMajcaution }    from '../../models/adminmultipdv-majcaution';
import { AdminmultipdvServiceWeb } from '../../webServiceClients/Adminmultipdv/adminmultipdv.service';
import {ModalDirective} from "ng2-bootstrap";


@Component({
  selector: 'app-admin-multi-pdv-update-caution',
  templateUrl: './admin-multi-pdv-update-caution.component.html',
  styleUrls: ['./admin-multi-pdv-update-caution.component.css']
})
export class AdminmultipdvUpdateCautionComponent implements OnInit {

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

  public hideChildModalSuivipoint():void {
    this.childModalSuivipoint.hide();
  }


  suivrepoint(pdv:any){
    this.loading = true ;
    let datenow = ((new Date()).toJSON()).split("T",2)[0];
    console.log(pdv);
    console.log('----------------------------')
    this.adminmultipdvServiceWeb.activiteservices("suivre points init "+pdv.iduser+" "+datenow+" "+datenow).then(adminpdvServiceWebList =>{
      this.point = adminpdvServiceWebList.response;
      console.log(this.point);
      this.childModalSuivipoint.show();
      this.loading = false;
    });
  }


}
