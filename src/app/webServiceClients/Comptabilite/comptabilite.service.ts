import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class ComptabiliteServiceWeb {

  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/comptapdv?wsdl' ;

//  private servicePort:string = 'http://localhost' ;
//  private servicePath:string = '/EsquisseBackEnd/web/app_dev.php/invest/comptapdv?wsdl' ;


  private targetNamespace:string = 'urn:comptapdvwsdl' ;

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

  public userexploitation(): Promise<any>  {
    var method:string = 'userexploitation';
    var parameters:{}[] = [];
    var reEspParams = {token: this.token} ;
    var params:{}[] = [] ;

    params["params"] = reEspParams;
    parameters['userexploitation xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'userexploitationResponse').then(response=>{
        var reponse  = JSON.parse(response['userexploitationResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public exploitation(idpdv: number, type:string, infotype:string): Promise<any>  {
    var method:string = 'exploitation';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv, type: type, infotype: infotype} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams;

    parameters['exploitation xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'exploitationResponse').then(response=>{
        var reponse  = JSON.parse(response['exploitationResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public exploitationaveccommission(idpdv: number, type:string, infotype:string): Promise<any>  {
    var method:string = 'exploitationaveccommission';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv, type: type, infotype: infotype} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams;

    parameters['exploitationaveccommission xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'exploitationaveccommissionResponse').then(response=>{
        var reponse  = JSON.parse(response['exploitationaveccommissionResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public listevente(idpdv: number): Promise<any>  {
    var method:string = 'listevente';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams;

    parameters['listevente xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listeventeResponse').then(response=>{
        var reponse  = JSON.parse(response['listeventeResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public listecharge(idpdv: number): Promise<any>  {
    var method:string = 'listecharge';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listecharge xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listechargeResponse').then(response=>{
        var reponse  = JSON.parse(response['listechargeResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public ajoutcharge(libelle: string, idpdv: number, service: string, montant: number): Promise<any>  {
    var method:string = 'ajoutcharge';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, libelle: libelle, idpdv: idpdv, service: service, montant: montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['ajoutcharge xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'ajoutchargeResponse').then(response=>{
        var reponse  = JSON.parse(response['ajoutchargeResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public supprimerservice(idsupprimer: number): Promise<any>  {
    var method:string = 'supprimerservice';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idsupprimer: idsupprimer} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['supprimerservice xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'supprimerserviceResponse').then(response=>{
        var reponse  = JSON.parse(response['supprimerserviceResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public modifierservice(service : string, designations : string, idservice : number): Promise<any>  {
    var method:string = 'modifierservice';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, service: service, designations: designations, idservice: idservice} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['modifierservice xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'modifierserviceResponse').then(response=>{
        var reponse  = JSON.parse(response['modifierserviceResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public ajoutservice(nom: string, idpdv: number, designations: string): Promise<any>  {
    var method:string = 'ajoutservice';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, nom: nom, idpdv: idpdv, designations: designations} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['ajoutservice xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'ajoutserviceResponse').then(response=>{
        var reponse  = JSON.parse(response['ajoutserviceResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public approvisionner(idpdv: number, montant: number): Promise<any>  {
    var method:string = 'approvisionner';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv, montant: montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['approvisionner xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'approvisionnerResponse').then(response=>{
        var reponse  = JSON.parse(response['approvisionnerResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }

  public listecaisse(): Promise<any>  {
    var method:string = 'listecaisse';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listecaisse xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listecaisseResponse').then(response=>{
        var reponse  = JSON.parse(response['listecaisseResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public listeservice(idpdv: number): Promise<any>  {
    var method:string = 'listeservice';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listeservice xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listeserviceResponse').then(response=>{
        var reponse  = JSON.parse(response['listeserviceResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public etatcaisse(): Promise<any>  {
    var method:string = 'etatcaisse';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['etatcaisse xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'etatcaisseResponse').then(response=>{
        var reponse  = JSON.parse(response['etatcaisseResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public validerapprovisionn(idcaisse: number): Promise<any>  {
    var method:string = 'validerapprovisionn';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idcaisse: idcaisse} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['validerapprovisionn xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'validerapprovisionnResponse').then(response=>{
        var reponse  = JSON.parse(response['validerapprovisionnResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public listerevenu(idpdv: number): Promise<any>  {
    var method:string = 'listerevenu';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listerevenu xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listerevenuResponse').then(response=>{
        var reponse  = JSON.parse(response['listerevenuResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public listerevenutransfert(idpdv: number): Promise<any>  {
    var method:string = 'listerevenutransfert';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, idpdv: idpdv} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listerevenutransfert xmlns="urn:comptapdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listerevenutransfertResponse').then(response=>{
        var reponse  = JSON.parse(response['listerevenutransfertResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  private envelopeBuilder(requestBody:string):string {
    return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
