
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

class Fichier {
  public id:number;
  public nom:string;
  public prenom:string;
  public tel:string;
  public adr:string;
  public qualification:string;
  public choix:boolean;

  }

  export class Operateurs{
  public id:number;
  public prenom:string;
  public nom:string;
  public adresse:string;
  public telephone:number;
  public accesslevel:number;
}

export class Commerciaux{
  public id:number;
  public prenom:string;
  public nom:string;
}



@Injectable()
export class CommercialServiceWeb {

  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/commercial?wsdl' ;
   private targetNamespace:string = 'urn:commercialwsdl' ;

  public responseJso : any ;
  public resp : string ;
  public filtre : string ;
  public responseJsoFWS : Fichier[] ;

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


  public listoperateurs(token : string) : Promise<Operateurs[]> {

      var method:string = 'listoperateurs';
      var parameters:{}[] = [];
      var reEspParams = { token:token} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listoperateurs xmlns="urn:commercialwsdl#"'] = params ;
        this.soapService.post(method, parameters, 'listoperateursResponse').then(response=>{
          let responseJsoFWS : Operateurs[] = JSON.parse(response['listoperateursResponse'].return.$);
          console.log("reponse brute from operateurs Web Service "+JSON.stringify(responseJsoFWS[0]) ) ;
          resolve(responseJsoFWS) ;
        });
      });
  }


  public listcommerciaux(token : string) : Promise<Commerciaux[]> {

      var method:string = 'listcommerciaux';
      var parameters:{}[] = [];
      var reEspParams = { token:token} ;
      var params:{}[] = [] ;
      params["params"] = reEspParams ;

      return new Promise( (resolve, reject) => {
        parameters['listcommerciaux xmlns="urn:commercialwsdl#"'] = params ;
        this.soapService.post(method, parameters, 'listcommerciauxResponse').then(response=>{
          let responseJsoFWS : Commerciaux[] = JSON.parse(response['listcommerciauxResponse'].return.$);
          console.log("reponse brute from listcommerciaux Web Service "+JSON.stringify(responseJsoFWS[0]) ) ;
          resolve(responseJsoFWS) ;
        });
      });
  }
  public zone(token:string, type:string) : Promise<any> {

     var method:string = 'zone';
    var parameters:{}[] = [];
    var reEspParams = {token:token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['zone xmlns="urn:commercialwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'zoneResponse').then(response=>{
        var reponse:any = JSON.parse(response['zoneResponse'].return.$);
        resolve(reponse) ;
      });
    });
  }



  private envelopeBuilder(requestBody:string):string {
      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }

}
