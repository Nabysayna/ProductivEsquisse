export class AdminmultipdvDemanderetrait {
  constructor(
    public iddemanderetrait: number,
    public datedemanderetrait: any,
    public agent: string,
    public telephone: string,
    public adresse: string,
    public montantdemande: number,
    public etatdemande: string,
  ) {  }
}
