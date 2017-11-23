import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'pipeCommande'
})
export class PipeCommandePipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  (row.orderedArticles.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.fullName.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.tel.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.dateCommande.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.montant.toString().indexOf(filtre.toLowerCase())>-1  || row.tel.toString().indexOf(filtre.toLowerCase())>-1) } );
    }
    return dataTab ;
  }

}
