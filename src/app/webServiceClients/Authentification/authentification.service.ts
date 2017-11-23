
import {Injectable} from '@angular/core';
import {SoapService} from "../../soap.service";

export class AuthResponse{
  public prenom: string;
  public nom: string;
  public nometps: string;
  public telephone: string;
  public reponse: boolean ;
  public accessLevel: number ;
  public authorizedApis: string ;
  public firstuse: number ;
  public baseToken: string ;
}

@Injectable()
export class AuthentificationServiceWeb {


  private servicePort:string = 'http://51.254.200.129' ;
  private servicePath:string = '/backendprod/EsquisseBackEnd/web/app.php/invest/logging?wsdl' ;

//  private servicePort:string = 'http://localhost' ;
//  private servicePath:string = '/EsquisseBackEnd/web/app_dev.php/invest/logging?wsdl' ;

  private targetNamespace:string = 'urn:authwsdl' ;

  public responseJso : any ;
  public resp : string ;


  private soapService:SoapService;

  constructor() {
        this.soapService = new SoapService();

        this.soapService.setServicePort(this.servicePort) ;
        this.soapService.setServicePath(this.servicePath);
        this.soapService.setServiceUrl(this.servicePort+this.servicePath);
        this.soapService.setTargetNamespace(this.targetNamespace);

        this.soapService.envelopeBuilder = this.envelopeBuilder;
        this.soapService.jsoResponseHandler = (response:{}) => { this.responseJso =response ; };
        this.soapService.localNameMode = true;
  }

  public authentifier(login : string, password: string) : Promise<string>  {
      var method:string = 'authentification';
      var parameters:{}[] = [];

      let tryLogin = login ;
      let tryPwd = password ;
      return new Promise( (resolve, reject) => {
        parameters['authentification xmlns="urn:authwsdl#"'] = this.setParameters(tryLogin, tryPwd) ;
        this.soapService.post(method, parameters, 'authentificationResponse').then(response=>
        resolve(response["authentificationResponse"]["return"].$) ) ;
      });
  }

  public authentifierParCodeSMS(smsCode) : Promise<AuthResponse>  {
      var method:string = 'authentificationPhaseTwo';
      var parameters:{}[] = [];

      var parame:{}[] = [] ;
      var user = {tokentemporaire:smsCode} ;
      parame["user"] = user ;

      return new Promise( (resolve, reject) => {
        parameters['authentificationPhaseTwo xmlns="urn:authwsdl#"'] = parame ;
        this.soapService.post(method, parameters, 'authentificationPhaseTwoResponse').then(response=>{
        var authResponse:AuthResponse = {
          prenom:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).prenom,
          nom:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).nom,
          nometps:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).nometps,
          telephone:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).tel,
          baseToken:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).baseToken,
          reponse:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).reponse,
          accessLevel:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).accessLevel,
          authorizedApis:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).authorizedApis,
          firstuse:JSON.parse(response["authentificationPhaseTwoResponse"]["return"].$).firstuse
        };
        resolve(authResponse)
        }) ;
      });
  }

  public creerProfilCaissier(paramInscritpion) : Promise<string>  {
      var method:string = 'creerProfilCaissier';
      var parameters:{}[] = [];
      let params:{}[] = [] ;
      params["nvelInscrit"] = paramInscritpion ;
      return new Promise( (resolve, reject) => {
        parameters['creerProfilCaissier xmlns="urn:authwsdl#"'] = params ;
        this.soapService.post(method, parameters, 'creerProfilCaissierResponse').then(response=> {
        resolve(response["creerProfilCaissierResponse"]["return"].$) } ) ;
      });
  }

  public inscrire(paramInscritpion) : Promise<string>  {
      var method:string = 'inscription';
      var parameters:{}[] = [];
      let params:{}[] = [] ;
      params["nvelInscrit"] = paramInscritpion ;
      return new Promise( (resolve, reject) => {
        parameters['inscription xmlns="urn:authwsdl#"'] = params ;
        this.soapService.post(method, parameters, 'inscriptionResponse').then(response=> {
        resolve(response["inscriptionResponse"]["return"].$) } ) ;
      });
  }


  public modifierpwdinit(pwdactuel : string, newpwd : string) : Promise<string>{
      var method:string = 'modifpwdinit';
      var parameters:{}[] = [];
      let parame : {}[] = [] ;
      var user = {token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, pwdactuel:pwdactuel, newpwd : newpwd} ;
      
      parame["user"] = user ;

      return new Promise( (resolve, reject) => {
        parameters['modifpwdinit xmlns="urn:authwsdl#"'] = parame ;
        this.soapService.post(method, parameters, 'modifpwdinitResponse').then(response=>
        resolve(response["modifpwdinitResponse"]["return"].$) ) ;
      });
  }

  public deconnecter(token : string) : Promise<number>  {
      var method:string = 'deconnexion';
      var parameters:{}[] = [];

      var parame:{}[] = [] ;
      var user = {token:token, hdeconnexion:"345"} ;
      parame["user"] = user ;
      return new Promise( (resolve, reject) => {
        parameters['deconnexion xmlns="urn:authwsdl#"'] = parame ;
        this.soapService.post(method, parameters, 'deconnexionResponse').then(response=>{
        resolve(JSON.parse(response["deconnexionResponse"]["return"].$)) ;
        }) ;
      });

  }

  public setParameters( tryLogin: string, tryPwd: string):{}[] {
      var parameters:{}[] = [] ;
      var user = {login:tryLogin, pwd:tryPwd} ;
      parameters["user"] = user ;

      return parameters ;
  }

  private envelopeBuilder(requestBody:string):string {

      return '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'+requestBody+'</soap:Body></soap:Envelope>' ;
  }


}
