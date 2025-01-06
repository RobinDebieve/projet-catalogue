import { IUtilisateur } from "./IUtilisateur.js";

export class Utilisateur implements IUtilisateur {
  constructor(
    public username: string,
    public password: string,
    public email?: string
  ) {}

  afficherDetails(): void {
    console.log(`Utilisateur: ${this.username}, Email: ${this.email ?? "N/A"}`);
  }
}
