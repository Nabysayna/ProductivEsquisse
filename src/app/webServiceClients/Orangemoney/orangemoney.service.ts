
import { Injectable }    from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";


@Injectable()
export class OrangeMoneyService {

    private link:string = "http://51.254.200.129/backendprod/horsSentiersBattus/scripts/om.php";
    private link2:string = "http://51.254.200.129/backendprod/horsSentiersBattus/scripts/omlazyresponse.php";
    private headers:Headers;
  
    private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

    constructor(private _http: Http){
        this.headers = new Headers();
    }

   requerirControllerOM(requete:any): Promise<any>{
        let url = this.link;
        let reqPara = JSON.stringify( {requestParam : requete, tokenParam : this.token} ) ;
        let body='requestParam='+reqPara;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        return this._http.post( url,body, options).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
    }
    
     verifierReponseOM(requete:any): Promise<any>{
        let url = this.link2 ;
        let reqPara = JSON.stringify( {requestParam : requete, tokenParam : this.token} ) ;
        let body='requestParam='+reqPara;
        
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        return this._http.post( url,body, options).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
    }

}
