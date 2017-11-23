
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

@Injectable()
export class HelloService {


  private servicePort:string = 'http://51.254.200.129' ; 
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/helloService?wsdl' ;
  private targetNamespace:string = 'urn:helloservicewsdl' ;

  public responseJso : any;
  public resp : string  ;  

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

    public saluer(someone : string) {
        var method:string = 'hello';
        var parameters:{}[] = [];

        let ChoosedSymbol = someone ;

        parameters['hello xmlns="urn:arnleadservicewsdl#"'] = this.setParameters(ChoosedSymbol);

        this.soapService.post(method, parameters, 'helloResponse');
        
    }

    public setParameters(ChoosedSymbol):{}[] {
        var parameters:{}[] = [] ;

        parameters["name"] = ChoosedSymbol ;
        return parameters ;
    }

    private envelopeBuilder(requestBody:string):string {

        return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
    }


}