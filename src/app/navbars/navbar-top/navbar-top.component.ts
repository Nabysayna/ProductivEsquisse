import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationServiceWeb } from '../../webServiceClients/Authentification/authentification.service';
import { UtilServiceWeb } from '../../webServiceClients/utils/Util.service' ;

import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  authentiService: AuthentificationServiceWeb;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  message : string ='' ;

	currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  constructor(private router: Router, private utilService : UtilServiceWeb) {
    this.authentiService = new AuthentificationServiceWeb();
  }

  ngOnInit() {
    if( JSON.parse(sessionStorage.getItem('currentUser')).prenom=='ABDAH' && JSON.parse(sessionStorage.getItem('currentUser')).telephone=='22177519869' && JSON.parse(sessionStorage.getItem('currentUser')).accessLevel==1 ) {
      console.log('manager');
    }
    else if( JSON.parse(sessionStorage.getItem('currentUser')).prenom=='assane' && JSON.parse(sessionStorage.getItem('currentUser')).accessLevel==1 ) {
      console.log('dev');
    }
    else{
      this.retrieveAlerteMessage() ;
    }
  }

  retrieveAlerteMessage(){
    var periodicVerifier = setInterval(()=>{
    this.utilService.consulterLanceurDalerte().then(rep =>{
      var donnee=rep._body.trim().toString();
      if (donnee!='-')
        this.message=donnee ;
    });
    },5000);
  }

  deconnexion(){
  	this.authentiService.deconnecter(this.token).then( response => {
  	 if (response==1){
  			sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
        this.router.navigate(['']);
  	 } else
  	 	console.log("Echec deconnexion!") ;

  	 }) ;
  }

}
