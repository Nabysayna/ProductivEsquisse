import { Component, OnInit ,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { AdminpdvServiceWeb } from '../../webServiceClients/Adminpdv/adminpdv.service';


@Component({
  selector: 'app-adminpdv-monitoring',
  templateUrl: './adminpdv-monitoring.component.html',
  styleUrls: ['./adminpdv-monitoring.component.css']
})
export class AdminpdvMonitoringComponent implements OnInit {
  public agent:any;
  public montants=undefined;
  public monitoringAdminpdvDeposit: any;
  public monitoringAdminpdvConsommationDepositService: any;
  loading = false ;
  selectdemanretrait=false;
  montant:number;
  ibanExcessif = false ;

  constructor(private adminpdvServiceWeb: AdminpdvServiceWeb) { }

  ngOnInit() {
    this.adminpdvServiceWeb.bilandeposit('azrrtt').then(adminpdvServiceWebList => {
      this.monitoringAdminpdvDeposit = adminpdvServiceWebList.response; 
    });
  }

    validerdmde(){
      this.selectdemanretrait = false;
      if (this.monitoringAdminpdvDeposit.etatdeposit < this.montant){
        this.ibanExcessif = true ;
        return 1 ;
      }

      this.loading = true ;
      this.adminpdvServiceWeb.demandeRetrait(this.montant.toString()).then(adminpdvserviceList => {
        this.loading = false ;
        this.montant = undefined ;
      });

    }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }

    clickeddemanderetrait(){
      this.selectdemanretrait = true;
    }
   
    @ViewChild('depositeModal') public depositeModal:ModalDirective;
    @ViewChild('dechargeModal') public dechargeModal:ModalDirective;
 
  public showdepositeModal():void {
    this.depositeModal.show();
  }
 
  public hidedepositeModal():void {
    this.depositeModal.hide();
   /* this.categoriea = "--- Catégorie ---" ;
    this.addtype = '' ;
    this.prixa = 0 ;*/
  }
  public chargeAgent(){
     var ag=this.agent.split('/');
     console.log('mag');
  }
   public showdechargeModal():void {
    this.depositeModal.hide();
    this.dechargeModal.show();
    
  }
  public validerdeposite(){
    this.montants=undefined;
    this.agent=undefined;
  }
   public hidedechargeModal():void {
    this.dechargeModal.hide();
    this.montants=undefined;
    this.agent=undefined;
  }
}
