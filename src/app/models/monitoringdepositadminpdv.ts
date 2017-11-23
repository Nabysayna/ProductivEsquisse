export class MonitoringDepositAdminpdv {
  constructor(
    public id: number,
    public adminpdv: string,
    public depositInitial: number,
    public depositConsomme: number,
    public depositRestant: number,
    public commission: number
  ) {  }
}
