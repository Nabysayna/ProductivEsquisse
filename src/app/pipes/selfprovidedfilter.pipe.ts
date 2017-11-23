import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'selfprovidedfilter'
})
export class SelfprovidedfilterPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  (row.pourvoyeur==filtre) } );
    }
    return dataTab ;
  }

}
