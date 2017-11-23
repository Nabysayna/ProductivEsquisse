import { Component, OnInit, Input } from '@angular/core';

import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';


@Component({
  selector: 'app-geomap-component',
  templateUrl: './geomap-component.component.html',
  styleUrls: ['./geomap-component.component.css']
})
export class GeomapComponentComponent implements OnInit {

  @Input() markers: { lat: number; lng: number; label?: string; title?: string; content?: string; }[];
  @Input() centermap: {lat:number, lng:number, zoom:number};


  loading = false ;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    console.log(this.markers);    
  	console.log(this.centermap);    
  }
}