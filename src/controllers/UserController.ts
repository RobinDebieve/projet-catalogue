export class UserController {
  private users: any[];
  private currentUser: any;

  constructor() {
    this.users = [];
    this.currentUser = null;
    this.loadUsers();
  }

  // Charge les utilisateurs depuis users.json
  private async loadUsers() {
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

  // Vérifie si un utilisateur est connecté
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Retourne l'utilisateur connecté
  getUser() {
    return this.currentUser;
  }

  // Ajoute un nouvel utilisateur
  async addUser(username: string, password: string): Promise<boolean> {
    if (this.users.find(user => user.username === username)) {
      alert("Ce nom d'utilisateur existe déjà.");
      return false;
    }
    const newUser = { username, password };
    this.users.push(newUser);
    await this.saveUsers();
    return true;
  }

  // Sauvegarde les utilisateurs dans users.json
  private async saveUsers() {
    await fetch("./data/users.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.users)
    });
  }

  // Connexion
  login(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    alert("Identifiants incorrects.");
    return false;
  }

  // Déconnexion
  logout(): void {
    this.currentUser = null;
  }
}
