import { UserView } from "../views/UserView";

describe("UserView", () => {
  let userView: UserView;

  beforeEach(() => {
    userView = new UserView();
    document.body.innerHTML = `<div id="authContainer"></div>`;
  });

  test("renderSignupForm crée le formulaire d'inscription et gère le submit", () => {
    const mockSubmit = jest.fn();

    userView.renderSignupForm("authContainer", mockSubmit);

    const container = document.getElementById("authContainer") as HTMLElement;
    expect(container.innerHTML).toContain("Créer un compte");
    expect(container.querySelector("#signupForm")).not.toBeNull();

    // On remplit le formulaire
    (container.querySelector("#signupUsername") as HTMLInputElement).value = "alice";
    (container.querySelector("#signupPassword") as HTMLInputElement).value = "secret";

    // On simule un "submit" sur le form
    const signupForm = container.querySelector("#signupForm") as HTMLFormElement;
    signupForm.dispatchEvent(new Event("submit"));

    expect(mockSubmit).toHaveBeenCalledWith("alice", "secret");
  });

  test("renderLoginForm crée le formulaire de connexion et gère le submit", () => {
    const mockSubmit = jest.fn();

    userView.renderLoginForm("authContainer", mockSubmit);

    const container = document.getElementById("authContainer") as HTMLElement;
    expect(container.innerHTML).toContain("Se connecter");
    expect(container.querySelector("#loginForm")).not.toBeNull();

    // Remplir et soumettre
    (container.querySelector("#loginUsername") as HTMLInputElement).value = "bob";
    (container.querySelector("#loginPassword") as HTMLInputElement).value = "123";

    const loginForm = container.querySelector("#loginForm") as HTMLFormElement;
    loginForm.dispatchEvent(new Event("submit"));

    expect(mockSubmit).toHaveBeenCalledWith("bob", "123");
  });

  test("affiche un message d'erreur si l'ID de container n'existe pas", () => {
    console.error = jest.fn(); // spy sur console.error

    // On appelle avec un container inexistant
    userView.renderSignupForm("fakeId", () => {});
    expect(console.error).toHaveBeenCalledWith(
      "Container non trouvé pour le formulaire d'inscription."
    );
  });
});
