/* =====================================================================
   TON ESPACE DE TRAVAIL : toutes les énigmes sont ici.
   - Chaque étape a un `id` UNIQUE et STABLE (ne jamais le changer ni le réutiliser).
   - Chaque indice a un `id` UNIQUE dans son étape, également STABLE.
   - `titre`, `texte` et `solutions` se modifient librement.
   - `indices` peut être vide [] ; `vraieQuestion` peut être omise.
   - L'ordre du tableau = l'ordre du jeu. Tu peux le changer sans risque.
   - Plusieurs solutions acceptées : ajoute-les dans `solutions`.
   Voir le README pour les précautions si des joueurs ont déjà commencé.
   ===================================================================== */
const questions = [
  {
    id: "etape-1",
    titre: "Étape 1",
    indices: [
      { id: "indice-1", texte: "Escargot", solutions: ["Martin", "Mart", "Marty"] },
      { id: "indice-2", texte: "Un deuxième indice : la capitale de la France", solutions: ["Paris"] }
    ],
    vraieQuestion: { texte: "Combien y en a-t-il ?", solutions: ["12", "douze"] }
  },
  {
    id: "etape-2",
    titre: "Étape 2",
    indices: [],
    vraieQuestion: { texte: "Quelle est cette chose orange qu'on sculpte à Halloween ?", solutions: ["Citrouille géante", "citrouille", "pumpkin", "giant pumpkin"] }
  },
  {
    id: "etape-3",
    titre: "Étape 3",
    indices: [{ id: "indice-1", texte: "Le plus grand océan du monde", solutions: ["Pacifique", "Océan Pacifique"] }],
    vraieQuestion: { texte: "Combien font 6 × 7 ?", solutions: ["42", "quarante-deux", "quarante deux"] }
  }
];
