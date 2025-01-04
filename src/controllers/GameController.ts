import { JeuVideo } from "../models/JeuVideo.js";

export class GameController {
  private games: JeuVideo[];
  private onGamesUpdated: (games: JeuVideo[]) => void;

  constructor(onGamesUpdated: (games: JeuVideo[]) => void) {
    this.games = [];
    this.onGamesUpdated = onGamesUpdated;
  }

  // Charge les jeux depuis un tableau ou JSON
  async loadGames(source: string | JeuVideo[]) {
    if (typeof source === "string") {
      try {
        const response = await fetch(source);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des jeux.");
        }
        const data = await response.json();
        this.games = data;
      } catch (error) {
        console.error("Erreur :", error);
        this.games = [];
      }
    } else {
      this.games = source;
    }
    this.onGamesUpdated(this.games);
  }

  // Retourne la liste des jeux
  getGames(): JeuVideo[] {
    return this.games;
  }

  // Ajoute un jeu
  addGame(game: JeuVideo) {
    this.games.push(game);
    this.onGamesUpdated(this.games);
  }

  // Supprime un jeu par ID
  removeGame(id: number) {
    this.games = this.games.filter((game) => game.id !== id);
    this.onGamesUpdated(this.games);
  }

  // Filtrage des jeux
  filterGames(keyword: string) {
    const filteredGames = this.games.filter((game) =>
      game.titre.toLowerCase().includes(keyword)
    );
    this.onGamesUpdated(filteredGames);
  }

  // Tri des jeux
  sortGames(order: string) {
    if (order === "title-asc") {
      this.games.sort((a, b) => a.titre.localeCompare(b.titre));
    } else if (order === "title-desc") {
      this.games.sort((a, b) => b.titre.localeCompare(a.titre));
    } else if (order === "date-asc") {
      this.games.sort((a, b) => new Date(a.dateDeSortie).getTime() - new Date(b.dateDeSortie).getTime());
    } else if (order === "date-desc") {
      this.games.sort((a, b) => new Date(b.dateDeSortie).getTime() - new Date(a.dateDeSortie).getTime());
    }
    this.onGamesUpdated(this.games);
  }
}
