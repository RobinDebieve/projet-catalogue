var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class GameController {
    constructor(onGamesUpdated) {
        this.games = [];
        this.onGamesUpdated = onGamesUpdated;
    }
    // Charge les jeux depuis un tableau ou JSON
    loadGames(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof source === "string") {
                try {
                    const response = yield fetch(source);
                    if (!response.ok) {
                        throw new Error("Erreur lors du chargement des jeux.");
                    }
                    const data = yield response.json();
                    this.games = data;
                }
                catch (error) {
                    console.error("Erreur :", error);
                    this.games = [];
                }
            }
            else {
                this.games = source;
            }
            this.onGamesUpdated(this.games);
        });
    }
    // Retourne la liste des jeux
    getGames() {
        return this.games;
    }
    // Ajoute un jeu
    addGame(game) {
        this.games.push(game);
        this.onGamesUpdated(this.games);
    }
    // Supprime un jeu par ID
    removeGame(id) {
        this.games = this.games.filter((game) => game.id !== id);
        this.onGamesUpdated(this.games);
    }
}
//# sourceMappingURL=GameController.js.map