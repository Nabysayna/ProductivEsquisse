import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";


@Pipe({
  name: 'filtreportefeuille'
})
export class FiltreportefeuillePipe implements PipeTransform {

   transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  (row.nom.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.prenom.toLowerCase().indexOf(filtre.toLowerCase())>-1 ) } );
    }
    return dataTab ;
  }

}
