import { Injectable }    from '@angular/core';

import { CashIn } from './expressomodels';
import { CashInList } from './expressomock';


import { CashOut} from './expressomodels';
import { CashOutList } from './expressomock';


import { AgentTopUp} from './expressomodels';
import { AgentTopUpList } from './expressomock';


import { MyAccount} from './expressomodels';
import { MyAccountList } from './expressomock';

@Injectable()
export class CashInService {

  getCashInList(): Promise<CashIn[]> {
    return Promise.resolve(CashInList);
  }
  
  getCashIn(id: number): CashIn {
    return CashInList.find(cashIn => cashIn.id === id);
  }

} 

@Injectable()
export class CashOutService {

  getCashOutList(): Promise<CashOut[]> {
    return Promise.resolve(CashOutList);
  }
  
  getCashOut(id: number): CashOut {
    return CashOutList.find(cashOut => cashOut.id === id);
  }

} 

@Injectable()
export class AgentTopUpService {

  getAgentTopUpList(): Promise<AgentTopUp[]> {
    return Promise.resolve(AgentTopUpList);
  }
  
  getAgentTopUp(id: number): AgentTopUp {
    return AgentTopUpList.find(agentTopUp => agentTopUp.id === id);
  }

} 

@Injectable()
export class MyAccountService {

  getMyAccountList(): Promise<MyAccount[]> {
    return Promise.resolve(MyAccountList);
  }
  
  getMyAccount(id: number): MyAccount {
    return MyAccountList.find(myAccount => myAccount.id === id);
  }

} 