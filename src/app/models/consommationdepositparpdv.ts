export class ConsommationDepositParPdv {
  constructor(
    public id: number,
    public pdv: string,
    public montantConsomme: number,
    public commission: number
  ) {  }
}
