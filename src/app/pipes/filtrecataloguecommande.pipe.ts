import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtrecataloguecommande'
})
export class FiltrecataloguecommandePipe implements PipeTransform {

   transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  (row.designation.toLowerCase().indexOf(filtre.toLowerCase())>-1 ) } );
    }
    return dataTab ;
  }


}
