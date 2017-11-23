import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';
import {SoldeService} from '../soldecompte/soldeservice';
import {Solde} from '../soldecompte/soldemodels';

@Component({
  selector: 'app-soldecompte',
  templateUrl: './soldecompte.component.html',
  styleUrls: ['./soldecompte.component.css']
})
export class SoldecompteComponent implements OnInit {

	solde:Solde;

  constructor(
  	     private soldeService: SoldeService,
         private location: Location,
         private route:ActivatedRoute,
  	     private router: Router) { }

  ngOnInit():void {
    this.route.params.subscribe( (params : Params) => { 
      this.solde = this.soldeService.getSolde(5);
    });
  }

}
