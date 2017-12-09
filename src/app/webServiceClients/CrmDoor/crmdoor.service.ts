
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";


@Injectable()
export class AdminpdvServiceWeb {

  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/crmdoor?wsdl' ;

  private targetNamespace:string = 'urn:crmdoorvwsdl' ;

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


  public initierReaquete(montant: number, infoscc : string, infocom : string ): Promise<any>  {
    var method:string = 'deconnectpdv';
    var parameters:{}[] = [];

    var reEspParams = {};
    var params:any[] = [] ;
    params["params"] = reEspParams ;

    parameters['deconnectpdv xmlns="urn:adminpdvwsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'deconnectpdvResponse').then(response=>{
        var reponse = JSON.parse(response['deconnectpdvResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }


  private envelopeBuilder(requestBody:string):string {

      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
