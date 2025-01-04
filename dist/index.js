var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { GameController } from "./controllers/GameController.js";
import { GameView } from "./views/GameView.js";
import { JeuVideo } from "./models/JeuVideo.js";
import { UserController } from "./controllers/UserController.js";
import { UserView } from "./views/UserView.js";
import { SortController } from "./controllers/SortController.js";
import { SearchController } from "./controllers/SearchController.js";
// Initialisation
const gameView = new GameView("gameList");
const gameController = new GameController((games) => {
    gameView.renderGames(games);
    updateControllers(games); // Met à jour les contrôleurs lors du chargement
});
const userController = new UserController();
const userView = new UserView();
// Sort and Search Controllers
let sortController;
let searchController;
// Mise à jour des contrôleurs
function updateControllers(games) {
    // Initialisation si non définis
    if (!sortController) {
        sortController = new SortController(games, (sortedGames) => gameView.renderGames(sortedGames));
    }
    else {
        sortController.updateGames(games); // Met à jour le tri avec les nouveaux jeux
    }
    if (!searchController) {
        searchController = new SearchController(games, (filteredGames) => gameView.renderGames(filteredGames));
    }
    else {
        searchController = new SearchController(games, (filteredGames) => gameView.renderGames(filteredGames));
    }
}
// Chargement des jeux en fonction de l'état de connexion
function loadGamesForUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = userController.getUser();
        if (user) {
            fetch("./data/bibliotheque.json")
                .then((response) => response.json())
                .then((data) => {
                const library = data[user.username] || [];
                gameController.loadGames(library);
            })
                .catch(() => alert("Erreur lors du chargement de la bibliothèque."));
        }
        else {
            fetch("./data/jeux.json")
                .then((response) => response.json())
                .then((data) => gameController.loadGames(data))
                .catch(() => alert("Erreur lors du chargement des jeux."));
        }
    });
}
// Mise à jour de l'interface utilisateur
function updateAuthUI() {
    var _a, _b;
    const authContainer = document.getElementById("authContainer");
    if (authContainer) {
        if (userController.isLoggedIn()) {
            const user = userController.getUser();
            authContainer.innerHTML = `<p>Bienvenue, ${user.username}</p><button id="logoutBtn">Déconnexion</button>`;
            (_a = document.getElementById("logoutBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                userController.logout();
                alert("Déconnexion réussie.");
                location.reload();
            });
        }
        else {
            userView.renderLoginForm("authContainer", (username, password) => {
                if (userController.login(username, password)) {
                    alert("Connexion réussie.");
                    loadGamesForUser();
                    updateAuthUI();
                }
                else {
                    alert("Identifiants incorrects.");
                }
            });
            const signupLink = document.createElement("p");
            signupLink.innerHTML =
                "Pas encore de compte ? <a href='#' id='showSignup'>Inscrivez-vous</a>";
            authContainer.appendChild(signupLink);
            (_b = document.getElementById("showSignup")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                userView.renderSignupForm("authContainer", (username, password) => __awaiter(this, void 0, void 0, function* () {
                    const success = yield userController.addUser(username, password);
                    if (success) {
                        alert("Compte créé avec succès. Connectez-vous maintenant.");
                        location.reload();
                    }
                    else {
                        alert("Échec de la création du compte. Nom d'utilisateur déjà pris.");
                    }
                }));
            }));
        }
    }
}
// Charger les jeux au démarrage
document.addEventListener("DOMContentLoaded", () => {
    loadGamesForUser();
    updateAuthUI();
});
// Gestion du formulaire d'ajout
const addGameForm = document.getElementById("addGameForm");
addGameForm === null || addGameForm === void 0 ? void 0 : addGameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const studio = document.getElementById("studio").value;
    const platform = document.getElementById("platform").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const description = document.getElementById("description").value;
    if (!title || !studio || !platform || !releaseDate || !description) {
        alert("Veuillez remplir tous les champs !");
        return;
    }
    const newGame = new JeuVideo(Date.now(), title, studio, platform, releaseDate, description);
    gameController.addGame(newGame);
    updateControllers(gameController.getGames()); // Mise à jour des contrôleurs
    addGameForm.reset();
});
// Recherche et tri
(_a = document.getElementById("search")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    searchController.filterGames(keyword);
});
(_b = document.getElementById("sort")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", (e) => {
    const sortOption = e.target.value;
    sortController.sortGames(sortOption); // Tri en fonction de l'option choisie
});
// Gestion de la suppression
(_c = document.getElementById("gameList")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("removeBtn")) {
        const id = parseInt(target.getAttribute("data-id") || "0", 10);
        gameController.removeGame(id);
        updateControllers(gameController.getGames()); // Mise à jour des contrôleurs après suppression
    }
});
//# sourceMappingURL=index.js.map