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
let sortController: SortController;
let searchController: SearchController;

// Mise à jour des contrôleurs
function updateControllers(games: JeuVideo[]) {
  // Initialisation si non définis
  if (!sortController) {
    sortController = new SortController(games, (sortedGames) =>
      gameView.renderGames(sortedGames)
    );
  } else {
    sortController.updateGames(games); // Met à jour le tri avec les nouveaux jeux
  }

  if (!searchController) {
    searchController = new SearchController(games, (filteredGames) =>
      gameView.renderGames(filteredGames)
    );
  } else {
    searchController = new SearchController(games, (filteredGames) =>
      gameView.renderGames(filteredGames)
    );
  }
}

// Chargement des jeux en fonction de l'état de connexion
async function loadGamesForUser() {
  const user = userController.getUser();
  if (user) {
    fetch("./data/bibliotheque.json")
      .then((response) => response.json())
      .then((data) => {
        const library = data[user.username] || [];
        gameController.loadGames(library);
      })
      .catch(() => alert("Erreur lors du chargement de la bibliothèque."));
  } else {
    fetch("./data/jeux.json")
      .then((response) => response.json())
      .then((data) => gameController.loadGames(data))
      .catch(() => alert("Erreur lors du chargement des jeux."));
  }
}

// Mise à jour de l'interface utilisateur
function updateAuthUI() {
  const authContainer = document.getElementById("authContainer");
  if (authContainer) {
    if (userController.isLoggedIn()) {
      const user = userController.getUser();
      authContainer.innerHTML = `<p>Bienvenue, ${user.username}</p><button id="logoutBtn">Déconnexion</button>`;
      document.getElementById("logoutBtn")?.addEventListener("click", () => {
        userController.logout();
        alert("Déconnexion réussie.");
        location.reload();
      });
    } else {
      userView.renderLoginForm("authContainer", (username, password) => {
        if (userController.login(username, password)) {
          alert("Connexion réussie.");
          loadGamesForUser();
          updateAuthUI();
        } else {
          alert("Identifiants incorrects.");
        }
      });

      const signupLink = document.createElement("p");
      signupLink.innerHTML =
        "Pas encore de compte ? <a href='#' id='showSignup'>Inscrivez-vous</a>";
      authContainer.appendChild(signupLink);

      document.getElementById("showSignup")?.addEventListener("click", async () => {
        userView.renderSignupForm("authContainer", async (username, password) => {
          const success = await userController.addUser(username, password);
          if (success) {
            alert("Compte créé avec succès. Connectez-vous maintenant.");
            location.reload();
          } else {
            alert("Échec de la création du compte. Nom d'utilisateur déjà pris.");
          }
        });
      });
    }
  }
}

// Charger les jeux au démarrage
document.addEventListener("DOMContentLoaded", () => {
  loadGamesForUser();
  updateAuthUI();
});

// Gestion du formulaire d'ajout
const addGameForm = document.getElementById("addGameForm") as HTMLFormElement;
addGameForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = (document.getElementById("title") as HTMLInputElement).value;
  const studio = (document.getElementById("studio") as HTMLInputElement).value;
  const platform = (document.getElementById("platform") as HTMLInputElement).value;
  const releaseDate = (document.getElementById("releaseDate") as HTMLInputElement).value;
  const description = (document.getElementById("description") as HTMLInputElement).value;

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
(document.getElementById("search") as HTMLInputElement)?.addEventListener("input", (e) => {
  const keyword = (e.target as HTMLInputElement).value.toLowerCase();
  searchController.filterGames(keyword);
});

(document.getElementById("sort") as HTMLSelectElement)?.addEventListener("change", (e) => {
  const sortOption = (e.target as HTMLSelectElement).value;
  sortController.sortGames(sortOption); // Tri en fonction de l'option choisie
});

// Gestion de la suppression
document.getElementById("gameList")?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("removeBtn")) {
    const id = parseInt(target.getAttribute("data-id") || "0", 10);
    gameController.removeGame(id);
    updateControllers(gameController.getGames()); // Mise à jour des contrôleurs après suppression
  }
});
