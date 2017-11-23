import { Injectable }    from '@angular/core';

import { Solde } from './soldemodels';
import { SoldeList } from './soldemock';

@Injectable()
export class SoldeService {

  getSoldeList(): Promise<Solde[]> {
    return Promise.resolve(SoldeList);
  }
  
  getSolde(id: number): Solde {
    return SoldeList.find(solde => solde.id === id);
  }

}