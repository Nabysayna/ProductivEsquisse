
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class UtilServiceWeb {

    private linkalert:string = "http://51.254.200.129/backendprod/horsSentiersBattus/scripts/alerthrower.php";
    private headers:Headers;
  
    private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

    constructor(private _http: Http){
        this.headers = new Headers();
    }

    consulterLanceurDalerte(): Promise<any>{
        let url:string = this.linkalert;

//        let reqPara = JSON.stringify( {requestParam : requete, tokenParam : this.token} ) ;
//        let body='requestParam='+reqPara;
        let body='';
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post( url,body, options).toPromise().then( res => {return res} ).catch(error => {return '-' });
    }


}
