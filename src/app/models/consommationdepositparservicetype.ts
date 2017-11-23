export class ConsommationDepositParServiceType {
  constructor(
    public id: number,
    public service: string,
    public montantConsomme: number,
    public commission: number
  ) {  }
}
