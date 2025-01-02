console.log("Script chargé correctement !");

// Exemple de données
const games = [
  { id: 1, titre: "Zelda", studio: "Nintendo", plateforme: "Switch", dateDeSortie: "2017-03-03" },
  { id: 2, titre: "Halo", studio: "Bungie", plateforme: "Xbox", dateDeSortie: "2001-11-15" }
];

// Fonction pour afficher les jeux
const renderGames = () => {
  const gameList = document.getElementById("gameList");
  if (gameList) {
    gameList.innerHTML = ""; // Efface la liste précédente

    games.forEach((game) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${game.titre}</strong> (${game.studio}, ${game.plateforme}) - ${game.dateDeSortie}
        <button data-id="${game.id}" class="removeBtn">Retirer</button>
      `;
      gameList.appendChild(li);
    });

    // Attacher des événements "Retirer"
    document.querySelectorAll(".removeBtn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.target as HTMLButtonElement;
        const id = parseInt(target.getAttribute("data-id") || "0");
        removeGame(id);
      });
    });
  } else {
    console.error("Element #gameList introuvable !");
  }
};

// Fonction pour retirer un jeu
const removeGame = (id: number) => {
  const index = games.findIndex((game) => game.id === id);
  if (index !== -1) {
    games.splice(index, 1);
    renderGames(); // Rafraîchit la liste
  }
};
// Gestion du formulaire d'ajout
const addGameForm = document.getElementById("addGameForm") as HTMLFormElement;
if (addGameForm) {
  addGameForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const studio = (document.getElementById("studio") as HTMLInputElement).value;
    const platform = (document.getElementById("platform") as HTMLInputElement).value;
    const releaseDate = (document.getElementById("releaseDate") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;

    // Validation des champs
    if (!title || !studio || !platform || !releaseDate || !description) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Ajouter un nouveau jeu
    const newGame = {
      id: games.length + 1,
      titre: title,
      studio: studio,
      plateforme: platform,
      dateDeSortie: releaseDate
    };
    games.push(newGame); // Ajouter au tableau
    renderGames(); // Rafraîchir l'affichage

    // Réinitialiser le formulaire
    addGameForm.reset();
  });
}

// Charger la liste au démarrage
renderGames();
