import { JeuVideo } from "../models/JeuVideo.js";

export class SearchController {
  private games: JeuVideo[];
  private onGamesUpdated: (games: JeuVideo[]) => void;

  constructor(games: JeuVideo[], onGamesUpdated: (games: JeuVideo[]) => void) {
    this.games = games;
    this.onGamesUpdated = onGamesUpdated;
  }

  // Filtre les jeux en fonction du mot-clé
  filterGames(keyword: string) {
    const filteredGames = this.games.filter((game) =>
      game.titre.toLowerCase().includes(keyword)
    );
    this.onGamesUpdated(filteredGames);
  }
}
