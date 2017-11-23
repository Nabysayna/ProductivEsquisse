import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueilcommercial',
  templateUrl: './accueilcommercial.component.html',
  styleUrls: ['./accueilcommercial.component.css']
})
export class AccueilcommercialComponent implements OnInit {

	registredAPIs : string [] = ['COMMERCIAL'] ;
  	 authorisedToUseCRM = false ;

  constructor() { }

  ngOnInit() {
  }

}
