import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtredateparjour'
})
export class FiltredateparjourPipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
    if (filtre){
	    return _.filter(dataTab, row=>{ return  row.dateajout.date.split(" ",2)[0] == filtre } );
    }
    return dataTab ;
  }

}
