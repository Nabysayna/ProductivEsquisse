export class NAbonnement {
  constructor(
    public id:number,
    public nom: string,
     public prenom: string,
    public telephone: number,
    public numorchip: number,
     public nbrmois: number,
     public tbouquet: string,

  ) {  }
}

export class LAbonnement {
  constructor(
    public id:number,
    public nom: string,
  ) {  }
}

export class EFinancier {
  constructor(
    public id:number,
    public cautiond: number,
  ) {  }
}

