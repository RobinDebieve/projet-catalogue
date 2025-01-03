export class Utilisateur {
  constructor(
    public username: string,
    public password: string,
    public email: string
  ) {}

  afficherDetails(): void {
    console.log(`Utilisateur: ${this.username}, Email: ${this.email}`);
  }
}
