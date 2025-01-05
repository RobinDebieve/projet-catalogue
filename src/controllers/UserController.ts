// UserController.ts (exemple simplifié)
import { IUtilisateur } from "../models/IUtilisateur.js";

export class UserController {
  private users: IUtilisateur[];
  private currentUser: IUtilisateur | null;

  constructor() {
    this.users = [];
    this.currentUser = null;
    this.loadUsers(); // charge depuis localStorage ou users.json
  }

  // Charge les utilisateurs
  private async loadUsers(): Promise<void> {
    // 1. Vérifier dans localStorage
    const localUsers = localStorage.getItem("userList");
    if (localUsers) {
      console.log("Chargement des utilisateurs depuis localStorage");
      this.users = JSON.parse(localUsers);
      return;
    }

    // 2. Sinon, fetch users.json
    try {
      const response = await fetch("./data/users.json");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs.");
      }
      this.users = await response.json();
      // Sauvegarde en localStorage (pour persister si on fait des modifs plus tard)
      localStorage.setItem("userList", JSON.stringify(this.users));
    } catch (error) {
      console.error(error);
      this.users = [];
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getUser(): IUtilisateur | null {
    return this.currentUser;
  }

  async addUser(username: string, password: string): Promise<boolean> {
    if (this.users.find(user => user.username === username)) {
      alert("Ce nom d'utilisateur existe déjà.");
      return false;
    }

    const newUser: IUtilisateur = { username, password };
    this.users.push(newUser);

    // Sauvegarde la liste entière
    localStorage.setItem("userList", JSON.stringify(this.users));

    // Connecte directement
    this.currentUser = newUser;
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

    return true;
  }

  login(username: string, password: string): boolean {
    // On s'assure que this.users est bien chargé
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      return true;
    }

    // Vérifier un user stocké localement (optionnel si on manipule tout dans this.users)
    const storedUserStr = localStorage.getItem("currentUser");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr) as IUtilisateur;
      if (storedUser.username === username && storedUser.password === password) {
        this.currentUser = storedUser;
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
