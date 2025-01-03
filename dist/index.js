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
// Gestion de l'authentification
const authContainer = document.getElementById("authContainer");
if (authContainer) {
    if (userController.isLoggedIn()) {
        authContainer.innerHTML = '<button id="logoutBtn">Déconnexion</button>';
        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", () => {
            userController.logout();
            location.reload();
        });
    }
    else {
        userView.renderLoginForm("authContainer", (username, password) => {
            if (userController.login(username, password)) {
                location.reload();
            }
        });
        const toggleSignup = document.createElement("p");
        toggleSignup.innerHTML = "Pas encore de compte ? <a href='#' id='showSignup'>Inscrivez-vous</a>";
        authContainer.appendChild(toggleSignup);
        const showSignup = document.getElementById("showSignup");
        showSignup.addEventListener("click", () => {
            userView.renderSignupForm("authContainer", (username, password) => {
                if (userController.addUser(username, password)) {
                    userView.renderLoginForm("authContainer", (username, password) => {
                        if (userController.login(username, password)) {
                            location.reload();
                        }
                    });
                }
            });
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    gameController.loadGames("./data/jeux.json");
});
// Gestion du formulaire d'ajout
const addGameForm = document.getElementById("addGameForm");
if (addGameForm) {
    addGameForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const studio = document.getElementById("studio").value;
        const platform = document.getElementById("platform").value;
        const releaseDate = document.getElementById("releaseDate").value;
        const description = document.getElementById("description").value;
        // Validation des champs
        if (!title || !studio || !platform || !releaseDate || !description) {
            alert("Veuillez remplir tous les champs !");
            return;
        }
        // Crée une instance de JeuVideo
        const newGame = new JeuVideo(Date.now(), title, studio, platform, releaseDate, description);
        // Ajoute le jeu
        gameController.addGame(newGame);
        // Réinitialise le formulaire
        addGameForm.reset();
    });
}
// Recherche
const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("input", () => {
        gameController.filterGames(searchInput.value.toLowerCase());
    });
}
// Tri
const sortSelect = document.getElementById("sort");
if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        gameController.sortGames(sortSelect.value);
    });
}
// Gestion de la suppression d'un jeu
const gameList = document.getElementById("gameList");
if (gameList) {
    gameList.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("removeBtn")) {
            e.stopPropagation(); // Empêche la propagation
            const id = parseInt(target.getAttribute("data-id") || "0", 10);
            gameController.removeGame(id); // Supprime le jeu
        }
    });
}
//# sourceMappingURL=index.js.map