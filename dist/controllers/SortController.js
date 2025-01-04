export class SortController {
    constructor(games, onGamesUpdated) {
        this.games = games;
        this.onGamesUpdated = onGamesUpdated;
    }
    // Tri des jeux
    sortGames(order) {
        const sortedGames = [...this.games]; // Copie pour éviter de modifier l'original
        if (order === "title-asc") {
            sortedGames.sort((a, b) => a.titre.localeCompare(b.titre));
        }
        else if (order === "title-desc") {
            sortedGames.sort((a, b) => b.titre.localeCompare(a.titre));
        }
        else if (order === "date-asc") {
            sortedGames.sort((a, b) => new Date(a.dateDeSortie).getTime() - new Date(b.dateDeSortie).getTime());
        }
        else if (order === "date-desc") {
            sortedGames.sort((a, b) => new Date(b.dateDeSortie).getTime() - new Date(a.dateDeSortie).getTime());
        }
        this.onGamesUpdated(sortedGames); // Met à jour la vue avec les jeux triés
    }
    // Mise à jour des jeux après modification (ajout, suppression, chargement)
    updateGames(games) {
        this.games = games;
    }
}
//# sourceMappingURL=SortController.js.map