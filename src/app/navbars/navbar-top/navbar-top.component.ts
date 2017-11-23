import { Component, OnInit } from '@angular/core';
import { AuthentificationServiceWeb } from '../../webServiceClients/Authentification/authentification.service';
import { Router } from '@angular/router';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  authentiService: AuthentificationServiceWeb;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

	currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  constructor(private router: Router) { 
    this.authentiService = new AuthentificationServiceWeb();
  }

  ngOnInit() {}
  
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
