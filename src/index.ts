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
async function loadGamesForUser() {
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
  } else {
    // Si déconnecté, charger les jeux par défaut
    fetch("./data/jeux.json")
      .then(response => response.json())
      .then(data => gameController.loadGames(data))
      .catch(() => alert("Erreur lors du chargement des jeux."));
  }
}

// Authentification
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
        loadGamesForUser(); // Recharge immédiatement les jeux
        authContainer.innerHTML = `<p>Bienvenue, ${username}</p><button id="logoutBtn">Déconnexion</button>`;
        document.getElementById("logoutBtn")?.addEventListener("click", () => {
          userController.logout();
          alert("Déconnexion réussie.");
          location.reload();
        });
      } else {
        alert("Identifiants incorrects.");
      }
    });

    const signupLink = document.createElement("p");
    signupLink.innerHTML = "Pas encore de compte ? <a href='#' id='showSignup'>Inscrivez-vous</a>";
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

// Charger les jeux au démarrage
document.addEventListener("DOMContentLoaded", loadGamesForUser);

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
(document.getElementById("search") as HTMLInputElement)?.addEventListener("input", (e) => {
  gameController.filterGames((e.target as HTMLInputElement).value.toLowerCase());
});

(document.getElementById("sort") as HTMLSelectElement)?.addEventListener("change", (e) => {
  gameController.sortGames((e.target as HTMLSelectElement).value);
});

// Suppression d'un jeu
const gameList = document.getElementById("gameList");
gameList?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
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
