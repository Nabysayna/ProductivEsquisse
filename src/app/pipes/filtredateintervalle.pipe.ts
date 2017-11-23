import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filtredateintervalle'
})
export class FiltredateintervallePipe implements PipeTransform {

  transform(dataTab: any[], filtre: string): any {
  	console.log(filtre);
    if (filtre){
	    return _.filter(dataTab, row=>{ return  row.dateajout.date.split(" ",2)[0] >= filtre.split(" ",2)[0] && row.dateajout.date.split(" ",2)[0] <= filtre.split(" ",2)[1] } );
    }
    return dataTab ;
  }

}
