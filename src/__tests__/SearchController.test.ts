import { SearchController } from "../controllers/SearchController";
import { JeuVideo } from "../models/JeuVideo";

describe("SearchController", () => {
  let searchController: SearchController;
  let mockOnGamesUpdated: jest.Mock;
  let mockGames: JeuVideo[];

  beforeEach(() => {
    mockOnGamesUpdated = jest.fn();

    // Exemple de données
    mockGames = [
      new JeuVideo(1, "Zelda", "Nintendo", "Switch", "2017-03-03", "Adventure"),
      new JeuVideo(2, "Mario Odyssey", "Nintendo", "Switch", "2017-10-27", "Platform"),
      new JeuVideo(3, "Animal Crossing", "Nintendo", "Switch", "2020-03-20", "Life Sim"),
    ];

    searchController = new SearchController(mockGames, mockOnGamesUpdated);
  });

  test("doit filtrer les jeux en fonction du titre (keyword)", () => {
    searchController.filterGames("mario");
    expect(mockOnGamesUpdated).toHaveBeenCalledTimes(1);

    // Récupère le résultat
    const filtered = mockOnGamesUpdated.mock.calls[0][0];
    expect(filtered).toHaveLength(1);
    expect(filtered[0].titre).toBe("Mario Odyssey");
  });

  test("si le keyword ne correspond à rien, renvoie un tableau vide", () => {
    searchController.filterGames("Metroid"); 
    expect(mockOnGamesUpdated).toHaveBeenCalledTimes(1);
    const filtered = mockOnGamesUpdated.mock.calls[0][0];
    expect(filtered).toHaveLength(0);
  });

  test("recherche insensible à la casse (majuscule/minuscule)", () => {
    searchController.filterGames("ZELDA");
    expect(mockOnGamesUpdated).toHaveBeenCalledTimes(1);
    const filtered = mockOnGamesUpdated.mock.calls[0][0];
    expect(filtered).toHaveLength(1);
    expect(filtered[0].titre).toBe("Zelda");
  });
});
