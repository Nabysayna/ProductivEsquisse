import { Component, OnInit } from '@angular/core';

import { AdminpdvServiceWeb } from '../../webServiceClients/Adminpdv/adminpdv.service';

@Component({
  selector: 'app-adminpdv-status-reclamation',
  templateUrl: './adminpdv-status-reclamation.component.html',
  styleUrls: ['./adminpdv-status-reclamation.component.css']
})
export class AdminpdvStatusReclamationComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "datereclamation";
  public sortOrder = "asc";

  public adminmultipdvReclamation: any;
  loading = false ;

  constructor(private adminpdvServiceWeb: AdminpdvServiceWeb) { }

  ngOnInit() {
    this.loading = true ;
    this.adminpdvServiceWeb.historiquereclamation('azrrtt').then(adminmultipdvServiceWebList => {
      console.log(adminmultipdvServiceWebList.response);
      this.adminmultipdvReclamation = adminmultipdvServiceWebList.response;
      this.loading = false ;
    });
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.etatreclamation.length;
  }

  getAdress(adresse){
    return JSON.parse(adresse).address ;
  }

}
