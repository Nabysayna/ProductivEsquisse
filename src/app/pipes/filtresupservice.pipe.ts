import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtresupservice'
})
export class FiltresupservicePipe implements PipeTransform {

 transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  (row.services.toLowerCase().indexOf(filtre.toLowerCase())>-1 || row.design.toLowerCase().indexOf(filtre.toLowerCase())>-1) } );
    }
    return dataTab ;
}
}