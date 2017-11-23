import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterAdminpdvparametrecompte"
})
export class AdminpdvparametrecomptePipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
			return _.filter(array, row=>{ return  (row.pdv.toLowerCase().indexOf(query.toLowerCase())>-1 || row.login.toLowerCase().indexOf(query.toLowerCase())>-1 || row.adresse.toLowerCase().indexOf(query.toLowerCase())>-1  ) } );
        }
        return array;
    }
}

