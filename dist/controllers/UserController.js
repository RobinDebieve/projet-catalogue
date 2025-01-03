var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Utilisateur } from "../models/Utilisateur.js";
export class UserController {
    constructor() {
        this.users = [];
        this.loadUsers();
    }
    // Charger les utilisateurs depuis users.json
    loadUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("./data/users.json");
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                this.users = yield response.json();
                console.log("Utilisateurs chargés :", this.users);
            }
            catch (error) {
                console.error("Erreur lors du chargement des utilisateurs :", error);
            }
        });
    }
    // Ajouter un nouvel utilisateur
    addUser(username, password) {
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
    login(username, password) {
        const user = this.users.find((u) => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            alert("Connexion réussie !");
            return true;
        }
        else {
            alert("Nom d'utilisateur ou mot de passe incorrect.");
            return false;
        }
    }
    // Vérifier si un utilisateur est connecté
    isLoggedIn() {
        return localStorage.getItem("loggedInUser") !== null;
    }
    // Déconnexion
    logout() {
        localStorage.removeItem("loggedInUser");
        alert("Déconnexion réussie !");
    }
    // Sauvegarder les utilisateurs dans users.json (simulation)
    saveUsers() {
        console.log("Utilisateurs mis à jour :", this.users);
        // En environnement réel, une API backend gérerait cette sauvegarde.
    }
}
//# sourceMappingURL=UserController.js.map