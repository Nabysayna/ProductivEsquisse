import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class WizallWebService {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/wizall?wsdl' ;
  private targetNamespace:string = 'urn:wizallwsdl' ;

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

  public intouchCashin(frommsisdn : string, tomsisdn : string, amount : number): Promise<any>  {
    var method:string = 'intouchCashin';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, frommsisdn: frommsisdn, tomsisdn: tomsisdn, amount: amount} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['intouchCashin xmlns="urn:wizallwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'intouchCashinResponse').then(response=>{
        var reponse:any = JSON.parse(response['intouchCashinResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public intouchCashout(agentmsisdn : string, usermsisdn : string, amount : number): Promise<any>  {
    var method:string = 'intouchCashout';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, agentmsisdn: agentmsisdn, usermsisdn: usermsisdn, amount: amount} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['intouchCashout xmlns="urn:wizallwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'intouchCashoutResponse').then(response=>{
        var reponse:any = JSON.parse(response['intouchCashoutResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public intouchPayerFactureSde(montant : number, reference_client : number, reference_facture : number): Promise<any>  {
    var method:string = 'intouchPayerFactureSde';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, montant: montant, reference_client: reference_client, reference_facture: reference_facture} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['intouchPayerFactureSde xmlns="urn:wizallwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'intouchPayerFactureSdeResponse').then(response=>{
        var reponse:any = JSON.parse(response['intouchPayerFactureSdeResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public intouchRecupereFactureSde(reference_client : number): Promise<any>  {
    var method:string = 'intouchRecupereFactureSde';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, reference_client: reference_client} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['intouchRecupereFactureSde xmlns="urn:wizallwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'intouchRecupereFactureSdeResponse').then(response=>{
        var reponse:any = JSON.parse(response['intouchRecupereFactureSdeResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public intouchPayerFactureSenelec(montant : number, police : string, numfacture : string): Promise<any>  {
    var method:string = 'intouchPayerFactureSenelec';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, montant: montant, police: police, numfacture: numfacture} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['intouchPayerFactureSenelec xmlns="urn:wizallwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'intouchPayerFactureSenelecResponse').then(response=>{
        var reponse:any = JSON.parse(response['intouchPayerFactureSenelecResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public intouchRecupereFactureSenelec(police : string): Promise<any>  {
    var method:string = 'intouchRecupereFactureSenelec';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, police: police} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['intouchRecupereFactureSenelec xmlns="urn:wizallwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'intouchRecupereFactureSenelecResponse').then(response=>{
        var reponse:any = JSON.parse(response['intouchRecupereFactureSenelecResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }


  private envelopeBuilder(requestBody:string):string {
    return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }

}
