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
    loadUsers() {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield fetch("./data/users.json");
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des utilisateurs.");
                }
                this.users = yield response.json();
                // On sauvegarde dans localStorage
                localStorage.setItem("userList", JSON.stringify(this.users));
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
    addUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Vérifie doublon
            if (this.users.find(u => u.username === username)) {
                alert("Ce nom d'utilisateur existe déjà.");
                return false;
            }
            const newUser = { username, password };
            this.users.push(newUser);
            // Met à jour la liste dans localStorage
            localStorage.setItem("userList", JSON.stringify(this.users));
            // On sauvegarde le currentUser
            this.currentUser = newUser;
            localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            // Inutile de tenter un PUT sur bibliotheque.json dans un serveur statique
            // => on retire cette logique
            console.log(`[addUser] Compte créé : ${username}`);
            return true;
        });
    }
    login(username, password) {
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
            const uObj = JSON.parse(storedUser);
            if (uObj.username === username && uObj.password === password) {
                this.currentUser = uObj;
                return true;
            }
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