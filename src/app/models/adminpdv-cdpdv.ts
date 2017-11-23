export class AdminpdvConsommationDepositPdv {
  constructor(
    public pdv: string,
    public adresse: string,
    public montantconsomme: number,
    public commission: number
  ) {  }
}
