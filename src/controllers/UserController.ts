import { IUtilisateur } from "../models/IUtilisateur.js";

export class UserController {
  private users: IUtilisateur[];
  private currentUser: IUtilisateur | null;

  constructor() {
    this.users = [];
    this.currentUser = null;
    this.loadUsers();
  }

  // Charge les utilisateurs depuis users.json
  private async loadUsers(): Promise<void> {
    try {
      const response = await fetch("./data/users.json");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs.");
      }
      this.users = await response.json();
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

  // Ajoute un nouvel utilisateur
  async addUser(username: string, password: string): Promise<boolean> {
    if (this.users.find(user => user.username === username)) {
      alert("Ce nom d'utilisateur existe déjà.");
      return false;
    }

    const newUser: IUtilisateur = { username, password };
    this.users.push(newUser);

    // Sauvegarde dans localStorage
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // Mettre à jour bibliotheque.json
    try {
      const libraryResponse = await fetch("./data/bibliotheque.json");
      const libraryData = await libraryResponse.json();
      libraryData[username] = [];
      
      await fetch("./data/bibliotheque.json", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libraryData),
      });

      // Connecte directement l'utilisateur
      this.currentUser = newUser;
      return true;
    } catch (err) {
      console.error("Erreur mise à jour bibliotheque.json :", err);
      return false;
    }
  }

  login(username: string, password: string): boolean {
    // Vérification dans this.users
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }

    // Vérifie dans localStorage
    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      this.currentUser = storedUser;
      return true;
    }

    alert("Identifiants incorrects.");
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }
}
