export class Bibliotheque {
  constructor(
    public idUtilisateur: number,
    public gameIds: number[]
  ) {}

  ajouterJeu(idJeu: number): void {
    if (!this.gameIds.includes(idJeu)) {
      this.gameIds.push(idJeu);
      console.log(`Jeu ${idJeu} ajouté à la bibliothèque.`);
    } else {
      console.log(`Jeu ${idJeu} est déjà dans la bibliothèque.`);
    }
  }

  retirerJeu(idJeu: number): void {
    this.gameIds = this.gameIds.filter((jeu) => jeu !== idJeu);
    console.log(`Jeu ${idJeu} retiré de la bibliothèque.`);
  }
}
