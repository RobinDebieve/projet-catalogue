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
        this.loadUsers(); // charge depuis localStorage ou users.json
    }
    // Charge les utilisateurs
    loadUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Vérifier dans localStorage
            const localUsers = localStorage.getItem("userList");
            if (localUsers) {
                console.log("Chargement des utilisateurs depuis localStorage");
                this.users = JSON.parse(localUsers);
                return;
            }
            // 2. Sinon, fetch users.json
            try {
                const response = yield fetch("./data/users.json");
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des utilisateurs.");
                }
                this.users = yield response.json();
                // Sauvegarde en localStorage (pour persister si on fait des modifs plus tard)
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
            if (this.users.find(user => user.username === username)) {
                alert("Ce nom d'utilisateur existe déjà.");
                return false;
            }
            const newUser = { username, password };
            this.users.push(newUser);
            // Sauvegarde la liste entière
            localStorage.setItem("userList", JSON.stringify(this.users));
            // Connecte directement
            this.currentUser = newUser;
            localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            return true;
        });
    }
    login(username, password) {
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
            const storedUser = JSON.parse(storedUserStr);
            if (storedUser.username === username && storedUser.password === password) {
                this.currentUser = storedUser;
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