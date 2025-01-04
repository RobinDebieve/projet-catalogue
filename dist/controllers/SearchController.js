export class SearchController {
    constructor(games, onGamesUpdated) {
        this.games = games;
        this.onGamesUpdated = onGamesUpdated;
    }
    // Filtre les jeux en fonction du mot-clé
    filterGames(keyword) {
        const filteredGames = this.games.filter((game) => game.titre.toLowerCase().includes(keyword));
        this.onGamesUpdated(filteredGames);
    }
}
//# sourceMappingURL=SearchController.js.map