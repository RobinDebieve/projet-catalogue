import { Utilisateur } from "./models/Utilisateur";
import { JeuVideo } from "./models/JeuVideo";
import { Bibliotheque } from "./models/Bibliotheque";
// Exemple d'utilisateur
const utilisateur = new Utilisateur(1, "Robin", "robin@example.com", "1234");
utilisateur.afficherInfos();
// Exemple de jeu vidéo
const jeu = new JeuVideo(1, "Zelda", "Nintendo", "Switch", "2017-03-03", "Aventure épique.");
jeu.afficherDetails();
// Exemple de bibliothèque
const bibliotheque = new Bibliotheque(1, []);
bibliotheque.ajouterJeu(1);
bibliotheque.retirerJeu(1);
//# sourceMappingURL=testModel.js.map