export class Bibliotheque {
    constructor(
      public idUtilisateur: number,
      public idJeux: number[]
    ) {}
  
    // Méthode pour ajouter un jeu
    ajouterJeu(idJeu: number): void {
      if (!this.idJeux.includes(idJeu)) {
        this.idJeux.push(idJeu);
        console.log(`Jeu ${idJeu} ajouté à la bibliothèque.`);
      } else {
        console.log(`Jeu ${idJeu} est déjà dans la bibliothèque.`);
      }
    }
  
    // Méthode pour retirer un jeu
    retirerJeu(idJeu: number): void {
      this.idJeux = this.idJeux.filter((jeu) => jeu !== idJeu);
      console.log(`Jeu ${idJeu} retiré de la bibliothèque.`);
    }
  }
  