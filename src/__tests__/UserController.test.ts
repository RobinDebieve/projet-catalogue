import { UserController } from "../controllers/UserController";
import { IUtilisateur } from "../models/IUtilisateur";

// Mock global fetch
global.fetch = jest.fn();

// Mock localStorage (basique)
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe("UserController", () => {
  let userController: UserController;

  beforeEach(() => {
    // Réinitialise le mock
    jest.clearAllMocks();
    localStorage.clear();

    userController = new UserController();
  });

  test("au démarrage, aucun utilisateur connecté (isLoggedIn = false)", () => {
    expect(userController.isLoggedIn()).toBe(false);
    expect(userController.getUser()).toBeNull();
  });

  test("addUser avec un username non existant => OK", async () => {
    // On mock la réponse de fetch users.json
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    // On mock aussi la réponse pour bibliotheque.json
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      // Pour le PUT
      ok: true,
      json: async () => ({}),
    });

    // On tente d'ajouter un user
    const success = await userController.addUser("alice", "secret");
    expect(success).toBe(true);

    // Il devrait être automatiquement connecté
    expect(userController.isLoggedIn()).toBe(true);
    expect(userController.getUser()?.username).toBe("alice");

    // Vérifie que localStorage a bien sauvegardé le user
    const storedUser = JSON.parse(localStorage.getItem("currentUser") as string);
    expect(storedUser?.username).toBe("alice");
  });

  test("login d'un utilisateur existant dans this.users", () => {
    // On force la liste des users en mémoire (pour simplifier)
    (userController as any).users = [
      { username: "bob", password: "123" },
    ] as IUtilisateur[];

    const result = userController.login("bob", "123");
    expect(result).toBe(true);
    expect(userController.isLoggedIn()).toBe(true);
    expect(userController.getUser()?.username).toBe("bob");
  });

  test("login echoue si identifiants incorrects", () => {
    (userController as any).users = [
      { username: "bob", password: "123" },
    ] as IUtilisateur[];

    const result = userController.login("bob", "456");
    expect(result).toBe(false);
    expect(userController.isLoggedIn()).toBe(false);
  });

  test("logout doit déconnecter l'utilisateur", () => {
    // Simule un user déjà connecté
    (userController as any).currentUser = { username: "test", password: "xyz" };

    userController.logout();
    expect(userController.isLoggedIn()).toBe(false);
    expect(userController.getUser()).toBeNull();
    // Vérifie localStorage vidé
    expect(localStorage.getItem("currentUser")).toBeNull();
  });
});
