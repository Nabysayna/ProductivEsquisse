
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

export class Portefeuille{
                          nom:string;
                          prenom:string;
                          telephone:string;
                          nombre_operation:number;
                          fidelite:number;
                          date_ajout:any;
                        }

export class Relance{
                      iduser : number ;
                      prenom:string ;
                      nom:string ;
                      telephone:string ;
                      infosoperation:string;
                      echeance:any;
                   }


export class Promotion{
                        nom:string;
                        prenom:string;
                        telephone:string;
                        nombre_operation:number;
                        fidelite:number;
                        date_ajout:any;
                       }

export class Prospection{
                          nom:string;
                          prenom:string;
                          telephone:string;
                        }

export class Suivicommande{
                          nomclient:string;
                          prenomclient:string;
                          montantcommande:number;
                          pointderecuperation:string;
                          etat:string;
                         }



export class Servicepoint{
                          nom:string;
                          designations:string;
                        }



@Injectable()
export class CrmServiceWeb {

  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/crm?wsdl' ;
  private targetNamespace:string = 'urn:crmwsdl' ;

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


   public portefeuille(token:string) : Promise<Portefeuille[]> {

             var method:string = 'portefeuille';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['portefeuille xmlns="urn:crmwsdl#"'] = reEspParams;



            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'portefeuilleResponse').then(response=>{
                var reponse:Portefeuille[] = JSON.parse(response['portefeuilleResponse'].return.$);
                resolve(reponse) ;
              });
            });
  }

  public relance(token:string) : Promise<Relance[]> {

             var method:string = 'relance';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['relance xmlns="urn:crmwsdl#"'] = reEspParams;

            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'relanceResponse').then(response=>{
                var reponse:any[] = JSON.parse(response['relanceResponse'].return.$);
                resolve(reponse) ;
              });
            });
  }

    public promotion(token:string) : Promise<Promotion[]> {

             var method:string = 'promotion';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['promotion xmlns="urn:crmwsdl#"'] = reEspParams;

            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'promotionResponse').then(response=>{
                var reponse:Promotion[] = JSON.parse(response['promotionResponse'].return.$);
                resolve(reponse) ;
              });
            });
  }

    public sendSms(token, destinataire, message) : Promise<string> {

            var method:string = 'sendSms';
            var parameters:{}[] = [];
            var param:{}[] = [];
            var paramObject = {token:token, destinataires:destinataire, messageContain:message} ;
            param["params"] = paramObject ;
            parameters['sendSms xmlns="urn:crmwsdl#"'] = param;

            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'sendSmsResponse').then(response=>{
                resolve(response['sendSmsResponse'].return.$) ;
              });
            });
  }

  public prospection(token:string) : Promise<Prospection[]> {

             var method:string = 'prospection';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['prospection xmlns="urn:crmwsdl#"'] = reEspParams;



            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'prospectionResponse').then(response=>{
                var reponse:Prospection[] = JSON.parse(response['prospectionResponse'].return.$);
                console.log("ddd "+response['prospectionResponse'].return.$);
                resolve(reponse) ;
              });
            });
  }

   public suivicommande(token:string) : Promise<Suivicommande[]> {

             var method:string = 'suivicommande';
            var parameters:{}[] = [];
            var reEspParams = {token:token} ;

            parameters['suivicommande xmlns="urn:crmwsdl#"'] = reEspParams;

            return new Promise( (resolve, reject) => {
              this.soapService.post(method, parameters, 'suivicommandeResponse').then(response=>{
                var reponse:Suivicommande[] = JSON.parse(response['suivicommandeResponse'].return.$);
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


  private envelopeBuilder(requestBody:string):string {
      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }

}
