import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtresouszonepdr'
})
export class FiltresouszonepdrPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  JSON.parse(row.pointderecuperation).souszone.toLowerCase()==filtre.toLowerCase() } );
    }
    return dataTab ;
  }

}
