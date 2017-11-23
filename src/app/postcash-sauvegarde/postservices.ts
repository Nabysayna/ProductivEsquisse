import { Injectable }    from '@angular/core';

import { AchatJula } from './postmodels';
import { AchatJulaList } from './postmock';

import { ReglSenelec } from './postmodels';
import { ReglSenelecList } from './postmock';

import { AchatCodeWoyofal } from './postmodels';
import { AchatCodeWoyofalList } from './postmock';


import { RechargeEspece } from './postmodels';
import { RechargeEspeceList } from './postmock';


import { AchatCreditTel } from './postmodels';
import { AchatCreditTelList } from './postmock';


import { RetraitEspece } from './postmodels';
import { RetraitEspeceList } from './postmock';


@Injectable()
export class AchatJulaService {

  getAchatJulaList(): Promise<AchatJula[]> {
    return Promise.resolve(AchatJulaList);
  }
  
  getAchatJula(id: number): AchatJula {
    return AchatJulaList.find(achatJula => achatJula.id === id);
  }

} 


@Injectable()
export class ReglSenelecService {

  getRelSenelecList(): Promise<ReglSenelec[]> {
    return Promise.resolve(ReglSenelecList);
  }
  
  getReglSenelec(id: number): ReglSenelec {
    return ReglSenelecList.find(reglsenelec => reglsenelec.id === id);
  }

} 


@Injectable()
export class AchatCodeWoyofalService {

  getAchatCodeWoyofalList(): Promise<AchatCodeWoyofal[]> {
    return Promise.resolve(AchatCodeWoyofalList);
  }
  
  getAchatCodeWoyofal(id: number): AchatCodeWoyofal {
    return AchatCodeWoyofalList.find(achatCodeWoyofal => achatCodeWoyofal.id === id);
  }

} 


@Injectable()
export class RechargeEspeceService {

  getRechargeEspeceList(): Promise<RechargeEspece[]> {
    return Promise.resolve(RechargeEspeceList);
  }
  
  getRechargeEspece(id: number): RechargeEspece {
    return RechargeEspeceList.find(rechargeEspece => rechargeEspece.id === id);
  }

} 

@Injectable()
export class AchatCreditTelService {

  getAchatCreditTelList(): Promise<AchatCreditTel[]> {
    return Promise.resolve(AchatCreditTelList);
  }
  
  getAchatCreditTel(id: number): AchatCreditTel{
    return AchatCreditTelList.find(achatCreditTel => achatCreditTel.id === id);
  }

} 

@Injectable()
export class RetraitEspeceService {

  getRetraitEspeceList(): Promise<RetraitEspece[]> {
    return Promise.resolve(RetraitEspeceList);
  }
  
  getRetraitEspece(id: number): RetraitEspece {
    return RetraitEspeceList.find(retraitEspece => retraitEspece.id === id);
  }

} 



