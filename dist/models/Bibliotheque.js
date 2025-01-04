export class Bibliotheque {
    constructor(idUtilisateur, gameIds) {
        this.idUtilisateur = idUtilisateur;
        this.gameIds = gameIds;
    }
    ajouterJeu(idJeu) {
        if (!this.gameIds.includes(idJeu)) {
            this.gameIds.push(idJeu);
            console.log(`Jeu ${idJeu} ajouté à la bibliothèque.`);
        }
        else {
            console.log(`Jeu ${idJeu} est déjà dans la bibliothèque.`);
        }
    }
    retirerJeu(idJeu) {
        this.gameIds = this.gameIds.filter((jeu) => jeu !== idJeu);
        console.log(`Jeu ${idJeu} retiré de la bibliothèque.`);
    }
}
//# sourceMappingURL=Bibliotheque.js.map