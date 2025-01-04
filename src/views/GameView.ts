import { JeuVideo } from "../models/JeuVideo.js";

export class GameView {
  private gameList: HTMLElement;

  constructor(gameListId: string) {
    const list = document.getElementById(gameListId);
    if (!list) throw new Error("Élément non trouvé : " + gameListId);
    this.gameList = list;
  }

  renderGames(games: JeuVideo[]): void {
    this.gameList.innerHTML = "";
    games.forEach((game) => {
      const li = document.createElement("li");
      li.classList.add("game-item");
      li.innerHTML = `
        <strong>${game.titre}</strong> 
        (${game.studio}, ${game.plateforme}) - ${game.dateDeSortie}
        <button data-id="${game.id}" class="removeBtn">Retirer</button>
        <p class="description">${game.description}</p>
      `;
      
      this.gameList.appendChild(li);

      // Toggle description
      li.addEventListener("click", (e) => {
        if (!(e.target as HTMLElement).classList.contains("removeBtn")) {
          const description = li.querySelector(".description") as HTMLElement;
          description.classList.toggle("show");
        }
      });
    });
  }
}
