import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationServiceWeb, AuthResponse } from '../webServiceClients/Authentification/authentification.service';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-firstlog',
  templateUrl: './firstlog.component.html',
  styleUrls: ['./firstlog.component.css']
})
export class FirstlogComponent implements OnInit {
  notMatching = false ;
  wrongCurrrentPwd = false ;
  pwdactuel : string ;
  newpwd : string ;
  confirmpdw : string ;

  loading = false ;
  authentiService : AuthentificationServiceWeb ;

  constructor(private router: Router) { 
        this.authentiService = new AuthentificationServiceWeb();
  }

  ngOnInit() {
  }

  modifierPwd(){
  	if (this.confirmpdw==this.newpwd){
    	this.loading = true ;
      this.authentiService.modifierpwdinit( sha1(this.pwdactuel), sha1(this.newpwd) ).then( resp=>
        {
          this.loading = false ;
          if(resp!='badpwd'){
            this.router.navigate(['']); 
          }else{
            this.notMatching=false ;
            this.wrongCurrrentPwd=true ;
            this.pwdactuel = undefined ;
            this.newpwd = undefined ;
            this.confirmpdw = undefined ;
          }
        }); 
    }else{
      this.wrongCurrrentPwd=false ;
      this.notMatching=true ;
      this.pwdactuel = undefined ;
      this.newpwd = undefined ;
      this.confirmpdw = undefined ;
    }
  }

}
