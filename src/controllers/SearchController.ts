import { JeuVideo } from "../models/JeuVideo.js";

export class SearchController {
  private games: JeuVideo[];
  private onGamesUpdated: (games: JeuVideo[]) => void;

  constructor(games: JeuVideo[], onGamesUpdated: (games: JeuVideo[]) => void) {
    this.games = games;
    this.onGamesUpdated = onGamesUpdated;
  }

  filterGames(keyword: string): void {
    const loweredKeyword = keyword.toLowerCase();
    const filteredGames = this.games.filter((game) =>
      game.titre.toLowerCase().includes(loweredKeyword)
    );
    this.onGamesUpdated(filteredGames);
  }
}
