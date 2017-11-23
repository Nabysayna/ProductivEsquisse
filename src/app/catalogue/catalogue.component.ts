import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';

import { EcomServiceWeb } from '../webServiceClients/ecom/ecom.service';
import * as _ from "lodash";


class OrderedArticle{
  public id:number;
  public qte:number;
  public prix:number;
  public montant:number;
  public designation:string;
  public description:string;
  public nomImg:string;
} 

class Article {
  public id:number;
  public nomImg:string;
  public designation:string;
  public description:string;
  public prix:number;
  public stock:number;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  

  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  loading = false ;
  p : any ;
  listarticles : any[] ;
  
  public asyncSelected: string;
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSource: Observable<any>;
  public filterQuery = "";

  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  orderedarticles:OrderedArticle [] = [];
  montant:number = 0;
  alert: boolean = false;


  constructor(public ecomCaller: EcomServiceWeb) { 
    this.dataSource = Observable
      .create((observer: any) => {
        observer.next(this.asyncSelected);
      })
      .mergeMap((token: string) => this.getStatesAsObservable(token));
  }

  ngOnInit() {
    this.loading = true ;
    this.ecomCaller.listeArticles(this.token, 'catalogue').then( response => {
      this.listarticles = response.reverse();
      this.loading = false ;
    }); 
  }

  public getStatesAsObservable(token: string): Observable<any> {
    let query = new RegExp(token, 'ig');
 
    return Observable.of(
      this.listarticles.filter((state: any) => {
        return query.test(state.designation);
      })
    );
  }
 
  public changeTypeaheadLoading(e: boolean): void {
    this.filterQuery = this.asyncSelected;
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
 
  public typeaheadOnSelect(e: TypeaheadMatch): void {
    this.filterQuery = e.value;
  }


  selectionnerarticle(article: Article){
    let existe = this.orderedarticles.find(function(item){
      return article.id == item.id;
    })
    if(existe == undefined){
      let orderedarticle:OrderedArticle = {
        id:article.id,
        qte:1,
        prix:article.prix,
        montant:article.prix,
        designation:article.designation,
        description:article.description,
        nomImg: article.nomImg,
      };
      this.orderedarticles.push(orderedarticle);
      this.recalculmontant();
    }
    else{
      this.orderedarticles = this.orderedarticles.filter(item => item.id!==article.id);
      this.recalculmontant();

    }
  }

  supprimerarticle(article){
    this.orderedarticles = this.orderedarticles.filter(item => item.id!==article.id);
    this.recalculmontant();
  }
  augmenterqte(i){
    if(this.orderedarticles[i].qte) {
      this.orderedarticles[i].qte++;  
      this.recalculmontant();
    }
    else {
      this.orderedarticles[i].qte++;
      this.recalculmontant();
    }
  }
  diminuerqte(i){
    if(this.orderedarticles[i].qte>1){
      this.orderedarticles[i].qte--;
      this.recalculmontant();
    }
  }
  recalculmontant(){
    this.montant = 0;
    for (var i = 0; i < this.orderedarticles.length; i++) {
      this.orderedarticles[i].montant = this.orderedarticles[i].qte * this.orderedarticles[i].prix;
      this.montant += this.orderedarticles[i].montant;
    }
  }
  

  @ViewChild('childModalCommand') public childModalCommand:ModalDirective;

  public showChildModalCommand():void { 
    this.childModalCommand.show();
  }

  public hideChildModalCommand():void {  this.childModalCommand.hide(); 
    this.nom = null;
    this.prenom = null;
    this.telephone = null;
    this.email = null;
  }

  public commander():void {
    let params = { 
      token: this.token , 
      orderedarticles:""+JSON.stringify(this.orderedarticles), 
      montant: this.montant, 
      prenomclient: this.prenom, 
      nomclient: this.nom, 
      telephoneclient: this.telephone, 
      emailclient: this.email 
    };
    this.loading = true ;
    this.ecomCaller.commander(params).then( response => {
      this.loading = false ;
    });  
    this.hideChildModalCommand();
    this.orderedarticles = [];
  }

  public viderordered(){
    this.orderedarticles = [];
  }

  public initialiserreseach(){
    this.filterQuery = this.asyncSelected = "";
    this.typeaheadNoResults = this.typeaheadLoading = false;
  }

}
