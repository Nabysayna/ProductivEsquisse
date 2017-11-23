import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";


@Pipe({
  name: 'filtresuivicommande'
})
export class FiltresuivicommandePipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  (row.noms.toLowerCase().indexOf(filtre.toLowerCase())>-1|| row.prenoms.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.pointderecup.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.mntcommande.toString().toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.detail.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.etat.toLowerCase().indexOf(filtre.toLowerCase())>-1 ) } );
    }
    return dataTab ;
  }

}
