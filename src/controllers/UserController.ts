import { IUtilisateur } from "../models/IUtilisateur.js";

export class UserController {
  private users: IUtilisateur[];
  private currentUser: IUtilisateur | null;

  constructor() {
    this.users = [];
    this.currentUser = null;
    this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    // 1) Vérifie si on a déjà userList dans localStorage
    const localUsers = localStorage.getItem("userList");
    if (localUsers) {
      console.log("[loadUsers] localStorage => skip fetch");
      this.users = JSON.parse(localUsers);
      return;
    }

    // 2) Sinon, on fetch users.json
    console.log("[loadUsers] pas de userList => fetch users.json");
    try {
      const response = await fetch("./data/users.json");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs.");
      }
      this.users = await response.json();
      // On sauvegarde dans localStorage
      localStorage.setItem("userList", JSON.stringify(this.users));
    } catch (error) {
      console.error(error);
      this.users = [];
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getUser() {
    return this.currentUser;
  }

  async addUser(username: string, password: string): Promise<boolean> {
    // Vérifie doublon
    if (this.users.find(u => u.username === username)) {
      alert("Ce nom d'utilisateur existe déjà.");
      return false;
    }

    const newUser: IUtilisateur = { username, password };
    this.users.push(newUser);

    // Met à jour la liste dans localStorage
    localStorage.setItem("userList", JSON.stringify(this.users));

    // On sauvegarde le currentUser
    this.currentUser = newUser;
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

    console.log(`[addUser] Compte créé : ${username}`);
    return true;
  }

  login(username: string, password: string): boolean {
    // Vérifie dans this.users
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }

    // Vérifie dans localStorage si currentUser match
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const uObj = JSON.parse(storedUser) as IUtilisateur;
      if (uObj.username === username && uObj.password === password) {
        this.currentUser = uObj;
        return true;
      }
    }

    alert("Identifiants incorrects.");
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }
}
