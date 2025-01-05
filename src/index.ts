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

let sortController: SortController;
let searchController: SearchController;

// Instanciation du GameController : on lui passe la callback de mise à jour
const gameController = new GameController((games) => {
  gameView.renderGames(games);
  syncControllers(games);
});

// Synchronise les jeux avec les contrôleurs de tri/recherche
function syncControllers(games: JeuVideo[]) {
  if (!sortController) {
    sortController = new SortController(games, (sortedGames) => {
      gameView.renderGames(sortedGames);
    });
  } else {
    sortController.updateGames(games);
  }

  if (!searchController) {
    searchController = new SearchController(games, (filteredGames) => {
      gameView.renderGames(filteredGames);
    });
  } else {
    searchController = new SearchController(games, (filteredGames) => {
      gameView.renderGames(filteredGames);
    });
  }
}

/**
 * Charge les jeux pour l'utilisateur connecté si possible,
 * depuis localStorage si présent, sinon depuis bibliotheque.json.
 * Si l'utilisateur n'est pas connecté, on charge jeux.json.
 */
async function loadGamesForUser() {
  const user = userController.getUser();
  if (user) {
    // Tente de charger la liste depuis localStorage
    const localLibKey = "library_" + user.username;
    const localLib = localStorage.getItem(localLibKey);

    if (localLib) {
      // On a une bibliothèque locale pour cet utilisateur
      const library = JSON.parse(localLib);
      gameController.loadGames(library);
    } else {
      // Sinon on charge depuis bibliotheque.json
      try {
        const response = await fetch("./data/bibliotheque.json");
        const data = await response.json();
        const userLibrary = data[user.username] || [];
        gameController.loadGames(userLibrary);
      } catch (err) {
        alert("Erreur lors du chargement de la bibliothèque.");
        console.error(err);
      }
    }
  } else {
    // L'utilisateur n'est pas connecté => on charge jeux.json
    try {
      const response = await fetch("./data/jeux.json");
      const data = await response.json();
      gameController.loadGames(data);
    } catch (err) {
      alert("Erreur lors du chargement des jeux.");
      console.error(err);
    }
  }
}

/** 
 * Sauvegarde la liste de jeux courante dans localStorage 
 * pour l'utilisateur connecté (si connecté).
 */
function saveLibraryToLocalStorage() {
  const user = userController.getUser();
  if (!user) return;

  const localLibKey = "library_" + user.username;
  const currentGames = gameController.getGames();
  localStorage.setItem(localLibKey, JSON.stringify(currentGames));
}

/** 
 * Met à jour l'UI d'authentification (login/logout) 
 * et place le formulaire adéquat.
 */
function updateAuthUI(): void {
  const authContainer = document.getElementById("authContainer");
  if (!authContainer) return;

  if (userController.isLoggedIn()) {
    const user = userController.getUser();
    if (user) {
      authContainer.innerHTML = `
        <p>Bienvenue, ${user.username}</p>
        <button id="logoutBtn">Déconnexion</button>
      `;
      document.getElementById("logoutBtn")?.addEventListener("click", () => {
        userController.logout();
        alert("Déconnexion réussie.");
        location.reload();
      });
    }
  } else {
    // Formulaire de connexion
    userView.renderLoginForm("authContainer", (username, password) => {
      if (userController.login(username, password)) {
        alert("Connexion réussie.");
        loadGamesForUser();
        updateAuthUI();
      } else {
        alert("Identifiants incorrects.");
      }
    });

    // Lien inscription
    const signupLink = document.createElement("p");
    signupLink.innerHTML = `
      Pas encore de compte ? <a href='#' id='showSignup'>Inscrivez-vous</a>
    `;
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

// Au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
  await loadGamesForUser();
  updateAuthUI();
});

// Formulaire d'ajout de jeu
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

  const newGame = new JeuVideo(
    Date.now(), 
    title, 
    studio, 
    platform, 
    releaseDate, 
    description
  );

  // Ajoute le jeu en mémoire
  gameController.addGame(newGame);

  // Sauvegarde immédiatement dans localStorage si user connecté
  saveLibraryToLocalStorage();

  addGameForm.reset();
});

// Barre de recherche
(document.getElementById("search") as HTMLInputElement)?.addEventListener("input", (e) => {
  const keyword = (e.target as HTMLInputElement).value.toLowerCase();
  if (searchController) {
    searchController.filterGames(keyword);
  }
});

// Tri
(document.getElementById("sort") as HTMLSelectElement)?.addEventListener("change", (e) => {
  const sortOption = (e.target as HTMLSelectElement).value;
  if (sortController) {
    sortController.sortGames(sortOption);
  }
});

// Suppression d'un jeu
document.getElementById("gameList")?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("removeBtn")) {
    const id = parseInt(target.getAttribute("data-id") || "0", 10);
    gameController.removeGame(id);

    // Sauvegarde après suppression
    saveLibraryToLocalStorage();
  }
});
