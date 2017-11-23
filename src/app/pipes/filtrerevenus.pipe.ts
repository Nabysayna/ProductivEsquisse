import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";


@Pipe({
  name: 'filtrerevenus'
})
export class FiltrerevenusPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  (row.date.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.libelle.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.service.toLowerCase().indexOf(filtre.toLowerCase())>-1 ) } );
    }
    return dataTab ;
  }

}
