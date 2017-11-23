import { Injectable }    from '@angular/core';


import { EnvoiCash } from './jonimodels';
import { EnvoicashList } from './jonimock';

import { PaieCash } from './jonimodels';
import { PaiecashList } from './jonimock';


import { RechargeVitfe } from './jonimodels';
import { RechargeVitfeList } from './jonimock';


import { RechargeCarte } from './jonimodels';
import { RechargeCarteList } from './jonimock';


@Injectable()
export class EnvoicashService {

  getEnvoicashList(): Promise<EnvoiCash[]> {
    return Promise.resolve(EnvoicashList);
  }
  
  getEnvoicash(id: number): EnvoiCash {
    return EnvoicashList.find(envoiCash => envoiCash.id === id);
  }

}

@Injectable()
export class PaiecashService {

  getPaiecashList(): Promise<PaieCash[]> {
    return Promise.resolve(PaiecashList);
  }
  
  getPaieCash(idf: number): PaieCash {
    return PaiecashList.find(paieCash => paieCash.idf === idf);
  }

}

@Injectable()
export class RechargeVitfeService {

  getRechargeVitfeList(): Promise<RechargeVitfe[]> {
    return Promise.resolve(RechargeVitfeList);
  }
  
  getRechargeVitfe(id: number): RechargeVitfe {
    return RechargeVitfeList.find(rechargeVitfe => rechargeVitfe.id === id);
  }

} 

@Injectable()
export class RechargeCarteService {

  getRechargeCarteList(): Promise<RechargeCarte[]> {
    return Promise.resolve(RechargeCarteList);
  }
  
  getRechargeCarte(id: number): RechargeCarte {
    return RechargeCarteList.find(rechargeCarte => rechargeCarte.id === id);
  }

} 



