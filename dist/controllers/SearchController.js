export class SearchController {
    filterGames(games, query) {
        return games.filter((game) => game.titre.toLowerCase().includes(query) ||
            game.studio.toLowerCase().includes(query) ||
            game.plateforme.toLowerCase().includes(query));
    }
}
//# sourceMappingURL=SearchController.js.map