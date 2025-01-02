export class Bibliotheque {
    constructor(idUtilisateur, idJeux) {
        this.idUtilisateur = idUtilisateur;
        this.idJeux = idJeux;
    }
    // Méthode pour ajouter un jeu
    ajouterJeu(idJeu) {
        if (!this.idJeux.includes(idJeu)) {
            this.idJeux.push(idJeu);
            console.log(`Jeu ${idJeu} ajouté à la bibliothèque.`);
        }
        else {
            console.log(`Jeu ${idJeu} est déjà dans la bibliothèque.`);
        }
    }
    // Méthode pour retirer un jeu
    retirerJeu(idJeu) {
        this.idJeux = this.idJeux.filter((jeu) => jeu !== idJeu);
        console.log(`Jeu ${idJeu} retiré de la bibliothèque.`);
    }
}
//# sourceMappingURL=Bibliotheque.js.map