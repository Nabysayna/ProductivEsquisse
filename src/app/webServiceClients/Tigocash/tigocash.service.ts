
import { Injectable }    from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";


@Injectable()
export class TigoCashService {

    private link:string = "http://51.254.200.129/backendprod/horsSentiersBattus/scripts/tc.php";
    private headers:Headers;

    constructor(private _http: Http){
        this.headers = new Headers();
    }

   requerirControllerTC(requete:any): Promise<any>{
        let url = this.link;
        let body='requestParam='+requete;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        return this._http.post( url,body, options).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
    }
    
    

}
