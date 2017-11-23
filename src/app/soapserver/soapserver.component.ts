import { Component, OnInit } from '@angular/core';
import { EcomServiceWeb } from '../webServiceClients/ecom/ecom.service';


@Component({
  selector: 'app-soapserver',
  templateUrl: './soapserver.component.html',
  styleUrls: ['./soapserver.component.css']
})

export class SoapserverComponent implements OnInit {

  public resp : string  ;
  public ecomCaller: EcomServiceWeb;
  public retourWS: {}[] ;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

  constructor() {
        this.ecomCaller = new EcomServiceWeb();
   }

   ngOnInit() {
      this.ecomCaller.listeArticles(this.token, 'catalogue').then( response =>
        {
        this.retourWS = response ;
        console.log("Designation premier article "+this.retourWS)  }); 
   }

}
