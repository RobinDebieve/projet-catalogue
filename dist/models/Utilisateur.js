export class Utilisateur {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
    afficherDetails() {
        console.log(`Utilisateur: ${this.username}, Email: ${this.email}`);
    }
}
//# sourceMappingURL=Utilisateur.js.map