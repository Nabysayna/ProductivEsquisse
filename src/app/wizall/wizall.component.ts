import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-wizall',
  templateUrl: './wizall.component.html',
  styleUrls: ['./wizall.component.css']
})
export class WizallComponent implements OnInit {  
	
   mnt : number;
   mntSDE : number = 15548;
   mntSENELEC : number = 3760;
   numclient : number;
   refclientsde : number ;
   refFactureSDE : string  = "00300108000039701061701";
   numpolice : number ;
   numFactureSenelec : number = 7056123;

  constructor() {}

  ngOnInit() {}

  reinitialise(){
   this.mnt=undefined;
   this.numclient=undefined;
  }



  @ViewChild('modaldepot') public modaldepot:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalsde') public modalsde:ModalDirective;
  @ViewChild('modalsenelec') public modalsenelec:ModalDirective;

    public depotmodal(){ 
       this.modaldepot.show();
    }
    public retirermodal(){  
       this.modalretrait.show();
    }

    fermermodaldepot(){
      this.modaldepot.hide();
    }

    fermermodalretrait(){
      this.modalretrait.hide();
    }

    public sdemodal(){ 
       this.modalsde.show();
    }
    public senelecmodal(){  
       this.modalsenelec.show();
    }

    fermersdemodal(){
      this.modalsde.hide();
    }

    fermersenelecmodal(){
      this.modalsenelec.hide();
    }

    deposer(){
      this.fermermodaldepot() ;
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall depot','operateur':5,'operation':1,'montant':this.mnt,'num':this.numclient}));
    }

    retirer(){
      this.fermermodalretrait() ;
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall retrait','operateur':5,'operation':2,'montant':this.mnt,'num':this.numclient}));    
    }

    payerSDE(){
      this.fermersdemodal() ;
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall SDE','operateur':5,'operation':3,'montant':this.mntSDE,'refclient':this.refclientsde,'refFacture':this.refFactureSDE}));        
    }

    payerSenelec(){
       this.fermersenelecmodal() ;
       sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall Senelec','operateur':5,'operation':3,'montant':this.mntSENELEC,'police':this.numpolice, 'numfacture':this.numFactureSenelec}));       
    }

}
