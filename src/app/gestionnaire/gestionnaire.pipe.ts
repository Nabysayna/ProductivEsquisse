import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterAdminpdvGestionnaireservice"
})
export class AdminpdvgestionnaireservicePipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if(query){
			return _.filter(array, row=>{ return  (row.sevice.toLowerCase().indexOf(query.toLowerCase())>-1 ) } );
        }
        return array;
    }
}
