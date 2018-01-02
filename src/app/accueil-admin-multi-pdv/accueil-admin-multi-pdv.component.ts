import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-admin-multi-pdv',
  templateUrl: './accueil-admin-multi-pdv.component.html',
  styleUrls: ['./accueil-admin-multi-pdv.component.css']
})
export class AccueilAdminMultiPdvComponent implements OnInit {

  autoriserpourcettefonctionnalie: boolean = false;
  constructor() { }

  ngOnInit() {
    console.log(JSON.parse(sessionStorage.getItem('currentUser')));
    if( JSON.parse(sessionStorage.getItem('currentUser')).firstuse==null && JSON.parse(sessionStorage.getItem('currentUser')).prenom=='ABDAH' && JSON.parse(sessionStorage.getItem('currentUser')).telephone=='22177519869' && JSON.parse(sessionStorage.getItem('currentUser')).accessLevel==1 ) {
      this.autoriserpourcettefonctionnalie = true;
    }
    else if( JSON.parse(sessionStorage.getItem('currentUser')).firstuse==null && JSON.parse(sessionStorage.getItem('currentUser')).prenom=='assane' && JSON.parse(sessionStorage.getItem('currentUser')).accessLevel==1 ) {
      this.autoriserpourcettefonctionnalie = true;
    }
  }

}
