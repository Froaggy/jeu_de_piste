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
    titre: "Point de départ",
    indices: [
      { id: "indice-1", texte: "https://www.youtube.com/watch?v=akrdSDew2qM Quel est le point de départ montré dans la vidéo ?", solutions: ["Spawn", "le spawn"], commentaire: "Désolé pour la qualité 😅 On est d’accord que ça ressemble à “I’m blue, daboudi dabouda…” ?" },
      { id: "indice-2", texte: "Combien de geysers y a-t-il ?", solutions: ["3"], commentaire: "d’ailleurs, y as-tu trouvé tous les easters eggs ?" }
    ],
    vraieQuestion: { texte: "Combien de geysers y a-t-il ?", solutions: ["3", "trois"], affichage: "3", commentaire: "d’ailleurs, y as-tu trouvé tous les easters eggs ?" }
  },
  {
    id: "etape-2",
    titre: "Étape 2",
    indices: [
		{ id: "indice-1", texte: "This is Halloween !", solutions: ["Citrouille", "la citrouille", "une citrouille", "pumpkin", "citrouille géante", "giant pumpkin"], commentaire: "référence au prank d’Edgar dans la saison 4." }
	],
    vraieQuestion: { texte: "Combien de bougie la citrouille a dans sa bouche", solutions: ["2"], affichage: "2" }
  },
  {
    id: "etape-3",
    titre: "Étape 3",
    indices: [{ id: "indice-1", texte: "Quel est le plus grand océan du monde ?", solutions: ["Pacifique", "Océan Pacifique"] }],
    vraieQuestion: { texte: "Combien font 6 × 7 ?", solutions: ["42", "quarante-deux", "quarante deux"] }
  }
];
