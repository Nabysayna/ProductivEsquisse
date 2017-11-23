import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';
import {EnvoiCash} from '../joni-joni-component/jonimodels';
import {EnvoicashService} from '../joni-joni-component/joniservices';
import {PaieCash} from '../joni-joni-component/jonimodels';
import {PaiecashService} from '../joni-joni-component/joniservices';
import {AchatJula} from '../postcash/postmodels';
import {AchatJulaService} from '../postcash/postservices';
import {ReglSenelec} from '../postcash/postmodels';
import {ReglSenelecService} from '../postcash/postservices';
import {AchatCodeWoyofal} from '../postcash/postmodels';
import {AchatCodeWoyofalService} from '../postcash/postservices';


@Component({
  selector: 'app-recus',
  templateUrl: './recus.component.html',
  styleUrls: ['./recus.component.css']
})
export class RecusComponent implements OnInit {

    formvisible = '' ;
    envoiCash:EnvoiCash;
    paieCash:PaieCash;
    achatJula:AchatJula;
    reglSenelec:ReglSenelec;
    achatCodeWoyofal:AchatCodeWoyofal;


  constructor(

     private achatCodeoyofalService: AchatCodeWoyofalService,
     private reglSenelecService: ReglSenelecService,
     private paiecashService: PaiecashService,
     private achatJulaService: AchatJulaService,
  	 private envoicashService: EnvoicashService,
     private location: Location,
  	 private route:ActivatedRoute) {}

  ngOnInit():void {
    this.route.params.subscribe( (params : Params) => {
      this.envoiCash = this.envoicashService.getEnvoicash(1);
    });


    this.route.params.subscribe( (params : Params) => {
      this.paieCash = this.paiecashService.getPaieCash(2);
    });


    this.route.params.subscribe( (params : Params) => {
      this.achatJula = this.achatJulaService.getAchatJula(3);
    });


    this.route.params.subscribe( (params : Params) => {
      this.reglSenelec = this.reglSenelecService.getReglSenelec(4);
    });


    this.route.params.subscribe( (params : Params) => {
      this.achatCodeWoyofal = this.achatCodeoyofalService.getAchatCodeWoyofal(5);
    });

      this.formvisible=this.route.snapshot.params['id'];
  }

}
