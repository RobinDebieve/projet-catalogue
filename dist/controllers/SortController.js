export class SortController {
    sortGames(games, option) {
        if (option === "title") {
            return games.sort((a, b) => a.titre.localeCompare(b.titre));
        }
        else if (option === "date") {
            return games.sort((a, b) => new Date(a.dateDeSortie).getTime() -
                new Date(b.dateDeSortie).getTime());
        }
        else if (option === "title-desc") {
            return games.sort((a, b) => b.titre.localeCompare(a.titre));
        }
        else if (option === "date-desc") {
            return games.sort((a, b) => new Date(b.dateDeSortie).getTime() -
                new Date(a.dateDeSortie).getTime());
        }
        return games;
    }
}
//# sourceMappingURL=SortController.js.map