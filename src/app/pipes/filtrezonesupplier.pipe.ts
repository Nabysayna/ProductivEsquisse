import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtrezonesupplier'
})
export class FiltrezonesupplierPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  row.article.zone.toLowerCase()==filtre.toLowerCase() } );
    }
    return dataTab ;
  }

}
