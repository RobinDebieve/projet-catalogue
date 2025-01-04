var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d;
import { GameController } from "./controllers/GameController.js";
import { GameView } from "./views/GameView.js";
import { JeuVideo } from "./models/JeuVideo.js";
import { UserController } from "./controllers/UserController.js";
import { UserView } from "./views/UserView.js";
// Initialisation
const gameView = new GameView("gameList");
const gameController = new GameController((games) => gameView.renderGames(games));
const userController = new UserController();
const userView = new UserView();
// Chargement des jeux en fonction de l'état de connexion
function loadGamesForUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = userController.getUser();
        if (user) {
            // Si connecté, charger la bibliothèque personnelle
            fetch("./data/bibliotheque.json")
                .then(response => response.json())
                .then(data => {
                const library = data[user.username] || [];
                console.log("Bibliothèque chargée : ", library); // Debugging
                gameController.loadGames(library);
            })
                .catch(() => alert("Erreur lors du chargement de la bibliothèque."));
        }
        else {
            // Si déconnecté, charger les jeux par défaut
            fetch("./data/jeux.json")
                .then(response => response.json())
                .then(data => gameController.loadGames(data))
                .catch(() => alert("Erreur lors du chargement des jeux."));
        }
    });
}
// Authentification
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
            var _a;
            if (userController.login(username, password)) {
                alert("Connexion réussie.");
                loadGamesForUser(); // Recharge immédiatement les jeux
                authContainer.innerHTML = `<p>Bienvenue, ${username}</p><button id="logoutBtn">Déconnexion</button>`;
                (_a = document.getElementById("logoutBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                    userController.logout();
                    alert("Déconnexion réussie.");
                    location.reload();
                });
            }
            else {
                alert("Identifiants incorrects.");
            }
        });
        const signupLink = document.createElement("p");
        signupLink.innerHTML = "Pas encore de compte ? <a href='#' id='showSignup'>Inscrivez-vous</a>";
        authContainer.appendChild(signupLink);
        (_b = document.getElementById("showSignup")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            userView.renderSignupForm("authContainer", (username, password) => __awaiter(void 0, void 0, void 0, function* () {
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
// Charger les jeux au démarrage
document.addEventListener("DOMContentLoaded", loadGamesForUser);
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
    // Mise à jour de la bibliothèque si connecté
    const user = userController.getUser();
    if (user) {
        fetch("./data/bibliotheque.json")
            .then(response => response.json())
            .then(data => {
            data[user.username] = gameController.getGames();
            return fetch("./data/bibliotheque.json", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        });
    }
    addGameForm.reset();
});
// Recherche et tri
(_c = document.getElementById("search")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", (e) => {
    gameController.filterGames(e.target.value.toLowerCase());
});
(_d = document.getElementById("sort")) === null || _d === void 0 ? void 0 : _d.addEventListener("change", (e) => {
    gameController.sortGames(e.target.value);
});
// Suppression d'un jeu
const gameList = document.getElementById("gameList");
gameList === null || gameList === void 0 ? void 0 : gameList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("removeBtn")) {
        e.stopPropagation();
        const id = parseInt(target.getAttribute("data-id") || "0", 10);
        gameController.removeGame(id);
        // Mise à jour de la bibliothèque si connecté
        const user = userController.getUser();
        if (user) {
            fetch("./data/bibliotheque.json")
                .then(response => response.json())
                .then(data => {
                data[user.username] = gameController.getGames();
                return fetch("./data/bibliotheque.json", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
            });
        }
    }
});
//# sourceMappingURL=index.js.map