import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtresouszonesupplier'
})
export class FiltresouszonesupplierPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  row.article.souszone.toLowerCase()==filtre.toLowerCase() } );
    }
    return dataTab ;
  }

}
