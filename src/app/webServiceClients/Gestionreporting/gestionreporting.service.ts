
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

export class Gestionreporting{
                          dateoperation:any;
                          operateur:string;
                          traitement:string;
                          montant:number;
                        }

export class Servicepoint{
                          nom:string;
                          designations:string;
                        }




@Injectable()
export class GestionreportingServiceWeb {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/gestionreporting?wsdl' ;
  private targetNamespace:string = 'urn:gestionreportingwsdl' ;

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


   public gestionreporting(token:string) : Promise<Gestionreporting[]> {

             var method:string = 'gestionreporting';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['gestionreporting xmlns="urn:gestionreportingwsdl#"'] = reEspParams;



            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'gestionreportingResponse').then(response=>{
                var reponse:Gestionreporting[] = JSON.parse(response['gestionreportingResponse'].return.$);
                resolve(reponse) ;
              });
            });
  }


   public servicepoint(token:string) : Promise<Servicepoint[]> {

             var method:string = 'servicepoint';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['servicepoint xmlns="urn:servicepointwsdl#"'] = reEspParams;



            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'servicepointResponse').then(response=>{
                var reponse:Servicepoint[] = JSON.parse(response['servicepointResponse'].return.$);
                resolve(reponse) ;
              });
            });
  }

  public ajoutdepense(token:string, libelle: string, service: string, montant: number): Promise<any>  {
    var method:string = 'ajoutdepense';
    var parameters:{}[] = [];

    var reEspParams = { token:token, libelle: libelle, service: service, montant: montant} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['ajoutdepense xmlns="urn:ajoutdepensewsdl#"'] = params;

    console.log(libelle+ " "+service +" "+montant);
    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'ajoutdepenseResponse').then(response=>{
        var reponse  = JSON.parse(response['ajoutdepenseResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public reclamation(token:string, sujet: string, nomservice: string, message: string): Promise<any>  {
    var method:string = 'reclamation';
    var parameters:{}[] = [];

    var reEspParams = { token:token, sujet: sujet, nomservice: nomservice, message: message} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['reclamation xmlns="urn:reclamationwsdl#"'] = params;

    console.log(sujet+ " "+nomservice +" "+message);
    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'reclamationResponse').then(response=>{
        var reponse  = JSON.parse(response['reclamationResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }

  public vente(token:string, designation: string, servicevente: string, quantite:number): Promise<any>  {
    var method:string = 'vente';
    var parameters:{}[] = [];

    var reEspParams = { token:token, servicevente: servicevente, designation: designation, quantite:quantite} ;
    var params:{}[] = [] ;
    params["params"] = reEspParams ;

    parameters['vente xmlns="urn:ventewsdl#"'] = params;

    return new Promise( (resolve, reject) => {
      this.soapService.post(method, parameters, 'venteResponse').then(response=>{
        var reponse  = JSON.parse(response['venteResponse'].return.$);
        resolve(reponse) ;
      });
    });

  }


  private envelopeBuilder(requestBody:string):string {
      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }

}
