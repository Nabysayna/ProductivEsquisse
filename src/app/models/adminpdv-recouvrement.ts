export class AdminpdvRecouvrement {
  constructor(
    public daterecouvrement: string,
    public pdv: string,
    public montantonsomme: number,
    public commission: number,
    public montantrecouvre: number,
    public montantrestant: number
  ) {  }
}
