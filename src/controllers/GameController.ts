import { SearchController } from "./SearchController.js";
import { SortController } from "./SortController.js";

export class GameController {
  private games: any[] = [];
  private filteredGames: any[] = [];
  private searchController = new SearchController();
  private sortController = new SortController();

  constructor(private renderGames: (games: any[]) => void) {}

  async loadGames(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      this.games = await response.json();
      this.filteredGames = [...this.games];
      this.renderGames(this.filteredGames);
    } catch (error) {
      console.error("Erreur lors du chargement des jeux :", error);
    }
  }

  addGame(game: any) {
    this.games.push(game);
    this.filteredGames = [...this.games];
    this.renderGames(this.filteredGames);
  }

  removeGame(id: number) {
    this.games = this.games.filter((game) => game.id !== id);
    this.filteredGames = [...this.games];
    this.renderGames(this.filteredGames);
  }

  filterGames(query: string) {
    this.filteredGames = this.searchController.filterGames(this.games, query);
    this.renderGames(this.filteredGames);
  }

  sortGames(option: string) {
    this.filteredGames = this.sortController.sortGames(
      [...this.filteredGames],
      option
    );
    this.renderGames(this.filteredGames);
  }
}
