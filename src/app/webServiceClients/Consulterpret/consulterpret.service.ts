
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

export class Consulterpret{
                              montantdemande:number;
                        }



@Injectable()
export class ConsulterpretServiceWeb {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/consulterpret?wsdl' ;
  private targetNamespace:string = 'urn:consulterpretwsdl' ;

  public responseJso : any ;
  public resp : string ;
  public filtre : string ;
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


   public consulterpret(token:string) : Promise<Consulterpret[]> {

             var method:string = 'consulterpret';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['consulterpret xmlns="urn:consulterpretwsdl#"'] = reEspParams;



            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'consulterpretResponse').then(response=>{
                var reponse:Consulterpret[] = JSON.parse(response['consulterpretResponse'].return.$);
                resolve(reponse) ;
              });
            });
  }


  private envelopeBuilder(requestBody:string):string {
      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }

}
