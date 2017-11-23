
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

class Article {
  public id:number;
  public nomImg:string;
  public designation:string;
  public description:string;
  public prix:number;
  public stock:number;
}

export class Commande {
  public id:number;
  public orderedArticles:string;
  public montant:number ;
  public tel:number;
  public pointderecuperation : string ;
  public fullName:string;
  public dateCommande:string;
}

export class Vente {
  public id:number;
  public quantite:number;
  public designation:string;
  public prixUnitaire:number ;
  public tel:number;
  public fullName:string;
  public dateVente:string;
}

export class Coursier{
  public id:number;
  public prenom:string;
  public nom:string;
}


@Injectable()
export class EcomServiceWeb {


    private servicePort:string = 'http://51.254.200.129' ;
    private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/ecommerce?wsdl' ;


  private targetNamespace:string = 'urn:ecommercewsdl' ;

  public responseJso : any ;
  public resp : string ;
  public filtre : string ;
  public responseJsoFWS : Article[] ;

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


  public ajouterArticle(requestedValue:{}) : Promise<string> {

      var method:string = 'ajoutarticle';
      var parameters:{}[] = [];
      var reEspParams = requestedValue ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['ajoutarticle xmlns="urn:ecommercewsdl#"'] = params ;

        this.soapService.post(method, parameters, 'ajoutarticleResponse').then(response=>{
          let wSresponse = response['ajoutarticleResponse'].return.$ ;
          resolve(wSresponse) ;
        });
      });
  }

  public commander(requestedValue:{}) : Promise<string> {
    var method:string = 'ajoutcommande';
    var parameters:{}[] = [];
    var reEspParams = requestedValue ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    return new Promise( (resolve, reject) => {
      parameters['ajoutcommande xmlns="urn:ecommercewsdl#"'] = params ;

      this.soapService.post(method, parameters, 'ajoutcommandeResponse').then(response=>{
        let wSresponse = response['ajoutcommandeResponse'].return.$ ;
        resolve(wSresponse) ;
      });
    });
  }

  public receptionnerCommandes(requestParams:{}) : Promise<string> {
    var method:string = 'receptionnerCommandes';
    var parameters:{}[] = [];
    var reEspParams = requestParams ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    return new Promise( (resolve, reject) => {
      parameters['receptionnerCommandes xmlns="urn:ecommercewsdl#"'] = params ;

      this.soapService.post(method, parameters, 'receptionnerCommandesResponse').then(response=>{
        let wSresponse = response['receptionnerCommandesResponse'].return.$ ;
        resolve(wSresponse) ;
      });
    });
  }


  public supprimerArticle(requestParams:{}) : Promise<string> {
    var method:string = 'supprimerArticle';
    var parameters:{}[] = [];
    var reEspParams = requestParams ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    return new Promise( (resolve, reject) => {
      parameters['supprimerArticle xmlns="urn:ecommercewsdl#"'] = params ;

      this.soapService.post(method, parameters, 'supprimerArticleResponse').then(response=>{
        let wSresponse = response['supprimerArticleResponse'].return.$ ;
        resolve(wSresponse) ;
      });
    });
  }

  public modifierArticle(requestParams:{}) : Promise<string> {
    var method:string = 'modifierArticle';
    var parameters:{}[] = [];
    var reEspParams = requestParams ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    return new Promise( (resolve, reject) => {
      parameters['modifierArticle xmlns="urn:ecommercewsdl#"'] = params ;

      this.soapService.post(method, parameters, 'modifierArticleResponse').then(response=>{
        let wSresponse = response['modifierArticleResponse'].return.$ ;
        resolve(wSresponse) ;
      });
    });
  }


  public assignerCourse(requestedValue:{}) : Promise<string> {
    var method:string = 'assignerCourse';
    var parameters:{}[] = [];
    var reEspParams = requestedValue ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    return new Promise( (resolve, reject) => {
      parameters['ajoutcommande xmlns="urn:ecommercewsdl#"'] = params ;

      this.soapService.post(method, parameters, 'assignerCourseResponse').then(response=>{
        let wSresponse = response['assignerCourseResponse'].return.$ ;
        resolve(wSresponse) ;
      });
    });
  }


  public prendreCommande(requestParams:{}) : Promise<string> {
    var method:string = 'prendreCommande';
    var parameters:{}[] = [];
    var reEspParams = requestParams ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    return new Promise( (resolve, reject) => {
      parameters['prendreCommande xmlns="urn:ecommercewsdl#"'] = params ;

      this.soapService.post(method, parameters, 'prendreCommandeResponse').then(response=>{
        let wSresponse = response['prendreCommandeResponse'].return.$ ;
        resolve(wSresponse) ;
      });
    });
  }


  public fournirCommandes(requestParams:{}) : Promise<string> {
    var method:string = 'fournirCommandes';
    var parameters:{}[] = [];
    var reEspParams = requestParams ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    return new Promise( (resolve, reject) => {
      parameters['fournirCommandes xmlns="urn:ecommercewsdl#"'] = params ;

      this.soapService.post(method, parameters, 'fournirCommandesResponse').then(response=>{
        let wSresponse = response['fournirCommandesResponse'].return.$ ;
        resolve(wSresponse) ;
      });
    });
  }


  public listeArticles(token : string, type:string) : Promise<Article[]> {

      var method:string = 'listerarticle';
      var parameters:{}[] = [];

      var reEspParams = {token:token, type:type} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listerarticle xmlns="urn:ecommercewsdl#"'] = params ;

        this.soapService.post(method, parameters, 'listerarticleResponse').then(response=>{
          this.responseJsoFWS = JSON.parse(response['listerarticleResponse'].return.$);
          resolve(this.responseJsoFWS) ;
        });
      });
  }

  public listerCategorie(token : string) : Promise<string[]> {

      var method:string = 'listerCategorie';
      var parameters:{}[] = [];

      var reEspParams = {token:token} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listerCategorie xmlns="urn:ecommercewsdl#"'] = params ;

        this.soapService.post(method, parameters, 'listerCategorieResponse').then(response=>{
          this.responseJsoFWS = JSON.parse(response['listerCategorieResponse'].return.$);
          resolve(this.responseJsoFWS) ;
        });
      });
  }




  public listerCommandes(token : string, typeListe : string) : Promise<any> {

      var method:string = 'listercommande';
      var parameters:{}[] = [];
      var reEspParams = { token:token, typeListe:typeListe } ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listercommande xmlns="urn:ecommercewsdl#"'] = params ;
        this.soapService.post(method, parameters, 'listercommandeResponse').then(response=>{
          let responseJsoFWS = response['listercommandeResponse'].return.$;
          resolve(responseJsoFWS) ;
        });
      });
  }

  public listerCoursier(token : string) : Promise<Coursier[]> {

      var method:string = 'listerCoursier';
      var parameters:{}[] = [];
      var reEspParams = { token:token} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listerCoursier xmlns="urn:ecommercewsdl#"'] = params ;
        this.soapService.post(method, parameters, 'listerCoursierResponse').then(response=>{
          let responseJsoFWS : Coursier[] = JSON.parse(response['listerCoursierResponse'].return.$);
          resolve(responseJsoFWS) ;
        });
      });
  }


  public listerVentes(token : string) : Promise<any[]> {

      var method:string = 'listervente';
      var parameters:{}[] = [];
      var reEspParams = { token:token } ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listervente xmlns="urn:ecommercewsdl#"'] = params ;
        this.soapService.post(method, parameters, 'listerventeResponse').then(response=>{
          let responseJsoFWS = JSON.parse(response['listerventeResponse'].return.$);
          resolve(responseJsoFWS) ;
        });
      });
  }



  private envelopeBuilder(requestBody:string):string {
      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }

}
