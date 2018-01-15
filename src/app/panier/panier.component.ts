import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { PostCashWebService } from '../webServiceClients/PostCash/postcash.service';
import { TntServiceWeb, TntResponse } from '../webServiceClients/Tnt/Tnt.service';
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';

class Article {
  public id:number;
  public nomImg:string;
  public designation:string;
  public description:string;
  public prix:number;
  public quantite:number;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  
})
export class panierComponent implements OnInit {
  articles:any=[];
  process=[];
  
   quinzeMinutes = 900000; 
//  quinzeMinutes = 15000;	
  registredAPIs : string [] = ['POSTECASH', 'ORANGEMONEY', 'TIGOCASH', 'TNT BY EXCAF'] ;
  //registredAPIs : string [] = ['POSTECASH', 'TNT BY EXCAF'] ;
  authorisedToUseCRM = false ;
  load="loader";
  private tntCaller: TntServiceWeb ;
  actif = -1 ;
  dataImpression:any;
  clients=[{'prenom':'magor','nom':'sy','telephone':779013878,'adress':'Mbour'}];
  prenom:string="";
  nom:string="";
  adress:string="";
  telephone:number=undefined;
  estclient:boolean=false;
  constructor(private router: Router,private omService : OrangeMoneyService,private postcashwebservice: PostCashWebService) {}

/******************************************************************************************************/


  ngOnInit() {
           this.articles=JSON.parse(sessionStorage.getItem('panier'));
           console.log(this.articles);
    
  }


  @ViewChild('modalcommande') public modalcommande:ModalDirective;
  annulerOperation(){
    console.log("Opèration annulée ...") ;
  }
  color(i:number):string{
     if(i%2==0){
       return "border-left:2px solid green";
     }
     else{
       return "border-left:2px solid blue";
     }
  }
  getFormatted( designation) : string {
    if(designation.length>16)
      return designation.substring(0, 13)+'...' ;

    return designation ;
  }
  currency(prix:number){
   return Number(prix).toLocaleString();
  }
  totalpanier(){
    let total=0;
    for(let i=0;i<this.articles.length;i++){
       total+=this.articles[i].data.prix*this.articles[i].data.quantite;
    }
    return total;
  }
  showmodalcommande(){
    this.prenom="";
    this.nom="";
    this.adress="";
    this.telephone=undefined;
    this.estclient=false;
    this.modalcommande.show();
  }
  hidemodalcommande(){
     this.prenom="";
     this.nom="";
     this.adress="";
     this.telephone=undefined;
     this.estclient=false;
     this.modalcommande.hide();
  }
  chercherclient(tel:number){
   
      for(let i=0;i<this.clients.length;i++){
         if(this.clients[i].telephone==tel){
            this.prenom=this.clients[i].prenom;
            this.nom=this.clients[i].nom;
            this.adress=this.clients[i].adress;
            this.telephone=this.clients[i].telephone;
         }
      }
      this.estclient=true;
  }


}
  
