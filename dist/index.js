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
const gameView = new GameView("gameList");
const userController = new UserController();
const userView = new UserView();
let sortController;
let searchController;
const gameController = new GameController((games) => {
    gameView.renderGames(games);
    syncControllers(games);
});
// Synchronise les jeux avec les contrôleurs de tri/recherche
function syncControllers(games) {
    if (!sortController) {
        sortController = new SortController(games, (sortedGames) => {
            gameView.renderGames(sortedGames);
        });
    }
    else {
        sortController.updateGames(games);
    }
    if (!searchController) {
        searchController = new SearchController(games, (filteredGames) => {
            gameView.renderGames(filteredGames);
        });
    }
    else {
        searchController = new SearchController(games, (filteredGames) => {
            gameView.renderGames(filteredGames);
        });
    }
}
/**
 * Sauvegarde la bibliothèque courante (gameController.getGames()) dans localStorage
 * sous la clé "library_<username>" si l'utilisateur est connecté.
 */
function saveLibraryToLocalStorage() {
    const user = userController.getUser();
    if (!user)
        return;
    const library = gameController.getGames();
    localStorage.setItem(`library_${user.username}`, JSON.stringify(library));
}
/**
 * Charge la bibliothèque d'un utilisateur depuis localStorage (si existant)
 * ou depuis bibliotheque.json (sinon).
 * Pour un utilisateur non connecté, on charge jeux.json.
 */
function loadGamesForUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = userController.getUser();
        try {
            if (user) {
                // 1) Regarder s'il existe une bibliothèque en localStorage
                const localLibKey = `library_${user.username}`;
                const localLib = localStorage.getItem(localLibKey);
                if (localLib) {
                    console.log("[loadGamesForUser] Chargement depuis localStorage");
                    const library = JSON.parse(localLib);
                    yield gameController.loadGames(library);
                }
                else {
                    // sinon, on prend bibliotheque.json UNE FOIS
                    console.log("[loadGamesForUser] Chargement depuis bibliotheque.json");
                    const response = yield fetch("./data/bibliotheque.json");
                    const data = yield response.json();
                    const library = data[user.username] || [];
                    yield gameController.loadGames(library);
                    // Puis on enregistre en localStorage
                    localStorage.setItem(localLibKey, JSON.stringify(library));
                }
            }
            else {
                // Pas connecté => on charge jeux.json
                const response = yield fetch("./data/jeux.json");
                const data = yield response.json();
                yield gameController.loadGames(data);
            }
        }
        catch (err) {
            alert("Erreur lors du chargement des jeux.");
            console.error(err);
        }
    });
}
/**
 * Met à jour l'UI d'authentification.
 */
function updateAuthUI() {
    var _a, _b;
    const authContainer = document.getElementById("authContainer");
    if (!authContainer)
        return;
    if (userController.isLoggedIn()) {
        const user = userController.getUser();
        if (user) {
            authContainer.innerHTML = `
        <p>Bienvenue, ${user.username}</p>
        <button id="logoutBtn">Déconnexion</button>
      `;
            (_a = document.getElementById("logoutBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                userController.logout();
                alert("Déconnexion réussie.");
                location.reload();
            });
        }
    }
    else {
        // Formulaire de connexion
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
        // Lien inscription
        const signupLink = document.createElement("p");
        signupLink.innerHTML = `
      Pas encore de compte ? <a href='#' id='showSignup'>Inscrivez-vous</a>
    `;
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
// Au chargement de la page
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadGamesForUser();
    updateAuthUI();
}));
// Formulaire d'ajout de jeu
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
    // Ajoute le jeu en mémoire
    gameController.addGame(newGame);
    // Sauvegarde la liste mise à jour dans localStorage pour l'utilisateur
    saveLibraryToLocalStorage();
    addGameForm.reset();
});
// Barre de recherche
(_a = document.getElementById("search")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    if (searchController) {
        searchController.filterGames(keyword);
    }
});
// Tri
(_b = document.getElementById("sort")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", (e) => {
    const sortOption = e.target.value;
    if (sortController) {
        sortController.sortGames(sortOption);
    }
});
// Suppression d'un jeu
(_c = document.getElementById("gameList")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("removeBtn")) {
        const id = parseInt(target.getAttribute("data-id") || "0", 10);
        gameController.removeGame(id);
        // Après suppression, on sauvegarde la liste mise à jour
        saveLibraryToLocalStorage();
    }
});
//# sourceMappingURL=index.js.map