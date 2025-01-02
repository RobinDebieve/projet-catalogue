export class Utilisateur {
    constructor(id, nom, email, motDePasse) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.motDePasse = motDePasse;
    }
    // Méthode pour afficher les infos d'un utilisateur
    afficherInfos() {
        console.log(`Utilisateur: ${this.nom} (${this.email})`);
    }
}
//# sourceMappingURL=Utilisateur.js.map