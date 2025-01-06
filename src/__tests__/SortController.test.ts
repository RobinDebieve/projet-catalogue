import { SortController } from "../controllers/SortController";
import { JeuVideo } from "../models/JeuVideo";

describe("SortController", () => {
  let sortController: SortController;
  const mockOnGamesUpdated = jest.fn();
  let sampleGames: JeuVideo[];

  beforeEach(() => {
    mockOnGamesUpdated.mockClear();
    sampleGames = [
      new JeuVideo(2, "Zelda", "Nintendo", "Switch", "2017-03-03", "Desc"),
      new JeuVideo(1, "Animal Crossing", "Nintendo", "Switch", "2020-03-20", "Desc"),
      new JeuVideo(3, "Mario Odyssey", "Nintendo", "Switch", "2017-10-27", "Desc")
    ];
    sortController = new SortController(sampleGames, mockOnGamesUpdated);
  });

  test("tri par titre asc (title-asc)", () => {
    sortController.sortGames("title-asc");
    expect(mockOnGamesUpdated).toHaveBeenCalled();
    const sorted = mockOnGamesUpdated.mock.calls[0][0];
    expect(sorted[0].titre).toBe("Animal Crossing");
    expect(sorted[1].titre).toBe("Mario Odyssey");
    expect(sorted[2].titre).toBe("Zelda");
  });

  test("tri par titre desc (title-desc)", () => {
    sortController.sortGames("title-desc");
    const sorted = mockOnGamesUpdated.mock.calls[0][0];
    expect(sorted[0].titre).toBe("Zelda");
    expect(sorted[1].titre).toBe("Mario Odyssey");
    expect(sorted[2].titre).toBe("Animal Crossing");
  });

  test("tri par date asc (date-asc)", () => {
    sortController.sortGames("date-asc");
    const sorted = mockOnGamesUpdated.mock.calls[0][0];
    expect(sorted[0].titre).toBe("Zelda"); // 2017-03-03
    expect(sorted[1].titre).toBe("Mario Odyssey"); // 2017-10-27
    expect(sorted[2].titre).toBe("Animal Crossing"); // 2020-03-20
  });

  test("tri par date desc (date-desc)", () => {
    sortController.sortGames("date-desc");
    const sorted = mockOnGamesUpdated.mock.calls[0][0];
    expect(sorted[0].titre).toBe("Animal Crossing");
    expect(sorted[2].titre).toBe("Zelda");
  });
});
