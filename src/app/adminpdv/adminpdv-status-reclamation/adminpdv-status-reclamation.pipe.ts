import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterAdminpdvStatusReclamation"
})
export class AdminpdvStatusReclamationPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
			    return _.filter(array, row=>{ return  (row.datereclamation.toLowerCase().indexOf(query.toLowerCase())>-1 || row.adminpdv.toLowerCase().indexOf(query.toLowerCase())>-1 || row.pdv.toLowerCase().indexOf(query.toLowerCase())>-1 || row.telephone.toLowerCase().indexOf(query.toLowerCase())>-1 || row.adresse.toLowerCase().indexOf(query.toLowerCase())>-1 || row.typeservice.toLowerCase().indexOf(query.toLowerCase())>-1 ) } );
        }
        return array;
    }
    
}

