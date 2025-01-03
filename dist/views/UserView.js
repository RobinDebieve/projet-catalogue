export class UserView {
    // Afficher le formulaire d'inscription
    renderSignupForm(containerId, onSubmit) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error("Container non trouvé pour le formulaire d'inscription.");
            return;
        }
        container.innerHTML = `
        <h2>Créer un compte</h2>
        <form id="signupForm">
          <input type="text" id="signupUsername" placeholder="Nom d'utilisateur" required />
          <input type="password" id="signupPassword" placeholder="Mot de passe" required />
          <button type="submit">S'inscrire</button>
        </form>
      `;
        const signupForm = document.getElementById("signupForm");
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("signupUsername").value;
            const password = document.getElementById("signupPassword").value;
            onSubmit(username, password);
        });
    }
    // Afficher le formulaire de connexion
    renderLoginForm(containerId, onSubmit) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error("Container non trouvé pour le formulaire de connexion.");
            return;
        }
        container.innerHTML = `
        <h2>Se connecter</h2>
        <form id="loginForm">
          <input type="text" id="loginUsername" placeholder="Nom d'utilisateur" required />
          <input type="password" id="loginPassword" placeholder="Mot de passe" required />
          <button type="submit">Connexion</button>
        </form>
      `;
        const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;
            onSubmit(username, password);
        });
    }
}
//# sourceMappingURL=UserView.js.map