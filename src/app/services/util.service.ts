import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class UtilService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  private headers = new Headers();
  private basetoken:any;

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.basetoken = JSON.parse(sessionStorage.getItem('currentUser')).baseToken;
  }

  getZones(){
    let url = this.link+"/util/zone";
    return this._http.get(url)
      .map(res => res.json());
  }

  getSouszones(){
    let url = this.link+"/util/souszone";
    return this._http.get(url)
      .map(res => res.json());
  }

  getSouszoneByZoneByRegion(data:any){
    let url = this.link+"/util/souszonebyzonebyregion";
    let datas = JSON.stringify(data);
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getSouszoneByZone(zone:string){
    let url = this.link+"/util/souszone";
    let datas = JSON.stringify({zone:zone});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getZoneByRegion(region:string){
    let url = this.link+"/util/zone";
    let datas = JSON.stringify({region:region});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getRegion(){
    let url = this.link+"/util/region";
    return this._http.get(url)
      .map(res => res.json());
  }

  recupererInfosCC(){
    let url = this.link+"/apifromsentool/initajoutdeposit";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  demandedeposit(data:any){
    let url = this.link+"/apifromsentool/demndedeposit";
    let datas = JSON.stringify(data);
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listcreditmanager(){
    let url = this.link+"/apifromsentool/listcreditmanager";
    let datas = JSON.stringify({token:this.basetoken, type:'me'});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  valideraacreditmanager(data:any){
    let url = this.link+"/apifromsentool/ajoutcreditmanager";
    let datas = JSON.stringify({token:this.basetoken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getOnePointSuivicc(data:any){
    let url = this.link+"/apiplatform/getdetailonepointsuivisentool";
    let datas = JSON.stringify({token:this.basetoken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getDetailOnePointSuivicc(data:any){
    let url = this.link+"/apiplatform/getdetailonepointsuivicc";
    let datas = JSON.stringify({token:this.basetoken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }




}
