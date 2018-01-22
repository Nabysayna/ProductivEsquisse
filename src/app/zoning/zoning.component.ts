import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoning',
  templateUrl: './zoning.component.html',
  styleUrls: ['./zoning.component.css']
})
export class ZoningComponent implements OnInit {

 private jsonData : any[] = [{date:"06-01-2018", admin:"Someone else", tel:"772220594", adresse:"Parcelles, sama gallé", mnt:5000, etat:"réglé"}] ;

  constructor() { }

  ngOnInit() {
  }

}
