import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueiladmincoursier',
  templateUrl: './accueiladmincoursier.component.html',
  styleUrls: ['./accueiladmincoursier.component.css']
})
export class AccueiladmincoursierComponent implements OnInit {

	 registredAPIs : string [] = ['ADMIN COURSIER'] ;
  	 authorisedToUseCRM = false ;


  constructor() { }

  ngOnInit() {
  }

}
