export class JeuVideo {
  constructor(
    public id: number,
    public titre: string,
    public studio: string,
    public plateforme: string,
    public dateDeSortie: string,
    public description: string
  ) {}

  afficherDetails(): void {
    console.log(
      `${this.titre} - ${this.studio} sur ${this.plateforme}, sorti le ${this.dateDeSortie}.`
    );
  }
}
