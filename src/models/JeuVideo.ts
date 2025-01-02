export class JeuVideo {
    constructor(
      public id: number,
      public titre: string,
      public studio: string,
      public plateforme: string,
      public dateDeSortie: string,
      public description: string
    ) {}
  
    // Méthode pour afficher les détails d'un jeu vidéo
    afficherDetails(): void {
      console.log(`${this.titre} - ${this.studio} (${this.plateforme})`);
    }
  }
  