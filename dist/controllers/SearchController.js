export class SearchController {
    constructor(games, onGamesUpdated) {
        this.games = games;
        this.onGamesUpdated = onGamesUpdated;
    }
    filterGames(keyword) {
        const loweredKeyword = keyword.toLowerCase();
        const filteredGames = this.games.filter((game) => game.titre.toLowerCase().includes(loweredKeyword));
        this.onGamesUpdated(filteredGames);
    }
}
//# sourceMappingURL=SearchController.js.map