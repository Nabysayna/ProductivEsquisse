export class AchatJula {
  constructor(
    public id:number,
    public noma: string,
    public prenoma: string,
    public tela: number,
     public tca: string,
    public nbc: number,
    public mnt: number
   
  ) {  }
}


export class ReglSenelec {
  constructor(
    public id:number,
    public refi: string,
    public mntf: number,
    public nomp: string,
     public prenomp: string,
    public teli: number
   
  ) {  }
}


export class AchatCodeWoyofal {
  constructor(
    public id:number,
    public nomc: string,
     public prenomc: string,
    public telc: number,
    public monts: number,
     public compteur: string,
   
  ) {  }
}

export class RechargeEspece{
  constructor(
    public id:number,
    public montant: number,
    public tel: number,
   
  ) {  }
}

export class AchatCreditTel{
  constructor(
    public id:number,
    public tel: number,
    public mnt: number,
   
  ) {  }
}

export class RetraitEspece{
  constructor(
    public id:number,
    public tel: number,
    public mnt: number,
   
  ) {  }
}




