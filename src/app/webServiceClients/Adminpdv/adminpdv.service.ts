
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class AdminpdvServiceWeb {

  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/adminpdv?wsdl' ;

  private targetNamespace:string = 'urn:adminpdvwsdl' ;

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


  public deconnectpdv(idpdv: number): Promise<any>  {
    var method:string = 'deconnectpdv';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['deconnectpdv xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'deconnectpdvResponse').then(response=>{
        var reponse = JSON.parse(response['deconnectpdvResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public autoriservoirdepot(idpdv: number, estautoriser: number): Promise<any>  {
    var method:string = 'autoriservoirdepot';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv, estautoriser: estautoriser};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['autoriservoirdepot xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'autoriservoirdepotResponse').then(response=>{
        var reponse = JSON.parse(response['autoriservoirdepotResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public detailperformancepdv(type: string, idpdv: number): Promise<any>  {
    var method:string = 'detailperformancepdv';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type, idpdv: idpdv};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['detailperformancepdv xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'detailperformancepdvResponse').then(response=>{
        var reponse = JSON.parse(response['detailperformancepdvResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }


  public historiquereclamation(type : string): Promise<any>  {
    var method:string = 'historiquereclamation';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['historiquereclamation xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'historiquereclamationResponse').then(response=>{
        var reponse = JSON.parse(response['historiquereclamationResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }


  public listuserpdv(type : string): Promise<any>  {
    var method:string = 'listuserpdv';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listuserpdv xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listuserpdvResponse').then(response=>{
        var reponse = JSON.parse(response['listuserpdvResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }


  public modifypdv( idpdv: number, modifydata: string): Promise<any>  {
    var method:string = 'modifypdv';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv, modifydata: modifydata} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['modifypdv xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'modifypdvResponse').then(response=>{
        var reponse = JSON.parse(response['modifypdvResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public bilandeposit(type : string): Promise<any>  {
    var method:string = 'bilandeposit';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['bilandeposit xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'bilandepositResponse').then(response=>{
        var reponse = JSON.parse(response['bilandepositResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }


  public nombredereclamationpdvvente(type : string): Promise<any>  {
    var method:string = 'nombredereclamationpdvvente';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['nombredereclamationpdvvente xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'nombredereclamationpdvventeResponse').then(response=>{
        var reponse = JSON.parse(response['nombredereclamationpdvventeResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public performancepdv(type : string): Promise<any>  {
    var method:string = 'performancepdv';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['performancepdv xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'performancepdvResponse').then(response=>{
        var reponse = JSON.parse(response['performancepdvResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public demandeRetrait(montant : string): Promise<any>  {
    var method:string = 'demandeRetrait';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, montant: montant} ;
    var params:{}[] = [] ;
    params["token"] = this.token ;
    params["montant"] = montant ;
//    params["params"] = reEspParams ;

    parameters['demandeRetrait xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'demandeRetraitResponse').then(response=>{
        var reponse = JSON.parse(response['demandeRetraitResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }



  public notifications(type : string): Promise<any>  {
    var method:string = 'notifications';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['notifications xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'notificationsResponse').then(response=>{
        var reponse = JSON.parse(response['notificationsResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  private envelopeBuilder(requestBody:string):string {

      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
