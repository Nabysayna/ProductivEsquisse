import { Injectable }    from '@angular/core';


import { NAbonnement} from './tntmodels';
import { NAbonnementList } from './tntmock';


import { LAbonnement} from './tntmodels';
import { LAbonnementList } from './tntmock';


import { EFinancier} from './tntmodels';
import { EFinancierList } from './tntmock';

@Injectable()
export class NAbonnementService {

  getNAbonnementList(): Promise<NAbonnement[]> {
    return Promise.resolve(NAbonnementList);
  }
  
  getNAbonnement(id: number): NAbonnement {
    return NAbonnementList.find(nAbonnement => nAbonnement.id === id);
  }

} 

@Injectable()
export class LAbonnementService {

  getLAbonnementList(): Promise<LAbonnement[]> {
    return Promise.resolve(LAbonnementList);
  }
  
  getLAbonnement(id: number): LAbonnement {
    return LAbonnementList.find(lAbonnement => lAbonnement.id === id);
  }

} 

@Injectable()
export class EFinancierService {

  getEFinancierList(): Promise<EFinancier[]> {
    return Promise.resolve(EFinancierList);
  }
  
  getEFinancier(id: number): EFinancier {
    return EFinancierList.find(eFinancier => eFinancier.id === id);
  }

} 