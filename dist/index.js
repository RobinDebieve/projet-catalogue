"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Script chargé correctement !");
// Charger les jeux depuis un fichier JSON
let games = [];
const loadGames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("./data/jeux.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        games = yield response.json();
        console.log("Données chargées :", games);
        renderGames(); // Affiche les jeux après chargement
    }
    catch (error) {
        console.error("Erreur lors du chargement des jeux :", error);
    }
});
// Fonction pour afficher les jeux
const renderGames = () => {
    console.log("Render games called.");
    const gameList = document.getElementById("gameList");
    if (gameList) {
        gameList.innerHTML = "";
        games.forEach((game) => {
            console.log(`Rendering game: ${game.titre}`);
            const li = document.createElement("li");
            li.classList.add("game-item"); // Ajout d'une classe pour le style
            li.innerHTML = `
        <strong>${game.titre}</strong> (${game.studio}, ${game.plateforme}) - ${game.dateDeSortie}
        <button data-id="${game.id}" class="removeBtn">Retirer</button>
        <p class="description">${game.description}</p>
      `;
            gameList.appendChild(li);
            // Ajouter un événement pour afficher/masquer la description au clic
            li.addEventListener("click", () => {
                const description = li.querySelector(".description");
                description.classList.toggle("show");
            });
        });
        // Ajouter les événements aux boutons "Retirer"
        document.querySelectorAll(".removeBtn").forEach((button) => {
            button.addEventListener("click", (e) => {
                e.stopPropagation(); // Empêche la propagation du clic au parent
                const target = e.target;
                const id = parseInt(target.getAttribute("data-id") || "0");
                removeGame(id);
            });
        });
    }
    else {
        console.error("Element #gameList introuvable dans le DOM.");
    }
};
// Fonction pour ajouter un jeu
const addGame = (game) => {
    games.push(game);
    renderGames();
};
// Fonction pour retirer un jeu
const removeGame = (id) => {
    const index = games.findIndex((game) => game.id === id);
    if (index !== -1) {
        games.splice(index, 1);
        renderGames();
    }
};
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
        const newGame = {
            id: games.length + 1,
            titre: title,
            studio: studio,
            plateforme: platform,
            dateDeSortie: releaseDate,
            description: description
        };
        addGame(newGame);
        addGameForm.reset(); // Réinitialise le formulaire
    });
}
// Attendre le chargement complet du DOM avant de charger les jeux et de les afficher
document.addEventListener("DOMContentLoaded", () => {
    loadGames();
});
//# sourceMappingURL=index.js.map