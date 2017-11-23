import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtreoperateurs'
})
export class FiltreoperateursPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  (row.prenom.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.nom.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.tel.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.adr.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.qualification.toLowerCase().indexOf(filtre.toLowerCase())>-1    ) } );
    }
    return dataTab ;
  }
}
