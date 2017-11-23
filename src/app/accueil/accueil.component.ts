import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { PostCashWebService } from '../webServiceClients/PostCash/postcash.service';
import { TntServiceWeb, TntResponse } from '../webServiceClients/Tnt/Tnt.service';
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: [PostCashWebService]
})
export class AccueilComponent implements OnInit {
  process=[];
  quinzeMinutes = 900000;	
  registredAPIs : string [] = ['POSTECASH', 'ORANGE MONEY', 'TIGO CASH', 'TNT BY EXCAF'] ;
  //registredAPIs : string [] = ['POSTECASH', 'TNT BY EXCAF'] ;
  authorisedToUseCRM = false ;
  load="loader";
  private tntCaller: TntServiceWeb ;
  actif = -1 ;
  dataImpression:any;
  constructor(private router: Router,private omService : OrangeMoneyService,private postcashwebservice: PostCashWebService) {}

/******************************************************************************************************/


  ngOnInit() {
    if (!sessionStorage.getItem('currentUser')) 
       this.router.navigate(['']);  
    this.processus(); 
    this.tntCaller = new TntServiceWeb();
  }

/******************************************************************************************************/


  processus(){
  
    setInterval(()=>{
     
    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      let infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':''};
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
     // var newprocess={'operation':sesion.operation,'montant':sesion.montant,'num':sesion.num};
      
      this.process.push(sesion);
      console.log(sesion.etats.id);
      sessionStorage.removeItem('curentProcess');
      var operateur=sesion.data.operateur;
      switch(operateur){
        case 1:{
                var operation=sesion.data.operation;
                switch(operation){
                  case 1:{
                        this.validrechargementespece(sesion);
                        break;
                  }
                  case 2:{
                        this.validateachatjula(sesion);
                        break;
                  }
                  case 3:{
                        this.validatedetailfacturesenelec(sesion);
                        break;
                  }
                  case 4:{
                        this.validateachatcodewoyofal(sesion);
                        break;
                  }
                  default:break;
                }
                   break ;              
        }
        
        case 2:{
             var operation=sesion.data.operation;
                 console.log("Orange Money was choosen and operateur is :"+operateur) ;

              switch(operation){
                case 1:{
                       this.deposer(sesion);
                       break;
                       }
                case 2:{
                       this.retirer(sesion);
                       break;
                }
                case 3:{
                       this.retraitAvecCode(sesion);
                       break;
                }
                case 4:{
                       this.retraitCpteRecep(sesion);
                       break;
                }
                case 5:{
                       this.acheterCredit(sesion);
                       break;
                }
                default :break;
              }  
               break ;                
        }

       case 4:{
             var operation=sesion.data.operation;

             console.log("TNT was choosen and OPERATEUR IS :"+operateur) ;

             switch(operation){
              case 1:{
                   this.validnabon(sesion);
                   break;
              }
              case 2:{
                  this.vendreDecodeur(sesion);
                  break;
              }
              case 3:{
                  this.vendreCarte(sesion);
                  break;
              }
              default : break;
             }
       }

        default:break;
      }
    }
    else{
     console.log('not nice');
    }
  },3000);
  }


/******************************************************************************************************/


  deposer(objet:any){

    let requete = "1/"+objet.data.montant+"/"+objet.data.num ;  

    if (this.repeatedInLastFifteen('om-depot', requete)==1)
           requete = requete+'R' ;

    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
           console.log("For this 'depot', we just say : "+resp._body) ;
            if(resp._body.trim()=='0'){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
            }
           
           setTimeout(()=>{
              this.omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier depot : "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                if(donnee=='0'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   clearInterval(periodicVerifier) ;
                }
              });
              var periodicVerifier = setInterval(()=>{
              this.omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier depot : "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                if(donnee=='0'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   clearInterval(periodicVerifier) ;
                }
              });
              },2000);
           },5000);
      }
      else{
        console.log("error") ; 
        
        }
    });

  }


/******************************************************************************************************/

   retirer(objet:any){
    let requete = "2/"+objet.data.numclient+"/"+objet.data.montant ;    

    if (this.repeatedInLastFifteen('om-retrait', requete)==1)
           requete = requete+'R' ;

    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){

        console.log("For this 'retrait', we just say : "+resp._body) ;
      
        if(resp._body.trim()=='0'){
           objet.etats.etat=true;
           objet.etats.load='terminated';
           objet.etats.color='red';
        }

           setTimeout(()=>{

              this.omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                if(donnee=='0'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   clearInterval(periodicVerifier) ;
                }
              });

              var periodicVerifier = setInterval(()=>{
              this.omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                if(donnee=='0'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   clearInterval(periodicVerifier) ;
                }
              });
              },2000);
           },20000);
      }
      else{
        console.log("error") ; 
        
        }
    });

  }
  
/******************************************************************************************************/


   retraitAvecCode(objet:any){
    let requete = "3/"+objet.data.coderetrait+"/"+objet.data.prenom+"/"+objet.data.nomclient+"/"+objet.data.date+"/"+objet.data.cni+"/"+objet.data.numclient;

    if (this.repeatedInLastFifteen('om-retraitcode', requete)==1)
           requete = requete+'R' ;

    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
          console.log("For this 'retrait-code', we just say : "+resp._body) ;

            if(resp._body.trim()=='0'){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
            }

           setTimeout(()=>{

              this.omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                if(donnee=='0'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   clearInterval(periodicVerifier) ;
                }
              });

              var periodicVerifier = setInterval(()=>{
              this.omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                if(donnee=='0'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   clearInterval(periodicVerifier) ;
                }
              });
              },2000);
           },20000);
      }
      else{
        console.log("error") ; 
        
        }
    });


    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        console.log(resp._body);
        if (resp._body.trim().toString()=='1'){
          console.log('operation reussi');
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
          this.process[objet.etats.id]=objet;
        }
      }
      else
        console.log("error") ; 
    });

  }


/******************************************************************************************************/


  retraitCpteRecep(objet:any){

    let requete = "4/"+objet.data.numclient+"/"+objet.data.montant;  
    if (this.repeatedInLastFifteen('om-retraitcptercpt', requete)==1)
           requete = requete+'R' ;

    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        if (resp._body.trim().toString()=='1'){
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
          //this.etats.process[objet.id]=objet;
        }
      }
      else
        console.log("error") ; 
    });
  }

/******************************************************************************************************/


  acheterCredit(objet:any){
    let requete = "5/"+objet.data.numclient+"/"+objet.data.montant;
 
    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        if (resp._body=='1'){
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
         // this.process[objet.id]=objet;
        }
      }
      else
        console.log("error") ; 
    }) ;
  }


/******************************************************************************************************/


  validrechargementespece(objet:any){
    this.postcashwebservice.rechargementespece('00221'+objet.data.telephone+'',''+objet.data.montant).then(postcashwebserviceList => {
      
      if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
            objet.etats.etat=true;
            objet.etats.load='terminated';
            objet.etats.color='green';
            objet.dataI = {
            apiservice:'postecash',
            service:'rechargementespece',
            infotransaction:{
              client:{
                transactionPostCash: postcashwebserviceList.transactionId,
                transactionBBS: 'Id BBS',
                telephone:'00221'+objet.data.telephone,
                montant:objet.data.montant,
              },

            },
          } ;        
      }else{
            objet.etats.etat=true;
            objet.etats.load='terminated';
            objet.etats.color='red';
      }
    });
    
  }


/******************************************************************************************************/


  validateachatjula(objet:any){
     this.postcashwebservice.achatjula(objet.data.montant+'',objet.data.nbcarte+'').then(postcashwebserviceList => {        
        if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        let montant = objet.data.nbcarte * objet.data.montant ;
         objet.dataI = {
              apiservice:'postecash',
              service:'achatjula',
              infotransaction:{
                client:{
                  transactionPostCash: postcashwebserviceList.transactionId,
                  transactionBBS: 'id BBS',
                  typecarte:objet.data.montant,
                  nbcarte:objet.data.nbcarte,
                  montant:montant,
                },

              },
            }
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='green';
        }else{
             objet.etats.etat=true;
             objet.etats.load='terminated';
             objet.etats.color='red';
        }
      });
      
  }


/******************************************************************************************************/


  validatedetailfacturesenelec(objet:any){
        objet.dataI = {
            apiservice:'postecash',
            service:'reglementsenelec',
            infotransaction:{
              client:{
                transactionPostCash: 40,
                transactionBBS: "transactionId BBS",
                montant:10000,
                numfacture:objet.data.facture,
                police:objet.data.police,
              },

            },
          }
     objet.etats.etat=true;
     objet.etats.load='terminated';
     objet.etats.color='green';
      /*this.detailfacturepostcash = null;
      console.log('Police et Numero Facture : '+objet.data.police+'-'+objet.data.numfacture);
      this.postcashwebservice.detailfacturesenelec(objet.data.police,objet.data.numfacture.toString()).then(postcashwebserviceList => { 
        this.detailfacturepostcash = postcashwebserviceList;
        console.log(postcashwebserviceList);
      }); 
      */   
  }


/******************************************************************************************************/


  validateachatcodewoyofal(objet:any){
      
      this.postcashwebservice.achatcodewoyofal(objet.data.montant+'',objet.data.compteur+'').then(postcashwebserviceList => {
        if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        objet.dataI = {
            apiservice:'postecash',
            service:'achatcodewayafal',
            infotransaction:{
              client:{
                transactionPostCash: postcashwebserviceList.transactionId,
                transactionBBS: 'Id BBS',
                codewoyafal: postcashwebserviceList.code,
                montant: objet.data.montant,
                compteur: objet.data.compteur,
              },
            },
          };
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
          
        }else{
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
        }
      });
  }

/******************************************************************************************************/


  finprocess(etat:any,imprime:any){
     if(etat.etats.etat==true){     
       if(etat.data.operateur==1){
        
			 sessionStorage.setItem('dataImpression', JSON.stringify(imprime));
			 this.router.navigate(['accueil']);
			 setTimeout(()=>this.router.navigate(['accueil/impression']),100);
		 
		 }

	   if(etat.data.operateur==4){
	       sessionStorage.setItem('dataImpression', JSON.stringify(imprime));
		   this.router.navigate(['accueil']);
		   setTimeout(()=>this.router.navigate(['accueil/impression']),100);
	   }
	   this.process.splice(etat.etats.id,1);
     for (let i=0 ; i<this.process.length ; i++){
      if(this.process[i].etats.id > etat.etats.id)
        this.process[i].etats.id = this.process[i].etats.id - 1 ;
     }
	   console.log(etat.etats.id);
	  }
  }


/******************************************************************************************************/



  validnabon(objet:any){

    this.tntCaller.abonner(objet.data.token, objet.data.prenom,objet.data.nom, objet.data.tel,objet.data.cni, objet.data.chip, objet.data.chip, objet.data.duree, objet.data.typedebouquet).then( response =>
      {

        let typedebouquet = "" ;
        console.log(response);
        if(response.response=="ok"){
         
           objet.etats.etat=true;
           objet.etats.load='terminated';
           objet.etats.color='green';

          let montant:number = 0;
          if(objet.data.typedebouquet == 1){
            montant = 5000 * objet.data.duree;
            typedebouquet = 'Maanaa';
          }
          if(objet.data.typedebouquet == 2){
            montant = 3000 * objet.data.duree;
            typedebouquet = 'Boul khool';
          }
          if(objet.data.typedebouquet == 3){
            montant = 8000 * objet.data.duree;
            typedebouquet = 'Maanaa & Boul khool';
          }

          objet.dataI = {
            apiservice:'tnt',
            service:'abonnement',
            infotransaction:{
              client:{
                transactionBBS: response.idtransactionbbs,
                prenom:objet.data.prenom,
                nom:objet.data.nom,
                telephone:objet.data.tel,
                carte:objet.data.carte,
                chip:objet.data.chip,
                typebouquet:typedebouquet,
                montant: montant,
                duree:objet.data.duree
              },

            },
          }
        }else{
           objet.etats.etat=true;
           objet.etats.load='terminated';
           objet.etats.color='red';
      }

      });
      
  }

/******************************************************************************************************/


   vendreDecodeur(objet:any){
 
    this.tntCaller.vendreDecodeur('2455668745', objet.data.prenom,objet.data.nomclient,objet.data.tel, objet.data.adresse, objet.data.region, objet.data.cni,objet.data.chip,objet.data.carte, objet.data.duree, objet.data.typedebouquet, objet.data.prix).then( response =>
      {
        if(response=="ok"){

           objet.dataI = {
            apiservice:'tnt',
            service:'ventedecodeur',
            infotransaction:{
                client:{
                transactionBBS: 'Id BBS',
                prenom:objet.data.prenom,
                nom:objet.data.nomclient,
                telephone:objet.data.tel,
                chip:objet.data.chip,
                carte:objet.data.carte,
                montant:objet.data.montant,
                typedebouquet:objet.data.typedebouquet,
              },

            },
          } ;

          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
          
        }else{
           objet.etats.etat=false;
           objet.etats.load='terminated';
           objet.etats.color='red';
        }

      }); 
  }


/******************************************************************************************************/


   vendreCarte(objet:any){
    this.tntCaller.vendreCarte('55555', objet.data.prenom, objet.data.nomclient,objet.data.tel,objet.data.tel, objet.data.region,objet.data.cni,objet.data.carte, 5000).then( response =>{
        if(response=="ok"){
          objet.dataI = {
            apiservice:'tnt',
            service:'ventecarte',
           infotransaction:{
              client:{
              transactionBBS: 'Id BBS',
              prenom:objet.data.prenom,
              nom:objet.data.nom,
              telephone:objet.data.tel,
              carte:objet.data.carte,
              montant:5000,
            },

          },
        };
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
        }
        else{
           objet.etats.etat=false;
           objet.etats.load='terminated';
           objet.etats.color='red';
        }
    });
  }

/******************************************************************************************************/


  repeatedInLastFifteen(operation : any, incomingRequest : any) : number{
    let today = Date.now() ;
    let omOps = [] ;
    console.log(localStorage.getItem(operation)) ;

    if (localStorage.getItem(operation)==null ){
      localStorage.setItem(operation, JSON.stringify([{requete:incomingRequest, tstamp:today}]) );
      return 0 ;
    }else{
      omOps = JSON.parse( localStorage.getItem(operation) ) ;
      for (let i=0 ; i<omOps.length ; i++){
        if (omOps[i].requete==incomingRequest){
          let ilYa15Minutes = today - this.quinzeMinutes;
          omOps[i].tstamp = today ;
          omOps[i].requete = incomingRequest ;
          localStorage.setItem(operation, JSON.stringify(omOps) );            
          if (omOps[i].tstamp>=ilYa15Minutes){
            return 1 ;
          }else{
            return 0;
          }
        }
      }
      omOps.push({requete:incomingRequest, tstamp:today}) ;
      localStorage.setItem(operation, JSON.stringify(omOps) );            
      return 0 ;
    }

  }

/****************************************************************************************************/


}
  
