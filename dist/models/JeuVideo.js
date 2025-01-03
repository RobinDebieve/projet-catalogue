export class JeuVideo {
    constructor(id, titre, studio, plateforme, dateDeSortie, description) {
        this.id = id;
        this.titre = titre;
        this.studio = studio;
        this.plateforme = plateforme;
        this.dateDeSortie = dateDeSortie;
        this.description = description;
    }
    afficherDetails() {
        console.log(`${this.titre} - ${this.studio} sur ${this.plateforme}, sorti le ${this.dateDeSortie}.`);
    }
}
//# sourceMappingURL=JeuVideo.js.map