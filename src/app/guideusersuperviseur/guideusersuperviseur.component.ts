import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';

import * as sha1 from 'js-sha1';
import * as _ from "lodash";


@Component({
  selector: 'app-guideusersuperviseur',
  templateUrl: 'guideusersuperviseur.component.html',
  styleUrls: ['guideusersuperviseur.component.css']
})
export class GuideUserSuperviseurComponent implements OnInit {

   token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
    loading = false ;


  constructor(

     private location: Location,
  	 private route:ActivatedRoute) { }

  ngOnInit() { }

  demandeprt() {  }

}
