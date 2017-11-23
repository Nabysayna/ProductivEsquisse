export class AdminmultipdvRecouvrement {
  constructor(
    public daterecouvrement: string,
    public agent: string,
    public telephone: string,
    public adresse: string,
    public montantonsomme: number,
    public commission: number,
    public montantrecouvre: number,
    public montantrestant: number
  ) {  }
}
