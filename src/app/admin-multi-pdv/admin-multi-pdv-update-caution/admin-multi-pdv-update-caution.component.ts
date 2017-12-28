import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { AdminmultipdvMajcaution }    from '../../models/adminmultipdv-majcaution';
import { AdminmultipdvServiceWeb } from '../../webServiceClients/Adminmultipdv/adminmultipdv.service';


@Component({
  selector: 'app-admin-multi-pdv-update-caution',
  templateUrl: './admin-multi-pdv-update-caution.component.html',
  styleUrls: ['./admin-multi-pdv-update-caution.component.css']
})
export class AdminmultipdvUpdateCautionComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "adminpdv";
  public sortOrder = "desc";

  public adminmultipdvMajcaution: AdminmultipdvMajcaution[];
  loading = false ;

  inputCaution: number;
  majcaution:AdminmultipdvMajcaution;
  constructor(private adminmultipdvServiceWeb: AdminmultipdvServiceWeb) { }

  ngOnInit() {
    this.loading = true ;
    this.listmajcautions();
  }

  listmajcautions(){
    this.adminmultipdvServiceWeb.listmajcautions('azrrtt').then(adminmultipdvServiceWebList => {
      if(adminmultipdvServiceWebList.errorCode == 1){
        this.adminmultipdvMajcaution = adminmultipdvServiceWebList.response.map(function (elt) {
          return {
            adminpdv:elt.adminpdv,
            adresse: JSON.parse(elt.adresse).address,
            cautioninitiale:elt.cautioninitiale,
            date_last_deposit:elt.date_last_deposit.date.split('.')[0],
            idcaution:elt.idcaution,
            montantconsomme:elt.montantconsomme,
            telephone:elt.telephone
          }
        })
        console.log(this.adminmultipdvMajcaution);
      }
      else{
        this.adminmultipdvMajcaution = [];
      }
      this.loading = false ;
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.adminpdv.length;
  }

  public maj(item):void {
    this.inputCaution = null;
    this.majcaution = item;
  }

  public validermaj(item):void {
    this.loading = true ;
    this.adminmultipdvServiceWeb.modifymajcaution('azrrtt', this.majcaution.idcaution, this.inputCaution).then(adminmultipdvServiceWebList => {
      console.log(adminmultipdvServiceWebList);
      this.closeModal();
      this.loading = false ;
      this.listmajcautions();
    });
  }

}
