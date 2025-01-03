import { Utilisateur } from "../models/Utilisateur.js";

export class UserController {
  private users: Utilisateur[] = [];

  constructor() {
    this.loadUsers();
  }

  // Charger les utilisateurs depuis users.json
  async loadUsers() {
    try {
      const response = await fetch("./data/users.json");
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      this.users = await response.json();
      console.log("Utilisateurs chargés :", this.users);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  }

  // Ajouter un nouvel utilisateur
  addUser(username: string, password: string): boolean {
    if (this.users.find((user) => user.username === username)) {
      alert("Nom d'utilisateur déjà pris !");
      return false;
    }

    const newUser = new Utilisateur(username, password, `${username}@email.com`);

    this.users.push(newUser);
    this.saveUsers();
    alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
    return true;
  }

  // Authentifier un utilisateur
  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Connexion réussie !");
      return true;
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
      return false;
    }
  }

  // Vérifier si un utilisateur est connecté
  isLoggedIn(): boolean {
    return localStorage.getItem("loggedInUser") !== null;
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem("loggedInUser");
    alert("Déconnexion réussie !");
  }

  // Sauvegarder les utilisateurs dans users.json (simulation)
  saveUsers() {
    console.log("Utilisateurs mis à jour :", this.users);
    // En environnement réel, une API backend gérerait cette sauvegarde.
  }
}
