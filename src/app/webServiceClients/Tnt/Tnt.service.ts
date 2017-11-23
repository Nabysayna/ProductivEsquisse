
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

export class TntResponse{
  id_abonnement: number ;
  prenom: string ;
  nom: string ;
  tel: string ;
  adresse: string ;
  region: string ;
  city: string ;
  cni: string ;
  n_chip : string ;
  n_carte : string ;
  date_abonnement: string ;
  duree : string ;
  id_typeabonnement : string ;
  montant : number ;
  id_operateur : number;
  etat : number ;
  id_activateur: number ;
  date_activation: string;
  etat_reclamation : string;
  datefinactivation : string ;
}


@Injectable()
export class TntServiceWeb {

  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/tnt?wsdl' ;

//  private servicePort:string = 'http://localhost' ;
//  private servicePath:string = '/EsquisseBackEnd/web/invest/tnt?wsdl' ;

  private targetNamespace:string = 'urn:tntwsdl' ;

  public responseJso : any ;
  public resp : string ;
  public responseJsoFWS : TntResponse[] ;

  private soapService:SoapService;

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

  public listAbonnement(token : string) : Promise<TntResponse[]> {

      var method:string = 'listabonnement';
      var parameters:{}[] = [];

      var reEspParams = {token:token} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listabonnement xmlns="urn:tntwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'listabonnementResponse').then(response=>{
          this.responseJsoFWS = JSON.parse(response['listabonnementResponse'].return.$);
          console.log("reponse brute from class attribute "+JSON.stringify(this.responseJsoFWS[0]) ) ;
          resolve(this.responseJsoFWS) ;
        });
      });
  }


  public listeVenteDecods(token : string) : Promise<{}[]> {

      var method:string = 'listdecodeur';
      var parameters:{}[] = [];

      var reEspParams = {token:token} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listdecodeur xmlns="urn:tntwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'listdecodeurResponse').then(response=>{
          this.responseJsoFWS = JSON.parse(response['listdecodeurResponse'].return.$);
          console.log("reponse brute from class attribute "+JSON.stringify(this.responseJsoFWS[0]) ) ;
          resolve(this.responseJsoFWS) ;
        });
      });
  }

  public listerVenteCartes(token : string) : Promise<{}[]> {

      var method:string = 'listcarte';
      var parameters:{}[] = [];

      var reEspParams = {token:token} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listcarte xmlns="urn:tntwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'listcarteResponse').then(response=>{
          this.responseJsoFWS = JSON.parse(response['listcarteResponse'].return.$);
          console.log("reponse brute from class attribute "+JSON.stringify(this.responseJsoFWS[0]) ) ;
          resolve(this.responseJsoFWS) ;
        });
      });
  }


  public checkNumber(token : string, chipOrCardNum: string) : Promise<TntResponse> {

      var method:string = 'verifinumeroabonnement';
      var parameters:{}[] = [];

      var reEspParams = {token:token, numeroCarteChip:chipOrCardNum} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['verifinumeroabonnement xmlns="urn:tntwsdl#"'] = params ;

        this.soapService.post(method, parameters, 'verifinumeroabonnementResponse').then(response=>{

        if (!response['verifinumeroabonnementResponse'].return.$ )
          resolve(new TntResponse()) ;
        this.responseJsoFWS = JSON.parse(response['verifinumeroabonnementResponse'].return.$);
        resolve(this.responseJsoFWS) ;
        });
      });
  }


  public abonner(token:string, prenom:string, nom:string, tel:string, cni:string, numerochip:string, numerocarte:string, duree:number, typedebouquet:number) : Promise<any> {

      var method:string = 'ajoutabonnement';
      var parameters:{}[] = [];
      var montant : number = 0 ;

      if(typedebouquet==1)
        montant = 5000;
      if(typedebouquet==2)
        montant = 3000;
      if(typedebouquet==3)
        montant = 8000;

      montant = duree*montant ;

      var reEspParams = {token:token, prenom:prenom, nom:nom, tel:tel, adresse:'', region:'', city:'', cni:cni, numerochip:numerochip, numerocarte:numerocarte, duree:duree, typedebouquet:typedebouquet, montant:montant} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      console.log("Parameters : "+JSON.stringify(params["params"])) ;
      return new Promise( (resolve, reject) => {
        parameters['ajoutabonnement xmlns="urn:tntwsdl#"'] = params ;
        this.soapService.post(method, parameters, 'ajoutabonnementResponse').then(response=>{
          console.log(reponse ) ;
          var reponse : string = JSON.parse(response['ajoutabonnementResponse'].return.$);
          resolve(reponse) ;
        });
      });
  }


  public vendreDecodeur(token, prenomNewClient, nomNewClient, telNewClient, adresseNewClient, regionNewClient, cniNewClient, nchipNewClient, ncarteNewClient, nbmNewClient, typedebouquet, prix) : Promise<string> {

      var method:string = 'ventedecodeur';
      var parameters:{}[] = [];

      var reEspParams = {token:token, prenom:prenomNewClient, nom:nomNewClient, tel:telNewClient, adresse:adresseNewClient, region:regionNewClient, cni:cniNewClient, numerochip:nchipNewClient, numerocarte:ncarteNewClient, typedebouquet:typedebouquet, prix:prix} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      console.log("Parameters de la vente : "+JSON.stringify(params["params"])) ;
      return new Promise( (resolve, reject) => {
        parameters['ventedecodeur xmlns="urn:tntwsdl#"'] = params ;
        this.soapService.post(method, parameters, 'ventedecodeurResponse').then(response=>{
          var reponse : string = response['ventedecodeurResponse'].return.$;
          //console.log("reponse brute  "+reponse ) ;
          resolve(reponse) ;
        });
      });
  }


  public vendreCarte(token, prenomNewClient, nomNewClient, telNewClient, adresseNewClient, regionNewClient, cniNewClient, ncarteNewClient, prix) : Promise<string> {

      var method:string = 'ventecarte';
      var parameters:{}[] = [];

      var reEspParams = {token:token, prenom:prenomNewClient, nom:nomNewClient, tel:telNewClient, adresse:adresseNewClient, region:regionNewClient, cni:cniNewClient, numerocarte:ncarteNewClient, prix:prix} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      console.log("Parameters de la vente : "+JSON.stringify(params["params"])) ;
      return new Promise( (resolve, reject) => {
        parameters['ventecarte xmlns="urn:tntwsdl#"'] = params ;
        this.soapService.post(method, parameters, 'ventecarteResponse').then(response=>{
          console.log("reponse brute  "+reponse ) ;
          var reponse : string = response['ventecarteResponse'].return.$;
          resolve(reponse) ;
        });
      });
  }


  private envelopeBuilder(requestBody:string):string {
      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }

}
