import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-gestionnaire',
  templateUrl: './gestionnaire.component.html',
  styleUrls: ['./gestionnaire.component.css']
})
export class GestionnaireComponent implements OnInit {
  
  public tab=[{"id":"1","service":"poste cash"},{"id":"2","service":"orange money"}];
  public id:string;
  public bool:boolean=false;
  public service:string;
  public montant:Number;
  public filterQueryGestion:any;
  public listgestionnaireoperation: any=this.tab;
  
  constructor() { }
  
  chercher(){
       console.log(this.id);
       if(this.id=='1'){
			this.bool=true;
			this.service=this.tab[0].service;
			this.montant=20000;
			console.log('nice');
        }
        if(this.id=='2'){
            this.bool=true;
			this.service=this.tab[1].service;
			this.montant=15000;
			console.log('nice');

        }
  }

  ngOnInit() {
  }

}
