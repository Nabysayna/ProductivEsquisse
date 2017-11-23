import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'suppliedarticles'
})
export class SuppliedarticlesPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter( dataTab, row=>{ return  (row.orderedArticles.indexOf('\"pourvoyeur\":'+filtre+',\"supplied\":0')>-1) } );
    }
    return dataTab ;
  }

}
