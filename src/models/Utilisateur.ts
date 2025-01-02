export class Utilisateur {
    constructor(
      public id: number,
      public nom: string,
      public email: string,
      public motDePasse: string
    ) {}
  
    // Méthode pour afficher les infos d'un utilisateur
    afficherInfos(): void {
      console.log(`Utilisateur: ${this.nom} (${this.email})`);
    }
  }
  