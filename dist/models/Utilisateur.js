export class Utilisateur {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
    afficherDetails() {
        var _a;
        console.log(`Utilisateur: ${this.username}, Email: ${(_a = this.email) !== null && _a !== void 0 ? _a : "N/A"}`);
    }
}
//# sourceMappingURL=Utilisateur.js.map