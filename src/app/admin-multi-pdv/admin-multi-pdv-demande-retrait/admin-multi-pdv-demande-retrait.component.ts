import { Component, OnInit } from '@angular/core';

import { AdminmultipdvDemanderetrait }    from '../../models/adminmultipdv-demanderetrait';
import { AdminmultipdvServiceWeb } from '../../webServiceClients/Adminmultipdv/adminmultipdv.service';
import {log} from "util";


@Component({
  selector: 'app-admin-multi-pdv-demande-retrait',
  templateUrl: './admin-multi-pdv-demande-retrait.component.html',
  styleUrls: ['./admin-multi-pdv-demande-retrait.component.css']
})
export class AdminmultipdvDemandeRetraitComponent implements OnInit {

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "datedemanderetrait";
    public sortOrder = "desc";

    public adminmultipdvDemanderetrait: AdminmultipdvDemanderetrait[];
    loading = false ;

  constructor(private adminmultipdvServiceWeb: AdminmultipdvServiceWeb) { }

  ngOnInit() {
    this.loading = true ;
    this.adminmultipdvServiceWeb.demanderetraitfond('azrrtt').then(adminmultipdvServiceWebList => {
      this.adminmultipdvDemanderetrait = adminmultipdvServiceWebList.map(function (elt) {
        return {
          adresse:JSON.parse(elt.adresse).address,
          agent:elt.agent,
          datedemanderetrait:elt.datedemanderetrait,
          etatdemande:elt.etatdemande,
          iddemanderetrait:elt.iddemanderetrait,
          montantdemande:elt.montantdemande,
          telephone:elt.telephone,
        }
      });
    });
  }

  public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.datedemanderetrait.length;
    }

    validretrait(iddemanderetrait:number){
      this.loading = true ;
      this.adminmultipdvServiceWeb.validerretrait('azrrtt', iddemanderetrait).then(adminmultipdvServiceWebList => {
        this.adminmultipdvServiceWeb.demanderetraitfond('azrrtt').then(adminmultipdvServiceWebList => {
          this.adminmultipdvDemanderetrait = adminmultipdvServiceWebList.map(function (elt) {
            return {
              adresse:JSON.parse(elt.adresse).address,
              agent:elt.agent,
              datedemanderetrait:elt.datedemanderetrait,
              etatdemande:elt.etatdemande,
              iddemanderetrait:elt.iddemanderetrait,
              montantdemande:elt.montantdemande,
              telephone:elt.telephone,
            }
          });
        });

        this.loading = false ;
      });
    }

}
