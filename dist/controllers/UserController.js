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
    isLoggedIn() {
        return this.currentUser !== null;
    }
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
            // Sauvegarde dans localStorage
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            // Mettre à jour bibliotheque.json
            try {
                const libraryResponse = yield fetch("./data/bibliotheque.json");
                const libraryData = yield libraryResponse.json();
                libraryData[username] = [];
                yield fetch("./data/bibliotheque.json", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(libraryData),
                });
                // Connecte directement l'utilisateur
                this.currentUser = newUser;
                return true;
            }
            catch (err) {
                console.error("Erreur mise à jour bibliotheque.json :", err);
                return false;
            }
        });
    }
    login(username, password) {
        // Vérification dans this.users
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = user;
            return true;
        }
        // Vérifie dans localStorage
        const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (storedUser &&
            storedUser.username === username &&
            storedUser.password === password) {
            this.currentUser = storedUser;
            return true;
        }
        alert("Identifiants incorrects.");
        return false;
    }
    logout() {
        this.currentUser = null;
        localStorage.removeItem("currentUser");
    }
}
//# sourceMappingURL=UserController.js.map