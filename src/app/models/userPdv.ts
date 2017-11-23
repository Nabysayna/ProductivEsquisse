export class UserPdv {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public email: string,
    public password: string,
    public pays: string,
    public region: string,
    public ville: string,
    public adresse: string,
    public telephone: number
  ) {  }
}