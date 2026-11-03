/* =====================================================================
   TON ESPACE DE TRAVAIL : toutes les énigmes sont ici.
   - Chaque étape a un `id` UNIQUE et STABLE (ne jamais le changer ni le réutiliser).
   - Chaque indice a un `id` UNIQUE dans son étape, également STABLE.
   - `titre`, `texte` et `solutions` se modifient librement.
   - `indices` peut être vide [] ; `vraieQuestion` peut être omise.
   - L'ordre du tableau = l'ordre du jeu. Tu peux le changer sans risque.
   - Plusieurs solutions acceptées : ajoute-les dans `solutions`.
   - OPTIONNEL sur chaque indice et sur la vraieQuestion (indépendants, cumulables) :
       image       : chemin local d'une image du projet, ex. "images/enigme-1.png"
                     (proportions conservées, taille limitée automatiquement)
       lecteur     : lien YouTube (watch?v=..., youtu.be/..., shorts/...) lu directement dans la page
     `texte` peut être laissé vide ("") si l'énigme n'est qu'une image ou une vidéo.
   - OPTIONNEL aussi :
       affichage   : la réponse telle qu'elle s'affiche une fois validée
                     (par défaut : la 1re solution de la liste, avec sa bonne orthographe).
       commentaire : une anecdote affichée sous la réponse, une fois validée seulement.
   Voir le README pour les précautions si des joueurs ont déjà commencé.
   ===================================================================== */
const questions = [
  {
    id: "etape-1",
    titre: "Étape 1",
    indices: [
      { id: "indice-1", texte: "Escargot", solutions: ["Martin", "Mart", "Marty"], commentaire: "Martin est l'escargot de la bande, il porte toujours sa maison avec lui." },
      { id: "indice-2", texte: "Un deuxième indice : la capitale de la France", solutions: ["Paris"] }
    ],
    vraieQuestion: { texte: "Combien y en a-t-il ?", solutions: ["12", "douze"], affichage: "12 (douze)", commentaire: "Il y en avait même un treizième, caché derrière la porte !" }
  },
  {
    id: "etape-2",
    titre: "Étape 2",
    indices: [],
    vraieQuestion: { texte: "Quelle est cette chose orange qu'on sculpte à Halloween ?", image: "images/exemple.svg", solutions: ["Citrouille géante", "citrouille", "pumpkin", "giant pumpkin"] }
  },
  {
    id: "etape-3",
    titre: "Étape 3",
    indices: [{ id: "indice-1", texte: "Le plus grand océan du monde", lecteur: "https://youtu.be/dQw4w9WgXcQ", solutions: ["Pacifique", "Océan Pacifique"] }],
    vraieQuestion: { texte: "Combien font 6 × 7 ?", solutions: ["42", "quarante-deux", "quarante deux"] }
  }
];
