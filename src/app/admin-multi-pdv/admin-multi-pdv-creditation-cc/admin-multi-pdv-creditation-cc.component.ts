import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import {UtilService} from "../../services/util.service";
import {ModalDirective} from "ng2-bootstrap";


@Component({
  selector: 'app-admin-multi-pdv-creditation-cc',
  templateUrl: 'admin-multi-pdv-creditation-cc.component.html',
  styleUrls: ['admin-multi-pdv-creditation-cc.component.css']
})
export class AdminmultipdvCreditationCCComponent implements OnInit {

  public listcredit:any[] = [];
  public getdetailcredit:any;
  public aacrediter:boolean = false;
  public idaacrediter:number = 0;
  public montantcredit:number;


  @ViewChild('voirplusdedemandeModal') public voirplusdedemandeModal:ModalDirective;
  @ViewChild('crediterModal') public crediterModal:ModalDirective;


  constructor(private _utilService:UtilService) { }

  ngOnInit() {
    console.log('Hi i am bot')
    this.listcreditmanager();
  }

  public showcrediterModal(item):void {
    this.getdetailcredit = item;
    this.crediterModal.show();
  }
  public hidecrediterModal():void {
    this.crediterModal.hide();
    console.log('crediterModal')
  }

  public showvoirplusdedemandeModal(item):void {
    this.getdetailcredit = item;
    this.voirplusdedemandeModal.show();
  }
  public hidevoirplusdedemandeModal():void {
    this.voirplusdedemandeModal.hide();
    console.log('hidevoirplusdedemandeModal')
  }

  listcreditmanager(){
    this._utilService.listcreditmanager()
      .subscribe(
        data => {
          if(data.errorCode){
            this.listcredit = data.message.map(function (opt) {
              return {
                datelastcredite:opt.getlistcedit.length==0?'never':opt.getlistcedit['0'].dateacrredit,
                idcc:opt.idcc,
                cc:opt.fullname,
                detailcredit:opt.getlistcedit,
                mcredite:opt.getlistcedit.length==0?0:opt.getlistcedit['0'].montant_acrredite,
                etatcredit:opt.getlistcedit.length==0?0:opt.getlistcedit['0'].montant_total,
              }
            });
          }
        },
        error => alert(error),
        () => {
          console.log('est testé init listcreditmanager')
        }
      );
  }

  valideraacredit(item){
      this.aacrediter = false;
      this.idaacrediter = 0;
      let data = {
        idcc:item.idcc,
        montantcredit:this.montantcredit,
        isexiste:item.detailcredit.length==0?false:true,
      }
      this._utilService.valideraacreditmanager(data)
        .subscribe(
          data => {
            console.log(data);
          },
          error => alert(error),
          () => {
            console.log('est testé init valideraacreditmanager')
          }
        );
  }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }
}
