// src/__tests__/GameController.test.ts

import { GameController } from "../controllers/GameController";
import { JeuVideo } from "../models/JeuVideo";

// On peut utiliser describe/it ou test
describe("GameController", () => {
  let gameController: GameController;

  // Callback simulant l'update de la vue
  const mockOnGamesUpdated = jest.fn();

  beforeEach(() => {
    // On réinitialise mockOnGamesUpdated
    mockOnGamesUpdated.mockClear();
    // On crée un nouveau GameController avant chaque test
    gameController = new GameController(mockOnGamesUpdated);
  });

  test("devrait initialiser un tableau de jeux vide", () => {
    expect(gameController.getGames()).toEqual([]);
  });

  test("devrait ajouter un jeu et déclencher onGamesUpdated", () => {
    const newGame = new JeuVideo(
      1,
      "Test Game",
      "Test Studio",
      "PC",
      "2025-01-01",
      "Description du jeu"
    );
    gameController.addGame(newGame);

    // Vérifie que la liste contient désormais 1 jeu
    expect(gameController.getGames()).toHaveLength(1);
    // Vérifie que le callback a été appelé avec la liste des jeux
    expect(mockOnGamesUpdated).toHaveBeenCalledWith([newGame]);
  });

  test("devrait supprimer un jeu par ID", () => {
    const game1 = new JeuVideo(1, "Game 1", "Studio", "PC", "2025-01-01", "desc1");
    const game2 = new JeuVideo(2, "Game 2", "Studio", "PC", "2025-02-01", "desc2");
    gameController.addGame(game1);
    gameController.addGame(game2);

    gameController.removeGame(1);

    // Désormais la liste ne contient plus que le jeu #2
    expect(gameController.getGames()).toHaveLength(1);
    expect(gameController.getGames()[0].id).toBe(2);

    // Vérifie que le callback a été appelé avec [game2]
    expect(mockOnGamesUpdated).toHaveBeenCalledTimes(3); // (1 ajout game2, 1 suppression game1)
    expect(mockOnGamesUpdated).toHaveBeenLastCalledWith([game2]);
  });
});
