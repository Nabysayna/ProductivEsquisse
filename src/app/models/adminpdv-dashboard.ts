export class AdminpdvDashboard {
  constructor(
    public id: number,
    public typeService: string,
    public nombreOperation: number,
    public montantRecu: number,
    public montantDonne: number,
    public montantTotal: number
  ) {  }
}
