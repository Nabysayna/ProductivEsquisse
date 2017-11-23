export class Recouvrementadminpdv {
  constructor(
    public id: number,
    public date: string,
    public pdv: string,
    public montantConsomme: number,
    public commission: number,
    public montantRecouvre: number,
    public montantRestant: number
  ) {  }
}
