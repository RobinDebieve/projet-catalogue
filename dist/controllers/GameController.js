var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SearchController } from "./SearchController.js";
import { SortController } from "./SortController.js";
export class GameController {
    constructor(renderGames) {
        this.renderGames = renderGames;
        this.games = [];
        this.filteredGames = [];
        this.searchController = new SearchController();
        this.sortController = new SortController();
    }
    loadGames(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                this.games = yield response.json();
                this.filteredGames = [...this.games];
                this.renderGames(this.filteredGames);
            }
            catch (error) {
                console.error("Erreur lors du chargement des jeux :", error);
            }
        });
    }
    addGame(game) {
        this.games.push(game);
        this.filteredGames = [...this.games];
        this.renderGames(this.filteredGames);
    }
    removeGame(id) {
        this.games = this.games.filter((game) => game.id !== id);
        this.filteredGames = [...this.games];
        this.renderGames(this.filteredGames);
    }
    filterGames(query) {
        this.filteredGames = this.searchController.filterGames(this.games, query);
        this.renderGames(this.filteredGames);
    }
    sortGames(option) {
        this.filteredGames = this.sortController.sortGames([...this.filteredGames], option);
        this.renderGames(this.filteredGames);
    }
}
//# sourceMappingURL=GameController.js.map