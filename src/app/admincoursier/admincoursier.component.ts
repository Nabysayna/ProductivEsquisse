import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }  from '@angular/common';

import { EcomServiceWeb, Commande, Coursier } from '../webServiceClients/ecom/ecom.service';
import * as sha1 from 'js-sha1';
import * as _ from "lodash";



@Component({
  selector: 'app-admincoursier',
  templateUrl: './admincoursier.component.html',
  styleUrls: ['./admincoursier.component.css']
})
export class AdmincoursierComponent implements OnInit {

	commandearecup:Commande[];
	commandealivrer:Commande[];
	coursier : any ;
	coursiers : Coursier[] ;
	ecomCaller: EcomServiceWeb = new EcomServiceWeb();
	loading = false ;
	listeCommande : Commande[] ;
    mergedTabs = [] ; 
    souszone = "" ;
	token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
	filtre="";

	zones : string[] =  [] ;
	zone : string ;
	nom = "nom" ;
	asc = "asc" ;

	checkerFromSupp : any[] =[] ;
	checkerToPdR : any[] =[];

	constructor(
			   private location: Location,
	     private route:ActivatedRoute,
		     private router: Router) { }

	ngOnInit(){
		this.loading = true ;
		this.ecomCaller.listerCoursier(this.token).then( response =>
		  {
		    this.loading = false ;
//		    this.coursiers = response; 
			console.log(response) ;
		  });     

	}


/** Assigner récupèration depuis fournisseur */

	assignerfourn(){
	    this.loading = true ;
		let requestedValue = {token:this.token, type:"fromSuppliers", detail:this.checkerFromSupp, coursier:this.coursier } ;

		console.log( "Request parameters :"+JSON.stringify(requestedValue) ) ;
		this.ecomCaller.assignerCourse(requestedValue).then( response =>
		  {
		  	console.log( "Réponse post Assignation "+response ) ;
		    this.loading = false ;
		  }); 
	}


/** Assigner livraison vers point de récupèration */

	assignerpdr(){
	    this.loading = true ;
		let requestedValue = {token:this.token, type:"ToPdR", detail:this.checkerToPdR, coursier:this.coursier } ;

		console.log( "Request parameters :"+JSON.stringify(requestedValue) ) ;
		this.ecomCaller.assignerCourse(requestedValue).then( response =>
		  {
		  	console.log( "Réponse post Assignation "+response ) ;
		    this.loading = false ;
		  }); 
	}

	checkThisCmdFromSupp( isChecked:boolean, cmdId:number, artcleId:number, article:any ){
		if(isChecked){
			this.checkerFromSupp.push( {idCmd :cmdId, idArt :artcleId, art :article,  isChecked : isChecked} ) ;
		}else
		if ( _.find( this.checkerFromSupp, { 'idCmd': cmdId, 'idArt':artcleId } ) ) 
			this.checkerFromSupp = _.filter( this.checkerFromSupp, function(o) { return (o.idCmd!=cmdId || o.idArt!=artcleId) } );
	}

	checkThisCmdToPdR( isChecked:boolean, cmdId:number, cmd:any ){
		if(isChecked){
			this.checkerToPdR.push( {idCmd :cmdId, cmd :cmd,  isChecked : isChecked} ) ;
		}else
		if ( _.find( this.checkerToPdR, { 'idCmd': cmdId } ) ) 
			this.checkerToPdR = _.filter( this.checkerToPdR, function(o) { return o.idCmd!=cmdId } );
	}



/** Commandes à récuperer chez les fournisseur */

	chargerCommandesDeliver(typeListe : string){
		this.loading = true ;
		this.ecomCaller.listerCommandes(this.token, typeListe).then( response =>
		  {

		    this.commandealivrer = JSON.parse(response) ;
		    for(var i =  this.commandealivrer.length - 1; i >= 0; i--){
		    	let orderedarticles = JSON.parse(this.commandealivrer[i].orderedArticles) ;
				console.log(orderedarticles) ;

			    for(var j = orderedarticles.length - 1; j >= 0; j--){ 
			    	this.mergedTabs.push( {cmdid:this.commandealivrer[i].id, fullName:this.commandealivrer[i].fullName, dateCommande:this.commandealivrer[i].dateCommande, tel:this.commandealivrer[i].tel, article : orderedarticles[j]} ) ;
			    }
		    }

		    for(var i =  this.mergedTabs.length - 1; i >= 0; i--){
		    	if( this.zones.indexOf(this.mergedTabs[i].article.zone)==-1 )
			    	this.zones.push(this.mergedTabs[i].article.zone) ;
		    } 

		    this.loading = false ;
		  });     
	}


	getOrderedArticle(orderedArticles){
		return JSON.parse(orderedArticles) ;
	}

	getSousZonesSupplier(){
		let souszones : string[] = [] ;
		if(this.zone){
			if(this.commandealivrer){
			    for(var i =  this.commandealivrer.length - 1; i >= 0; i--){
			    	let orderdArticles = JSON.parse(this.commandealivrer[i].orderedArticles) ;
				    for(var j =  orderdArticles.length - 1; j >= 0; j--){
				    	if(orderdArticles[j].zone==this.zone)
				    		if( souszones.indexOf(orderdArticles[j].souszone)==-1 ){
				    			souszones.push(orderdArticles[j].souszone) ; 
			    		}
					}
				}
			}
		}
		return souszones ;
	}

	getSousZonesRecPoint(){
		let souszones : string[] = [] ;
		if(this.zone){
			if(this.commandearecup){
			    for(var i =  this.commandearecup.length - 1; i >= 0; i--){
			    	if(JSON.parse(this.commandearecup[i].pointderecuperation).zone==this.zone)
			    		if( souszones.indexOf(JSON.parse(this.commandearecup[i].pointderecuperation).souszone)==-1 ){
			    		souszones.push(JSON.parse(this.commandearecup[i].pointderecuperation).souszone) ; 
			    	}
				}
			}
		}
		return souszones ;
	}

/** Commandes à acheminer aux point de récupèration */

	chargerCommandesRecep(typeListe : string){
		this.loading = true ;
		this.ecomCaller.listerCommandes(this.token, typeListe).then( response =>
		  {
		    this.commandearecup = JSON.parse(response) ;
		    let mergedTabs = [] ; 
		    for(var i =  this.commandearecup.length - 1; i >= 0; i--){
		    	mergedTabs = mergedTabs.concat( JSON.parse(this.commandearecup[i].orderedArticles) ) ;
		    	let pdr = JSON.parse(this.commandearecup[i].pointderecuperation) ;
		    	if( this.zones.indexOf(pdr.zone)==-1 )
			    	this.zones.push(pdr.zone) ;
		    }

		    this.loading = false ;
		  });     
	}

	getAdressFournisseur(){
	}

	getAdressLivraison(pointderecuperation){
		return JSON.parse(pointderecuperation).address ;
	}

}


