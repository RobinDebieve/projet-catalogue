export class SearchController {
    filterGames(games: any[], query: string): any[] {
      return games.filter((game) =>
        game.titre.toLowerCase().includes(query) ||
        game.studio.toLowerCase().includes(query) ||
        game.plateforme.toLowerCase().includes(query)
      );
    }
  }
  