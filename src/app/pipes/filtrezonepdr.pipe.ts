import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtrezonepdr'
})
export class FiltrezonepdrPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  JSON.parse(row.pointderecuperation).zone.toLowerCase()==filtre.toLowerCase() } );
    }
    return dataTab ;
  }


}
