import { JeuVideo } from "../models/JeuVideo.js";

export class SortController {
  private games: JeuVideo[];
  private onGamesUpdated: (games: JeuVideo[]) => void;

  constructor(games: JeuVideo[], onGamesUpdated: (games: JeuVideo[]) => void) {
    this.games = games;
    this.onGamesUpdated = onGamesUpdated;
  }

  sortGames(order: string): void {
    const sortedGames = [...this.games]; // Copie pour éviter de modifier l'original

    if (order === "title-asc") {
      sortedGames.sort((a, b) => a.titre.localeCompare(b.titre));
    } else if (order === "title-desc") {
      sortedGames.sort((a, b) => b.titre.localeCompare(a.titre));
    } else if (order === "date-asc") {
      sortedGames.sort(
        (a, b) =>
          new Date(a.dateDeSortie).getTime() - new Date(b.dateDeSortie).getTime()
      );
    } else if (order === "date-desc") {
      sortedGames.sort(
        (a, b) =>
          new Date(b.dateDeSortie).getTime() - new Date(a.dateDeSortie).getTime()
      );
    }

    this.onGamesUpdated(sortedGames);
  }

  updateGames(games: JeuVideo[]): void {
    this.games = games;
  }
}
