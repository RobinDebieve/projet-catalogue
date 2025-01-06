// src/__tests__/UserController.test.ts

import { UserController } from "../controllers/UserController";
import { IUtilisateur } from "../models/IUtilisateur";

// 1) On mock la fonction fetch pour gérer fetch("./data/users.json")
global.fetch = jest.fn();

// 2) On mock localStorage
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

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// On mock également alert() (JSDOM ne l'implémente pas)
beforeAll(() => {
  global.alert = jest.fn();
});

describe("UserController - Persistance locale (Option A)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("Si localStorage est vide => fetch users.json (loadUsers), on stocke en localStorage", async () => {
    // On simule que fetch users.json renvoie 2 utilisateurs
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { username: "admin", password: "admin123" },
        { username: "bob", password: "pwd" },
      ],
    });

    const userCtrl = new UserController();
    // Attend la fin du loadUsers()
    await new Promise((resolve) => setTimeout(resolve, 0));

    // On vérifie qu'on a fetché users.json
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("./data/users.json");

    // On vérifie que localStorage contient la liste
    const storedUsers = JSON.parse(localStorage.getItem("userList") || "[]");
    expect(storedUsers).toHaveLength(2);
    expect(storedUsers[0].username).toBe("admin");
    expect(storedUsers[1].username).toBe("bob");
  });

  test("Si localStorage a déjà userList => pas de fetch users.json", async () => {
    // On met un tableau en localStorage
    localStorage.setItem(
      "userList",
      JSON.stringify([{ username: "alice", password: "secret" }])
    );

    const userCtrl = new UserController();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Pas d'appel à fetch, car userList existe déjà
    expect(fetch).not.toHaveBeenCalled();
    // Vérifie qu'on a bien chargé alice
    expect((userCtrl as any).users).toEqual([
      { username: "alice", password: "secret" },
    ]);
  });

  test("addUser => 1 fetch call si localStorage est vide, puis user créé en localStorage", async () => {
    // localStorage vide => loadUsers => 1 fetch users.json
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const userCtrl = new UserController();
    await new Promise((r) => setTimeout(r, 0));

    // On ajoute un nouvel utilisateur
    const result = await userCtrl.addUser("john", "pass");
    expect(result).toBe(true);

    // Vérifie qu'on a fetché users.json une seule fois
    expect(fetch).toHaveBeenCalledTimes(1);

    // Vérifie userList dans localStorage => [ { username: "john", password: "pass" } ]
    const storedUsers = JSON.parse(localStorage.getItem("userList") || "[]");
    expect(storedUsers).toHaveLength(1);
    expect(storedUsers[0].username).toBe("john");

    // Vérifie currentUser => "john"
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");
    expect(current?.username).toBe("john");
    expect(userCtrl.isLoggedIn()).toBe(true);
  });

  test("addUser => échoue si user existe déjà (pas de fetch)", async () => {
    // On simule 1 user existant dans fetch => loadUsers
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { username: "admin", password: "admin123" },
      ],
    });

    const userCtrl = new UserController();
    await new Promise((r) => setTimeout(r, 0));

    // Tente d'ajouter "admin"
    const result = await userCtrl.addUser("admin", "admin123");
    expect(result).toBe(false);
    expect(global.alert).toHaveBeenCalledWith("Ce nom d'utilisateur existe déjà.");

    // Vérifie qu'on n'a pas de nouveau fetch
    expect(fetch).toHaveBeenCalledTimes(1); // (seulement loadUsers)
  });

  test("login => OK si user existe dans this.users", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { username: "jean", password: "abc" },
      ],
    });

    const userCtrl = new UserController();
    await new Promise((r) => setTimeout(r, 0));

    const success = userCtrl.login("jean", "abc");
    expect(success).toBe(true);

    // Vérifie currentUser
    const storedCurrent = JSON.parse(localStorage.getItem("currentUser") || "null");
    expect(storedCurrent?.username).toBe("jean");
  });

  test("login => KO => alert('Identifiants incorrects.')", async () => {
    // On simule un fetch => 1 user
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { username: "admin", password: "123" },
      ],
    });

    const userCtrl = new UserController();
    await new Promise((r) => setTimeout(r, 0));

    // On teste un login faux
    const success = userCtrl.login("bob", "xxx");
    expect(success).toBe(false);
    expect(global.alert).toHaveBeenCalledWith("Identifiants incorrects.");
  });

  test("logout => supprime currentUser de localStorage", async () => {
    // On simule un localStorage déjà peuplé => skip fetch
    localStorage.setItem("userList", JSON.stringify([
      { username: "a", password: "1" },
    ]));
    localStorage.setItem("currentUser", JSON.stringify({ username: "a", password: "1" }));

    const userCtrl = new UserController();
    await new Promise((r) => setTimeout(r, 0));

    userCtrl.logout();
    expect(userCtrl.isLoggedIn()).toBe(false);
    expect(localStorage.getItem("currentUser")).toBeNull();
  });
});
