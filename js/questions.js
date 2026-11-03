/* =====================================================================
   TON ESPACE DE TRAVAIL : toutes les énigmes sont ici.
   - Chaque étape a un `id` UNIQUE et STABLE (ne jamais le changer ni le réutiliser).
   - Chaque indice a un `id` UNIQUE dans son étape, également STABLE.
   - `titre`, `texte` et `solutions` se modifient librement.
   - `indices` peut être vide [] ; `vraieQuestion` peut être omise.
   - L'ordre du tableau = l'ordre du jeu. Tu peux le changer sans risque.
   - Plusieurs solutions acceptées : ajoute-les dans `solutions`.
   - OPTIONNEL sur chaque indice et sur la vraieQuestion :
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
      { id: "indice-1", texte: "Qui mange des frites?", solutions: ["Aless"], commentaire: "Aless le gros mangeur de frite la" },
      { id: "indice-2", texte: "Ou il habite ?", solutions: ["Belgique"] }
    ],
    vraieQuestion: { texte: "Combien de barquette de frite il mange par jour ? (12)", solutions: ["12", "douze"], affichage: "12 (douze)", commentaire: "Il y en avait même un treizième, caché derrière son écran !" }
  },
  {
    id: "etape-2",
    titre: "Étape 2",
    indices: [],
    vraieQuestion: { texte: "Quelle est cette chose orange qu'on sculpte à Halloween ?", solutions: ["Citrouille"] }
  },
  {
    id: "etape-3",
    titre: "Étape 3",
    indices: [{ id: "indice-1", texte: "Quel est le plus grand océan du monde ?", solutions: ["Pacifique", "Océan Pacifique"] }],
    vraieQuestion: { texte: "Combien font 6 × 7 ?", solutions: ["42", "quarante-deux", "quarante deux"] }
  }
];
