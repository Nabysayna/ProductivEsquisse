export class CompteAccess {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public codesecret: string,
    public role: string,
    public token: string
  ) {  }
}
