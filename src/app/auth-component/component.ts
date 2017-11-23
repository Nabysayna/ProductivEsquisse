import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';

@Component({
  moduleId: module.id,
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit {

  userName = ''  ; 
  userPwd  = '' ; 
  fakevalues : boolean ;
  phase2fakevalues : boolean = true ;
  saisietoken : string ;
  loading = false ;
  phase1 = true ;
  region : any ;
  zone : any ;
  souszone : any ;
  chaine : string ;

  prenom : any ;
  nom :any ;
  email :any ;
  telephone :any ;
  nometps : any ;
  nomshop : any ;
  adresse : any ;

  l1: string ;
  l2: string ; 
  l3: string ;
  l4: string ;
  c1: string ;
  c2: string ; 
  c3: string ; 
  c4: string ; 

  fromSMS : string ;
  backstring : string = "" ;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) 
  { 
  	this.fakevalues = true ;
  }

  ngOnInit() {
    this.authenticationService.logout();
  }
    

  public regions=[
      {'name':'--choisissez votre region--','id':'0'},
      {'name':'Dakar','id':'1'},
      {'name':'Thies','id':'2'},
      {'name':'Fatck','id':'3'},
      {'name':'Kaolack','id':'4'},
      {'name':'Saint-Louis','id':'5'},
      {'name':'Kolda','id':'6'},
      {'name':'Tambacounda','id':'7'},
      {'name':'Ziguinchor','id':'8'},
      {'name':'Sedhiou','id':'9'},
      {'name':'Kedougou','id':'10'},
      {'name':'Louga','id':'11'},
      {'name':'Matam','id':'12'},
      {'name':'Kaffrine','id':'13'},
      {'name':'Diourbel','id':'14'}
  ];
  public departements=[{'name':'choisissez votre zone','id':'0'}];
  public sdepartements=[{'name':'choisissez votre sous zone'}];

  departement(id){
  switch(id){
  case '1':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Grand-Dakar','id':'1'},
            {'name':'Niayes','id':'2'}, 
            {'name':'Pikine','id':'4'},
            {'name':'Guediawaye','id':'5'},
            {'name':'Dakar Plateau','id':'6'},
            {'name':'Almadie','id':'7'},
            {'name':'Parcelles assainies','id':'8'},
            {'name':'Thiaroye','id':'9'},
            {'name':'Rufisque','id':'10'},
            {'name':'Tivaouane Peulh-Niaga','id':'11'},
            {'name':'Yene','id':'12'},
            {'name':'Bargny','id':'13'},
            {'name':'Diamniadio','id':'14'},
            {'name':'Jaxaay-Plles-Niakoul Rab','id':'15'},
            {'name':'Sangalkam','id':'16'},
            {'name':'Sebikotane','id':'17'},
            {'name':'Sendou','id':'18'}
          ];
      break;
   }
    case '2':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Thies','id':'18'},
            {'name':'Mbour','id':'19'},
            {'name':'Tivaouane','id':'20'}
            ];
     break;
        }
     case '3':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Fatick','id':'21'},
            {'name':'Foudiougne','id':'22'},
            {'name':'Gossas','id':'23'}
            ];
     break;
     }
   case '4':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Kaolack','id':'24'},
            {'name':'Guinguineo','id':'25'},
            {'name':'Nioro Du Rip','id':'26'}
            ];
     break;
        }
    case '5':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Saint-Louis','id':'27'},
            {'name':'Podor','id':'28'}
            ];
     break;
        }
        case '6':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Kolda','id':'29'},
            {'name':'Medina Yoro Foulah','id':'30'},
            {'name':'Velingara','id':'31'}
            ];
     break;
     }
      case '7':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Tambacounda','id':'32'},
            {'name':'Koumpetou','id':'33'}
            ];
     break;
    }
    case '8':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Ziguinchor','id':'34'},
            {'name':'Oussouye','id':'35'},
            {'name':'Bignona','id':'36'}
            ];
           
     break;
        }
     case '9':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Sedhiou','id':'37'},
            {'name':'Bounkiling','id':'38'},
            {'name':'Goudomp','id':'39'}
            ];
     break;
        }
     case '10':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Kedoudou','id':'40'},
            {'name':'Salemata','id':'41'},
            {'name':'Saraya','id':'42'}
            ];
     break;
        }
     case '11':{
     this.departements=[
            {'name':'choisissez votre departement','id':'0'},
            {'name':'Louga','id':'42'},
            {'name':'Kebemer','id':'43'},
            {'name':'Linguere','id':'44'}
            ];
     break;
        }
     case '12':{
     this.departements=[
            {'name':'choisissez votre departement','id':'45'},
            {'name':'Matam','id':'46'},
            {'name':'Kanel','id':'47'},
            {'name':'Ranerou Ferlo','id':'48'}
          ];
     break;
        }
     case '13':{
     this.departements=[
            {'name':'choisissez votre departement','id':'49'},
            {'name':'Kaffrine','id':'50'},
            {'name':'Birkilane','id':'51'},
            {'name':'Koungheul','id':'52'}
          ];
     break;
        }
    case '14':{
       this.departements=[
              {'name':'choisissez votre departement','id':'53'},
              {'name':'Diourbel','id':'54'},
              {'name':'Bambey','id':'55'},
              {'name':'Mbacke','id':'56'}
           ];
       break;
          }
      default :{
        
      }
    }
   }
   souszones(id){
   switch(id){
   case '1':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Dieuppeul'},
       {'name':'Derkle'},
       {'name':'Biscuiterie'},
       {'name':'HLM'},
       {'name':'Hann Bel Aire'},
       {'name':'Grand Dakar'},
       {'name':'Sicap'},
       {'name':'Liberte'}
     ];
     break;
    }
   case '2':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Keur Massar'},
       {'name':'Malika'},
       {'name':'Yembeul Nord'},
       {'name':'Yeumbeul Sud'}
     ];
     break;
    }
   case '4':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Dalifort'},
       {'name':'Djida thiaroye kao'},
       {'name':'Guinaw Rail Nord'},
       {'name':'Guinaw Rail Sud'},
       {'name':'Pikine Est'},
       {'name':'Pikine Nord'},
       {'name':'Pikine Ouest'}
     ];
     break;
    }
   case '5':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Golf sud'},
       {'name':'Medina Gounass'},
       {'name':'Ndiareme'},
       {'name':'Sam Notaire'},
       {'name':'Wakhinaan Nimzat'}
     ];
     break;
    }
   case '6':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Gueule Tapee'},
       {'name':'Fass'},
       {'name':'Colobane'},
       {'name':'Fann'},
       {'name':'Point E'},
       {'name':'Amitie'},
       {'name':'Goree'},
       {'name':'Medina'},
       {'name':'Plateau'}
     ];
     break;
    }
   case '7':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Yoff'},
       {'name':'Sacre Coeur'},
       {'name':'Mermoz'},
       {'name':'Ngor'},
       {'name':'Ouakam'}
     ];
     break;
    }
   case '8':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Camberene'},
       {'name':'Grand Yoff'},
       {'name':'Parcelles Assainies'},
       {'name':"Patte D'oie"}
     ];
     break;
    }
   case '9':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Mbao'},
       {'name':'Diamagueune'},
       {'name':'Sicap Mbao'},
       {'name':'Thiaroye Gare'},
       {'name':'Thiaroye sur mer'},
       {'name':'Tivaouane Diaksao'}
     ];
     break;
    }
   case '10':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Rufisque Est'},
       {'name':'Rufisque Ouest'},
       {'name':'Rufisque Nord'}
     ];
     break;
    }
   case '11':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Tivaouane Peulh-Niaga'}
     ];
     break;
    }
   case '12':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Yene'}
     ];
     break;
    }
   case '13':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Bargny'}
     ];
     break;
    }
   case '14':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Diamniadio'}
     ];
     break;
    }
   case '15':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Jaxaay-Plles-Niakoul Rab'}
     ];
     break;
    }
   case '16':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Sangalkam'}
     ];
     break;
    }
   case '17':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Sebikotane'}
     ];
     break;
    }
   case '18':{
     this.sdepartements=[
       {'name':'choisissez votre sous zone'},
       {'name':'Sendou'}
     ];
     break;
    }

   }
 }

 inscrire(){
    let paramInscrpt = {'token':'234576TVG5@u_45RRFT', 'prenom':this.prenom, 'nom':this.nom, 'email':this.email, 'telephone':this.telephone, 'nometps':this.nometps, 'nomshop':this.nomshop, adresse : JSON.stringify({'region':this.getRegionName(this.region), 'zone':this.getZoneName(this.zone), 'souszone':this.souszone, 'address':this.adresse}) } ;

    console.log("Nouvel Inscrit : "+JSON.stringify(paramInscrpt) ) ;
     this.authenticationService.inscrire(paramInscrpt).then( retourserveur => {} )
 }

 getRegionName(region){
  for ( let i=0; i<this.regions.length; i++)
    if(this.regions[i].id==region)
      return this.regions[i].name ;
 }
 getZoneName(zone){
  for (let i=0; i<this.departements.length; i++)
    if(this.departements[i].id==zone)
      return this.departements[i].name ;
 }
 

}