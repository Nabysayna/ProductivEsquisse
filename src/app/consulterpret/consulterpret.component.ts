import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';

import * as sha1 from 'js-sha1';
import * as _ from "lodash";

//import {ConsulterpretServiceWeb, Consulterpret} from '../webServiceClients/consulterpret/consulterpret.service';



@Component({
  selector: 'app-consulterpret',
  templateUrl: './consulterpret.component.html',
  styleUrls: ['./consulterpret.component.css']
})
export class ConsulterpretComponent implements OnInit {

	 //  public consulterpret:Consulterpret[];
//  	 private consulterpretServiceWeb = new ConsulterpretServiceWeb;
	  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
	  loading = false ;
	  montantconsulter:number;

  constructor(
     private location: Location,
  	 private route:ActivatedRoute) { }

  ngOnInit() {

    }

}
