
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

export class PostCashResponse{
  errorCode: number ;
  errorMessage: string ;
  result: number ;
  commission: number ;
  montant_facture: number ;
  transaction: string ;
  montant_facial: number ;
  montant_reel: number ;
}

@Injectable()
export class PostCashServiceWeb {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/postcash?wsdl' ;
  private targetNamespace:string = 'urn:postcashwsdl' ;

  public responseJso : any ;
  public resp : string ;

  private soapService:SoapService;

  constructor() {
        this.soapService = new SoapService();

        this.soapService.setServicePort(this.servicePort) ;
        this.soapService.setServicePath(this.servicePath);
        this.soapService.setServiceUrl(this.servicePort+this.servicePath);
        this.soapService.setTargetNamespace(this.targetNamespace);

        this.soapService.envelopeBuilder = this.envelopeBuilder;
        this.soapService.jsoResponseHandler = (response:{}) => { this.responseJso =response ; };
        this.soapService.localNameMode = true;
  }

  public rechargerEspece(api : number, token : string, tel_destinataire : number, montant : string) : Promise<PostCashResponse> {

      var method:string = 'rechargementespece';
      var parameters:{}[] = [];

      var reEspParams = {api:api, token:token, tel_destinataire:tel_destinataire, montant:montant} ;
      var params:{}[] = [] ; params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['rechargementespece xmlns="urn:postcashwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'rechargementespeceResponse').then(response=>{
        var postCashResponse:PostCashResponse = {
            errorCode:JSON.parse(response["rechargementespeceResponse"]["return"].$).errorCode,
            errorMessage:JSON.parse(response["rechargementespeceResponse"]["return"].$).errorMessage,
            result:JSON.parse(response["rechargementespeceResponse"]["return"].$).result,
            commission:JSON.parse(response["rechargementespeceResponse"]["return"].$).commission,
            montant_facture:JSON.parse(response["rechargementespeceResponse"]["return"].$).montant_facture,
            transaction:JSON.parse(response["rechargementespeceResponse"]["return"].$).transaction,
            montant_facial:JSON.parse(response["rechargementespeceResponse"]["return"].$).montant_facial,
            montant_reel:JSON.parse(response["rechargementespeceResponse"]["return"].$).montant_reel
        } ;

        console.log("Postcash a répondu : "+JSON.stringify(postCashResponse) );
        resolve(postCashResponse) ;
        }) ;
      });
  }

  public retraitespece(api : number, token : string, code_validation : number, tel_destinataire : number, montant : string) : Promise<PostCashResponse> {

      var method:string = 'retraitespece';
      var parameters:{}[] = [];
      var reEspParams = {api:api, token:token, code_validation:code_validation, tel_destinataire:tel_destinataire , montant:montant} ;
      var params:{}[] = [] ; params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['retraitespece xmlns="urn:postcashwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'retraitespeceResponse').then(response=>{
        var postCashResponse:PostCashResponse = {
            errorCode:JSON.parse(response["retraitespeceResponse"]["return"].$).errorCode,
            errorMessage:JSON.parse(response["retraitespeceResponse"]["return"].$).errorMessage,
            result:JSON.parse(response["retraitespeceResponse"]["return"].$).result,
            commission:JSON.parse(response["retraitespeceResponse"]["return"].$).commission,
            montant_facture:JSON.parse(response["retraitespeceResponse"]["return"].$).montant_facture,
            transaction:JSON.parse(response["retraitespeceResponse"]["return"].$).transaction,
            montant_facial:JSON.parse(response["retraitespeceResponse"]["return"].$).montant_facial,
            montant_reel:JSON.parse(response["retraitespeceResponse"]["return"].$).montant_reel
        } ;

        console.log("Postcash a répondu : "+JSON.stringify(postCashResponse) );
        resolve(postCashResponse) ;
        }) ;
      });
  }

  public achatcodewoyofal(api : number, token : string, montant : number, compteur : string) : Promise<PostCashResponse> {

      var method:string = 'achatcodewoyofal';
      var parameters:{}[] = [];
      var reEspParams = {api:api, token:token, montant:montant, compteur:compteur} ;
      var params:{}[] = [] ; params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['achatcodewoyofal xmlns="urn:postcashwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'achatcodewoyofalResponse').then(response=>{
        var postCashResponse:PostCashResponse = {
            errorCode:JSON.parse(response["achatcodewoyofalResponse"]["return"].$).errorCode,
            errorMessage:JSON.parse(response["achatcodewoyofalResponse"]["return"].$).errorMessage,
            result:JSON.parse(response["achatcodewoyofalResponse"]["return"].$).result,
            commission:JSON.parse(response["achatcodewoyofalResponse"]["return"].$).commission,
            montant_facture:JSON.parse(response["achatcodewoyofalResponse"]["return"].$).montant_facture,
            transaction:JSON.parse(response["achatcodewoyofalResponse"]["return"].$).transaction,
            montant_facial:JSON.parse(response["achatcodewoyofalResponse"]["return"].$).montant_facial,
            montant_reel:JSON.parse(response["achatcodewoyofalResponse"]["return"].$).montant_reel
        } ;

        console.log("Postcash a répondu : "+JSON.stringify(postCashResponse) );
        resolve(postCashResponse) ;
        }) ;
      });
  }

  public reglementsenelec(api : number, token : string, police : string, num_facture : string, montant : number) : Promise<PostCashResponse> {

      var method:string = 'reglementsenelec';
      var parameters:{}[] = [];
      var reEspParams = {api:api, token:token, police:police, num_facture:num_facture, montant:montant} ;
      var params:{}[] = [] ; params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['reglementsenelec xmlns="urn:postcashwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'reglementsenelecResponse').then(response=>{
        var postCashResponse:PostCashResponse = {
            errorCode:JSON.parse(response["reglementsenelecResponse"]["return"].$).errorCode,
            errorMessage:JSON.parse(response["reglementsenelecResponse"]["return"].$).errorMessage,
            result:JSON.parse(response["reglementsenelecResponse"]["return"].$).result,
            commission:JSON.parse(response["reglementsenelecResponse"]["return"].$).commission,
            montant_facture:JSON.parse(response["reglementsenelecResponse"]["return"].$).montant_facture,
            transaction:JSON.parse(response["reglementsenelecResponse"]["return"].$).transaction,
            montant_facial:JSON.parse(response["reglementsenelecResponse"]["return"].$).montant_facial,
            montant_reel:JSON.parse(response["reglementsenelecResponse"]["return"].$).montant_reel
        } ;

        console.log("Postcash a répondu : "+JSON.stringify(postCashResponse) );
        resolve(postCashResponse) ;
        }) ;
      });
  }

  public achatjula(api : number, token : string, mt_carte : string, nb_carte : string) : Promise<PostCashResponse> {

      var method:string = 'achatjula';
      var parameters:{}[] = [];
      var reEspParams = {api:api, token:token, mt_carte:mt_carte, nb_carte:nb_carte} ;
      var params:{}[] = [] ; params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['achatjula xmlns="urn:postcashwsdl#"'] = params;

        this.soapService.post(method, parameters, 'achatjulaResponse').then(response=>{
        var postCashResponse:PostCashResponse = {
            errorCode:JSON.parse(response["achatjulaResponse"]["return"].$).errorCode,
            errorMessage:JSON.parse(response["achatjulaResponse"]["return"].$).errorMessage,
            result:JSON.parse(response["achatjulaResponse"]["return"].$).result,
            commission:JSON.parse(response["achatjulaResponse"]["return"].$).commission,
            montant_facture:JSON.parse(response["achatjulaResponse"]["return"].$).montant_facture,
            transaction:JSON.parse(response["achatjulaResponse"]["return"].$).transaction,
            montant_facial:JSON.parse(response["achatjulaResponse"]["return"].$).montant_facial,
            montant_reel:JSON.parse(response["achatjulaResponse"]["return"].$).montant_reel
        } ;

        console.log("Postcash a répondu : "+JSON.stringify(postCashResponse) );
        resolve(postCashResponse) ;
        }) ;
      });
  }

  public achatcredittelephonique(api : number, token : string, numero_a_recharger : string, montant : string) : Promise<PostCashResponse> {
      var method:string = 'achatcredittelephonique';
      var parameters:{}[] = [];
      var reEspParams = { api:api, token:token, numero_a_recharger:numero_a_recharger, montant:montant } ;
      var params:{}[] = [] ; params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['achatcredittelephonique xmlns="urn:postcashwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'achatcredittelephoniqueResponse').then(response=>{
        var postCashResponse:PostCashResponse = {
            errorCode:JSON.parse(response["achatcredittelephoniqueResponse"]["return"].$).errorCode,
            errorMessage:JSON.parse(response["achatcredittelephoniqueResponse"]["return"].$).errorMessage,
            result:JSON.parse(response["achatcredittelephoniqueResponse"]["return"].$).result,
            commission:JSON.parse(response["achatcredittelephoniqueResponse"]["return"].$).commission,
            montant_facture:JSON.parse(response["achatcredittelephoniqueResponse"]["return"].$).montant_facture,
            transaction:JSON.parse(response["achatcredittelephoniqueResponse"]["return"].$).transaction,
            montant_facial:JSON.parse(response["achatcredittelephoniqueResponse"]["return"].$).montant_facial,
            montant_reel:JSON.parse(response["achatcredittelephoniqueResponse"]["return"].$).montant_reel
        } ;

        console.log("Postcash a répondu : "+JSON.stringify(postCashResponse) );
        resolve(postCashResponse) ;
        }) ;
      });
  }


  public setParameters( api : number, token : string, tel_destinataire : number, montant : string ):{}[] {
      var parameters:{}[] = [] ;
      var reEspParams = {api:api, token:token, tel_destinataire:tel_destinataire, montant:montant} ;
      console.log("Recharge infos "+reEspParams.tel_destinataire+" Mot de pass "+reEspParams.montant);
      parameters["params"] = reEspParams ;

      return parameters ;
  }

  private envelopeBuilder(requestBody:string):string {

      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
