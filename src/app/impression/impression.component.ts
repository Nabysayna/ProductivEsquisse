import { Component, OnInit } from '@angular/core';
import { Location }               from '@angular/common';


@Component({
  selector: 'app-impression',
  templateUrl: 'impression.component.html',
  styleUrls: ['impression.component.css']
})
export class ImpressionComponent implements OnInit {

    formvisible = '' ;

  dataImpression:any;
  operateur:any;
  today: number = Date.now();

  constructor(private _location: Location) {

  }

  ngOnInit():void {
    this.dataImpression = JSON.parse(sessionStorage.getItem('dataImpression'));
    this.operateur = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById(this.dataImpression.apiservice+'recuimpression'+this.dataImpression.service).innerHTML;
    popupWin = window.open('', '_blank', 'left=0,top=0,height=800,width=800,innerheight=800,innerwidth=1000');
    popupWin.document.open();
    popupWin.document.write(`
          <html>
              <head>
                  <style>
                      //........Customized style.......
                      
                  </style>
              </head>
              <body onload="window.print();window.close()">${printContents}<br/><h4 style="text-align: center"><u>Le guichetier</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>Le client</u></h4><br/><br/><br/><hr/><br/><p>${(new Date()).toLocaleDateString("fr-FR")}</p>${printContents}<br/><h4 style="text-align: center"><u>Le guichetier</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>Le client</u></h4></body>
          </html>`
    );
    popupWin.document.close();
  }

  backClicked() {
    this._location.back();
  }

}
