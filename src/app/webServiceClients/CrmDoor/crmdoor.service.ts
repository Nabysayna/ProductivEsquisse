
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class CrmDoorServiceWeb {

  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/crmdoor?wsdl' ;

  private targetNamespace:string = 'urn:crmdoorwsdl' ;

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


  public validerDemandeDepot(montant: number, infocc: string, infocom: string): Promise<any>  {
    var method:string = 'validerDemandeDepot';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, montant: montant, infocc: infocc, infocom: infocom};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['validerDemandeDepot xmlns="urn:bountoucrmwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'validerDemandeDepotResponse').then(response=>{
        var reponse = JSON.parse(response['validerDemandeDepotResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public getEtatDemandeDepot(infosup: string): Promise<any>  {
    var method:string = 'getEtatDemandeDepot';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, infosup: infosup};
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['getEtatDemandeDepot xmlns="urn:bountoucrmwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'getEtatDemandeDepotResponse').then(response=>{
        var reponse = JSON.parse(response['getEtatDemandeDepotResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  private envelopeBuilder(requestBody:string):string {

      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
