
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class MapsServiceWeb {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/maps?wsdl' ;
 private targetNamespace:string = 'urn:mapswsdl' ;

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

  public listmaps(type : string): Promise<any>  {
    var method:string = 'listmaps';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listmaps xmlns="urn:mapswsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listmapsResponse').then(response=>{
        var reponse = JSON.parse(response['listmapsResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public listmapsdepart(type : string): Promise<any>  {
    var method:string = 'listmapsdepart';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listmapsdepart xmlns="urn:mapswsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listmapsdepartResponse').then(response=>{
        var reponse = JSON.parse(response['listmapsdepartResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public listmapspardepart(type : string): Promise<any>  {
    var method:string = 'listmapspardepart';
    var parameters:{}[] = [];

    var reEspParams = {token: this.token, type: type} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['listmapspardepart xmlns="urn:mapswsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'listmapspardepartResponse').then(response=>{
        var reponse = JSON.parse(response['listmapspardepartResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  private envelopeBuilder(requestBody:string):string {

      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
