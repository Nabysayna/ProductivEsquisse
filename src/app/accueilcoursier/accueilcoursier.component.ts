import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueilcoursier',
  templateUrl: './accueilcoursier.component.html',
  styleUrls: ['./accueilcoursier.component.css']
})
export class AccueilcoursierComponent implements OnInit {

	 registredAPIs : string [] = ['COURSIER'] ;
  	 authorisedToUseCRM = false ;

  constructor() { }

  ngOnInit() {
  }

}
