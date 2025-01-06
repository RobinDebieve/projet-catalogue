import { GameView } from "../views/GameView";
import { JeuVideo } from "../models/JeuVideo";

describe("GameView", () => {
  let container: HTMLElement;
  let gameView: GameView;

  beforeEach(() => {
    // On crée un élément <ul id="testGameList"> pour simuler le DOM
    document.body.innerHTML = `<ul id="testGameList"></ul>`;
    container = document.getElementById("testGameList") as HTMLElement;

    gameView = new GameView("testGameList");
  });

  test("constructeur lève une erreur si l'élément n'existe pas", () => {
    // On veut tester le cas où l'élément n'existe pas
    document.body.innerHTML = ""; // supprime l'élément
    expect(() => new GameView("inexistantId")).toThrowError(
      "Élément non trouvé : inexistantId"
    );
  });

  test("renderGames doit créer des <li> dans la liste", () => {
    const mockGames = [
      new JeuVideo(1, "Zelda", "Nintendo", "Switch", "2017-03-03", "Desc"),
      new JeuVideo(2, "Mario", "Nintendo", "Switch", "2017-10-27", "Desc"),
    ];

    gameView.renderGames(mockGames);
    // On s'attend à avoir 2 <li> dans le container
    const listItems = container.querySelectorAll("li.game-item");
    expect(listItems.length).toBe(2);

    // Vérifie le contenu du premier <li>
    expect(listItems[0].innerHTML).toContain("Zelda");
    expect(listItems[0].innerHTML).toContain("Nintendo");
    expect(listItems[0].innerHTML).toContain("2017-03-03");
  });

  test("cliquer sur le <li> (hors removeBtn) toggle la classe 'show' de la description", () => {
    const mockGames = [
      new JeuVideo(3, "Animal Crossing", "Nintendo", "Switch", "2020-03-20", "Desc"),
    ];

    gameView.renderGames(mockGames);
    const li = container.querySelector("li.game-item") as HTMLElement;
    const desc = li.querySelector(".description") as HTMLElement;
    
    expect(desc.classList.contains("show")).toBe(false);

    // On simule un clic sur le <li> (pas sur removeBtn)
    li.click();
    expect(desc.classList.contains("show")).toBe(true);

    li.click();
    expect(desc.classList.contains("show")).toBe(false);
  });
});
