import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class ExpressoCashWebService {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/expressocash?wsdl' ;
   private targetNamespace:string = 'urn:expressocashwsdl' ;

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

  public cashin(transactionID: string, destination: string, amount: string, purposeOfTransfer: string, externaldata1: string, externaldata2: string, clientID: string, clientPassword: string, hashValue: string): Promise<any>  {
    var method:string = 'cashin';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, transactionID: transactionID, destination: destination, amount: amount, purposeOfTransfer: purposeOfTransfer, externaldata1: externaldata1, externaldata2: externaldata2, clientID: clientID, clientPassword: clientPassword, hashValue: hashValue};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['cashin xmlns="urn:expressocashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'cashinResponse').then(response=>{
        var reponse:any = JSON.parse(response['cashinResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public cashout(transactionID: string, customer: string, amount: string, purposeOfTransfer: string, externaldata1: string, externaldata2: string, clientID: string, clientPassword: string, hashValue: string): Promise<any>  {
    var method:string = 'cashout';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, transactionID: transactionID, customer: customer, amount: amount, purposeOfTransfer: purposeOfTransfer, externaldata1: externaldata1, externaldata2: externaldata2, clientID: clientID, clientPassword: clientPassword, hashValue: hashValue};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['cashout xmlns="urn:expressocashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'cashoutResponse').then(response=>{
        var reponse:any = JSON.parse(response['cashoutResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public topup(transactionID: string, destination: string, amount: string, purposeOfTransfer: string, externaldata1: string, externaldata2: string, clientID: string, clientPassword: string, hashValue: string): Promise<any>  {
    var method:string = 'topup';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, transactionID: transactionID, destination: destination, amount: amount, purposeOfTransfer: purposeOfTransfer, externaldata1: externaldata1, externaldata2: externaldata2, clientID: clientID, clientPassword: clientPassword, hashValue: hashValue};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['topup xmlns="urn:expressocashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'topupResponse').then(response=>{
        var reponse:any = JSON.parse(response['topupResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public checkbalance(clientID: string, clientPassword: string, hashValue: string): Promise<any>  {
    var method:string = 'checkbalance';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, clientID: clientID, clientPassword: clientPassword, hashValue: hashValue} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['checkbalance xmlns="urn:expressocashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'checkbalanceResponse').then(response=>{
        var reponse:any = JSON.parse(response['checkbalanceResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }



  private envelopeBuilder(requestBody:string):string {
    return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
