export class JeuVideo {
    constructor(id, titre, studio, plateforme, dateDeSortie, description) {
        this.id = id;
        this.titre = titre;
        this.studio = studio;
        this.plateforme = plateforme;
        this.dateDeSortie = dateDeSortie;
        this.description = description;
    }
    // Méthode pour afficher les détails d'un jeu vidéo
    afficherDetails() {
        console.log(`${this.titre} - ${this.studio} (${this.plateforme})`);
    }
}
//# sourceMappingURL=JeuVideo.js.map