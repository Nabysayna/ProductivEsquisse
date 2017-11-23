
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

export class Demandepret{
                              plafond:number;
                        }



@Injectable()
export class DemandepretServiceWeb {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/demandepret?wsdl' ;
  private targetNamespace:string = 'urn:demandepretwsdl' ;

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


   public demandepret(token:string) : Promise<Demandepret[]> {

             var method:string = 'demandepret';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['demandepret xmlns="urn:demandepretwsdl#"'] = reEspParams;



            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'demandepretResponse').then(response=>{
                var reponse:Demandepret[] = JSON.parse(response['demandepretResponse'].return.$);
                resolve(reponse) ;
              });
            });
  }




  public ajoutdemandepret(token:string, montantdemande: number): Promise<any>  {
    var method:string = 'ajoutdemandepret';
    var parameters:{}[] = [];

    var reEspParams = { token:token, montantdemande: montantdemande} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['ajoutdemandepret xmlns="urn:ajoutdemandepretwsdl#"'] = params;

    console.log(montantdemande);
    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'ajoutdemandepretResponse').then(response=>{
        var reponse  = JSON.parse(response['ajoutdemandepretResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  private envelopeBuilder(requestBody:string):string {
      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }

}
