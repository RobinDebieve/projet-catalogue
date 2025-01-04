import { JeuVideo } from "../models/JeuVideo.js";

export class GameController {
  private games: JeuVideo[];
  private onGamesUpdated: (games: JeuVideo[]) => void;

  constructor(onGamesUpdated: (games: JeuVideo[]) => void) {
    this.games = [];
    this.onGamesUpdated = onGamesUpdated;
  }

  // Charge les jeux depuis une URL (string) ou un tableau de JeuVideo
  async loadGames(source: string | JeuVideo[]): Promise<void> {
    if (typeof source === "string") {
      try {
        const response = await fetch(source);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des jeux depuis " + source);
        }
        const data: JeuVideo[] = await response.json();
        this.games = data;
      } catch (error) {
        console.error("Erreur :", error);
        this.games = [];
      }
    } else {
      this.games = source; // JeuVideo[]
    }
    this.onGamesUpdated(this.games);
  }

  getGames(): JeuVideo[] {
    return this.games;
  }

  addGame(game: JeuVideo): void {
    this.games.push(game);
    this.onGamesUpdated(this.games);
  }

  removeGame(id: number): void {
    this.games = this.games.filter((game) => game.id !== id);
    this.onGamesUpdated(this.games);
  }
}
