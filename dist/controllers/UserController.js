var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UserController {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.loadUsers();
    }
    // Charge les utilisateurs depuis users.json
    loadUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("./data/users.json");
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des utilisateurs.");
                }
                this.users = yield response.json();
            }
            catch (error) {
                console.error(error);
                this.users = [];
            }
        });
    }
    // Vérifie si un utilisateur est connecté
    isLoggedIn() {
        return this.currentUser !== null;
    }
    // Retourne l'utilisateur connecté
    getUser() {
        return this.currentUser;
    }
    // Ajoute un nouvel utilisateur
    addUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.users.find(user => user.username === username)) {
                alert("Ce nom d'utilisateur existe déjà.");
                return false;
            }
            const newUser = { username, password };
            this.users.push(newUser);
            yield this.saveUsers();
            return true;
        });
    }
    // Sauvegarde les utilisateurs dans users.json
    saveUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch("./data/users.json", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.users)
            });
        });
    }
    // Connexion
    login(username, password) {
        const user = this.users.find(user => user.username === username && user.password === password);
        if (user) {
            this.currentUser = user;
            return true;
        }
        alert("Identifiants incorrects.");
        return false;
    }
    // Déconnexion
    logout() {
        this.currentUser = null;
    }
}
//# sourceMappingURL=UserController.js.map