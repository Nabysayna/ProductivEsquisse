export class CashIn {
  constructor(
    public id:number,
    public telephone: number,
    public montant: number,
    public idclient: string,
     public password: string,
  ) {  }
}

export class CashOut {
  constructor(
    public id:number,
    public tel: number,
    public mont: number,
    public idc: string,
     public pass: string,
  ) {  }
}

export class AgentTopUp {
  constructor(
    public id:number,
    public phone: number,
    public mntt: number,
    public idcl: string,
     public pwd: string,
  ) {  }
}

export class MyAccount {
  constructor(
    public id:number,
    public idcli: string,
     public mdp: string,
  ) {  }
}