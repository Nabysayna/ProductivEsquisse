import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class JoniJoniWebService {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/jonijoni?wsdl' ;
 private targetNamespace:string = 'urn:jonijoniwsdl' ;

  public responseJso : any;
  public resp : string  ;
  private soapService:SoapService;

  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;



  constructor() {
        this.soapService = new SoapService();

        this.soapService.setServicePort(this.servicePort) ;
        this.soapService.setServicePath(this.servicePath);
        this.soapService.setServiceUrl(this.servicePort+this.servicePath);
        this.soapService.setTargetNamespace(this.targetNamespace);

        this.soapService.envelopeBuilder = this.envelopeBuilder;
        this.soapService.jsoResponseHandler = (response:{}) => { this.responseJso = response ; };
        this.soapService.localNameMode = true;
   }

  public cashtocash_getcommissionsttc(type: string): Promise<any>  {
    var method:string = 'cashtocash_getcommissionsttc';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['cashtocash_getcommissionsttc xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'cashtocash_getcommissionsttcResponse').then(response=>{
        var reponse:any = JSON.parse(response['cashtocash_getcommissionsttcResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public cashtocash_sendtransaction(type: string): Promise<any>  {
    var method:string = 'cashtocash_sendtransaction';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['cashtocash_sendtransaction xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'cashtocash_sendtransactionResponse').then(response=>{
        var reponse:any = JSON.parse(response['cashtocash_sendtransactionResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public cashtocash_checktransactioncode(type: string): Promise<any>  {
    var method:string = 'cashtocash_checktransactioncode';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['cashtocash_checktransactioncode xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'cashtocash_checktransactioncodeResponse').then(response=>{
        var reponse:any = JSON.parse(response['cashtocash_checktransactioncodeResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public cashtocash_paytransaction(type: string): Promise<any>  {
    var method:string = 'cashtocash_paytransaction';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['cashtocash_paytransaction xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'cashtocash_paytransactionResponse').then(response=>{
        var reponse:any = JSON.parse(response['cashtocash_paytransactionResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public cashtocash_canceltransaction(type: string): Promise<any>  {
    var method:string = 'cashtocash_canceltransaction';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['cashtocash_canceltransaction xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'cashtocash_canceltransactionResponse').then(response=>{
        var reponse:any = JSON.parse(response['cashtocash_canceltransactionResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public vitfe_getinfocomptevitfe(type: string): Promise<any>  {
    var method:string = 'vitfe_getinfocomptevitfe';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['vitfe_getinfocomptevitfe xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'vitfe_getinfocomptevitfeResponse').then(response=>{
        var reponse:any = JSON.parse(response['vitfe_getinfocomptevitfeResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public vitfe_getcommissionsttcvitfe(type: string): Promise<any>  {
    var method:string = 'vitfe_getcommissionsttcvitfe';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['vitfe_getcommissionsttcvitfe xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'vitfe_getcommissionsttcvitfeResponse').then(response=>{
        var reponse:any = JSON.parse(response['vitfe_getcommissionsttcvitfeResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public vitfe_approcompte(type: string): Promise<any>  {
    var method:string = 'vitfe_approcompte';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['vitfe_approcompte xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'vitfe_approcompteResponse').then(response=>{
        var reponse:any = JSON.parse(response['vitfe_approcompteResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public monetique_getinfocarte(type: string): Promise<any>  {
    var method:string = 'monetique_getinfocarte';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['monetique_getinfocarte xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'monetique_getinfocarteResponse').then(response=>{
        var reponse:any = JSON.parse(response['monetique_getinfocarteResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public monetique_getcommissionsttccarte(type: string): Promise<any>  {
    var method:string = 'monetique_getcommissionsttccarte';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['monetique_getcommissionsttccarte xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'monetique_getcommissionsttccarteResponse').then(response=>{
        var reponse:any = JSON.parse(response['monetique_getcommissionsttccarteResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public monetique_rechargecarte(type: string): Promise<any>  {
    var method:string = 'monetique_rechargecarte';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['monetique_rechargecarte xmlns="urn:jonijoniwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'monetique_rechargecarteResponse').then(response=>{
        var reponse:any = JSON.parse(response['monetique_rechargecarteResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  private envelopeBuilder(requestBody:string):string {
    return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
