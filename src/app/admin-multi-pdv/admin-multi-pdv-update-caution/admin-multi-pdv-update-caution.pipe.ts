import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterAdminmultipdvUpdateCaution"
})
export class AdminmultipdvUpdateCautionPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
			return _.filter(array, row=>{ return  (row.adminpdv.toLowerCase().indexOf(query.toLowerCase())>-1 || row.telephone.toLowerCase().indexOf(query.toLowerCase())>-1 || row.adresse.toLowerCase().indexOf(query.toLowerCase())>-1  ) } );
        }
        return array;
    }
}

