import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class PostCashWebService {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/postcash?wsdl' ;
  private targetNamespace:string = 'urn:postcashwsdl' ;

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

  public codevalidation(tel_destinataire : string, montant : string): Promise<any>  {
    var method:string = 'codevalidation';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, tel_destinataire: tel_destinataire, montant: montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['codevalidation xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'codevalidationResponse').then(response=>{
        var reponse:any = JSON.parse(response['codevalidationResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }


  public rechargementespece(tel_destinataire : string, montant : string): Promise<any>  {
    var method:string = 'rechargementespece';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, tel_destinataire: tel_destinataire, montant: montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['rechargementespece xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'rechargementespeceResponse').then(response=>{
        var reponse:any = JSON.parse(response['rechargementespeceResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public retraitespece(code_validation: string, tel_destinataire: string, montant : string): Promise<any>  {
    var method:string = 'retraitespece';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, code_validation: code_validation, tel_destinataire: tel_destinataire, montant: montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['retraitespece xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'retraitespeceResponse').then(response=>{
        var reponse:any = JSON.parse(response['retraitespeceResponse'].return.$);
        resolve(reponse) ;
      });
    });   
  }

  public achatcodewoyofal(montant : string, compteur : string): Promise<any>  {
    var method:string = 'achatcodewoyofal';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, montant: montant, compteur: compteur} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['achatcodewoyofal xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'achatcodewoyofalResponse').then(response=>{
        console.log(response) ;
        if (typeof response['achatcodewoyofalResponse'].return.$ == "undefined"  || response['achatcodewoyofalResponse'].return.$ == null){
          resolve(JSON.stringify({errorCode:"12",errorMessage:"Erreur de connexion au serveur"}) ) ;
        }

        var reponse:any = JSON.parse(response['achatcodewoyofalResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public reglementsenelec(police : string, num_facture : string, montant : any): Promise<any>  {
    var method:string = 'reglementsenelec';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, police: police, num_facture: num_facture,  montant : montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['reglementsenelec xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'reglementsenelecResponse').then(response=>{
        var reponse:any = JSON.parse(response['reglementsenelecResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public detailfacturesenelec(police : string, num_facture : string): Promise<any>  {
    var method:string = 'detailfacturesenelec';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, police: police, num_facture: num_facture} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['detailfacturesenelec xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'detailfacturesenelecResponse').then(response=>{
        var reponse:any = JSON.parse(response['detailfacturesenelecResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public achatjula(mt_carte : string, nb_carte : string): Promise<any>  {
    var method:string = 'achatjula';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, mt_carte: mt_carte, nb_carte: nb_carte} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['achatjula xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'achatjulaResponse').then(response=>{
        var reponse:any = JSON.parse(response['achatjulaResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public achatcredittelephonique(numero_a_recharger : string, montant : string): Promise<any>  {
    var method:string = 'achatcredittelephonique';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, numero_a_recharger: numero_a_recharger, montant: montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['achatcredittelephonique xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'achatcredittelephoniqueResponse').then(response=>{
        var reponse:any = JSON.parse(response['achatcredittelephoniqueResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public rechargerapido(tel_destinataire : string, montant : string, badge : string): Promise<any>  {
    var method:string = 'RechargeBadgeRapido';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, telephone: tel_destinataire, montant: montant, badge: badge} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['RechargeBadgeRapido xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'RechargeBadgeRapidoResponse').then(response=>{

        console.log( response['RechargeBadgeRapidoResponse'].return ) ;
        var reponse:any = JSON.parse(response['RechargeBadgeRapidoResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public payeroolusolar(tel_destinataire : string, numcompte : string, montant : string): Promise<any>  {
    var method:string = 'PaiementOoluSolar';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, tel: tel_destinataire, numcompte: numcompte, mtt: montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['PaiementOoluSolar xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'PaiementOoluSolarResponse').then(response=>{
        console.log(response) ;
        var reponse:any = JSON.parse(response['PaiementOoluSolarResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }


  public histotransactmarchand(date_debut: string, date_fin: string): Promise<any>  {
    var method:string = 'histotransactmarchand';
    var parameters:{}[] = [];
    var reEspParams = {token:this.token, date_debut: date_debut, date_fin: date_fin } ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['histotransactmarchand xmlns="urn:postcashwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'histotransactmarchandResponse').then(response=>{
        var reponse:any = JSON.parse(response['histotransactmarchandResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  private envelopeBuilder(requestBody:string):string {
    return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
