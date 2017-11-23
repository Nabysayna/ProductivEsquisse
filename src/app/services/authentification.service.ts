import { Injectable } from '@angular/core';

import { CompteAccess } from '../models/compte-access';
import { CompteAccessMock } from '../mocks/compte-access.mock';
import { AuthentificationServiceWeb, AuthResponse } from '../webServiceClients/Authentification/authentification.service';
import * as sha1 from 'js-sha1';


@Injectable()
export class AuthenticationService {
    authentiService: AuthentificationServiceWeb ;
    public baseToken: string ;
    public email: string ;
    public prenom: string ;
    public nom: string ;
    public nometps: string ;
    public telephone: string ;
    public accessLevel: number ;
    public authorizedApis: string ;

    constructor() {
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.baseToken = currentUser && currentUser.baseToken;
        this.authentiService = new AuthentificationServiceWeb();
    }

    login(email: string, password: string): Promise<string> {
      return new Promise( (resolve, reject)=> {
            this.authentiService.authentifier(email, sha1(password)).then( response => {
                console.log("Reponse du serveur : "+response) ;
                if( response != 'false' ){
                    console.log("Has been granted by the server") ;
                    sessionStorage.setItem('headToken', response.split("#")[1] );
                    resolve(response);
                } else {
                    resolve("rejected");
                }
            });
        });
    }


    inscrire(paramInscrpt): Promise<string> {
      return new Promise( (resolve, reject)=> {
        this.authentiService.inscrire(paramInscrpt).then( response => {resolve(response)} ); }) ; 
    }

    creerProfilCaissier(paramInscrpt): Promise<string> {
      return new Promise( (resolve, reject)=> {
        this.authentiService.creerProfilCaissier(paramInscrpt).then( response => {resolve(response)} ); }) ; 
    }


    loginPhase2(smsCode): Promise<number> {
      return new Promise( (resolve, reject)=> {
            this.authentiService.authentifierParCodeSMS(smsCode).then( response => {
                var resp:AuthResponse=response ;

                if( resp.reponse.toString()== "true" ){
                    this.baseToken = sessionStorage.getItem('headToken')+sha1(resp.baseToken+sha1("bay3k00_f1_n10un") );
                    this.email = resp.prenom;
                    this.prenom = resp.prenom;
                    this.nometps = resp.nometps;
                    this.nom = resp.nom;
                    this.telephone = resp.telephone;
                    this.accessLevel = resp.accessLevel;
                    this.authorizedApis = resp.authorizedApis;

                    sessionStorage.setItem('currentUser', JSON.stringify({ username: this.email, baseToken: this.baseToken, authorizedApis:this.authorizedApis, accessLevel:this.accessLevel, prenom:this.prenom, nom:this.nom, telephone:this.telephone, firstuse:resp.firstuse}));
                    
                    resolve(this.accessLevel);
                } else {
                    resolve(0);

                }
            });
        });
    }

 b
    logout(): void {
        this.baseToken = null;
        sessionStorage.removeItem('currentUser');
    }
}
