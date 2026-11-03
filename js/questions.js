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
      { id: "indice-1", texte: "Quel est le point de départ montré dans la vidéo ?", lecteur:"https://www.youtube.com/watch?v=akrdSDew2qM", solutions: ["Spawn", "le spawn"], affichage:"Le Spawn !", commentaire: "Désolé pour la qualité 😅 On est d’accord que ça ressemble à “I’m blue, daboudi dabouda…” ?" }
    ],
    vraieQuestion: { texte: "Combien de geysers y a-t-il ?", solutions: ["3", "trois"], affichage: "3 !", commentaire: "d’ailleurs, y as-tu trouvé tous les easters eggs ?" }
  },
  {
    id: "etape-2",
    titre: "Étape 2",
    indices: [
		{ id: "indice-1", texte: "This is Halloween !", solutions: ["Citrouille", "la citrouille", "une citrouille", "pumpkin", "citrouille géante", "giant pumpkin"], affichage:"La citrouille géante !", commentaire: "référence au prank d’Edgar dans la saison 4." }
	],
    vraieQuestion: { texte: "Combien de bougie la citrouille a dans sa bouche", solutions: ["2", "deux"], affichage: "2 !" }
  },
  {
    id: "etape-3",
    titre: "Étape 3",
    indices: [{ id: "indice-1", texte: "Il suffit de 3 minutes à feu moyen pour que ça cuise", solutions: ["Poêle", "Poêle géante"], affichage:"la poêle géante !" }],
    vraieQuestion: { texte: "Quel aliment se trouve dans cette fameuse poêle ?", solutions: ["oeuf", "un oeuf", "oeuf au plat", "un oeuf au plat"], affichage: "un oeuf au plat !" }
  },
  {
    id: "etape-4",
    titre: "Étape 4",
    indices: [
		{ id: "indice-1", texte: "a quoi fait référence cette phrase ? “Ya no puede caminar !“", solutions: ["cafards", "cafards géants", "cucaracha", "la cucaracha"], affichage:"les cucaracha !" }
	],
    vraieQuestion: { texte: "Combien y a-t-il de cafards ?", solutions: ["7", "sept"], affichage: "7 !", commentaire:"Les cafards faisant référence au groupe sleep token, et 7 étant le nombre de personne faisant partie du groupe" }
  },
  {
    id: "etape-5",
    titre: "Étape 5",
    indices: [
		{ id: "indice-1", texte: "Décrypte moi : “Frolvhxp“", solutions: ["coliseum", "colisée"], affichage:"le colisée !" },
		{ id: "indice-2", texte: "À quel streamer fait référence ce mot ?", solutions: ["kires", "kireslechat"], affichage:"kireslechat !" }
	],
    vraieQuestion: { texte: "À quoi sert la construction de kires ?", solutions: ["se battre", "battre", "taper", "se taper"], affichage: "Se Battre !"}
  },
  {
    id: "etape-6",
    titre: "Étape 6",
    indices: [
		{ id: "indice-1", texte: "À qui appartient cet endroit : c'est le zinclar de Mojo ou quoi ?", solutions: ["Edgar", "Kazuu", "Edgar & Kazuu", "Edgar et Kazuu", "kazuu et edgar", "kazuu & edgar"], affichage:"Edgar & Kazuu" }
	],
    vraieQuestion: { texte: "Quel bois a été utilisé pour construire cet arbre ?", solutions: ["du chêne", "chêne", "oak", "oak wood"], affichage: "Du chêne !", commentaire:"Très bel arbre au demeurant"}
  },
  {
    id: "etape-7",
    titre: "Étape 7",
    indices: [
		{ id: "indice-1", texte: "A qui appartient cet endroit : il s'agit du plus grand portail existant dans l'overworld", solutions: ["Leupho", "Leuphou"], affichage:"Leupho !" },
		{ id: "indice-2", texte: "Calculer la superficie de ce portail", solutions: ["529", "cinq cent vingt neuf", "23x23"], affichage: "23x23 soit 529 blocs !", commentaire:"On peut pas faire plus grand ! Sinon il ne s’allume pas."}
	],
    vraieQuestion: { texte: "Quel est le numéro noté après “Leupho is real“ dans ce beau château de Mario ?", solutions: ["200124", "20/01/24"], affichage: "200124 !", commentaire:"Il s'agit en réalité de la date de son tout premier stream !"}
  },
  {
    id: "etape-8",
    titre: "Étape 8",
    indices: [
		{ id: "indice-1", texte: "Un mot se cache dans cette phrase : “Et Si C'était A Revoir Game Of Thrones ?“", solutions: ["escargot"], affichage:"escargot !"},
		{ id: "indice-2", texte: "A qui appartient cette indice ?", solutions: ["Aru", "Arusdownside"], affichage: "Aru !"}
	],
    vraieQuestion: { texte: "Combien y a-t-il de branches à son horreur boréale ?", solutions: ["3", "trois"], affichage: "3 !"}
  },
  {
    id: "etape-9",
    titre: "Étape 9",
    indices: [
		{ id: "indice-1", texte: "Quelle immense structure est visitée en Allemagne chaque année par plus d'un million de touristes ?", solutions: ["château de Neuschwanstein", "Neuschwanstein"], affichage: "Château de Neuschwanstein !" },
		{ id: "indice-2", texte: "Quel streamer.euse possède un château de cette envergure ?", solutions: ["Lirae", "Lira"], affichage: "Lirae !"}
	],
    vraieQuestion: { texte: "Quel est le nombre de tours bâties sur les murailles ?", solutions: ["16", "seize"], affichage: "16 !"}
  },
  {
    id: "etape-10",
    titre: "Étape 10",
    indices: [
		{ id: "indice-1", texte: "À qui appartient ce build ?", image: "images/dragon.png", solutions: ["Jowy"], affichage:"Jowy" }
	],
    vraieQuestion: { texte: "Rend toi au sanctuaire des Axolotls. Combien y comptes-tu de statues ?", solutions: ["4", "quatre"], affichage: "4 !"}
  },
  {
    id: "etape-11",
    titre: "Étape 11",
    indices: [
		{ id: "indice-1", texte: "Corderonne serait fier de cet endroit !", solutions: ["pisse arc-en-ciel", "piste arc-en-ciel", "aqueduc", "aqueduc arc-en-ciel"], affichage:"La pisse arc-en-ciel !", commentaire:"hommage à Corderonne !" },
		{ id: "indice-2", texte: "Regarde bien l'aqueduc, combien de couleur le compose ?", solutions: ["7", "sept"], affichage:"7 couleurs !", commentaire:"Rouge, Orange, Vert, Jaune, Bleu foncé, Bleu clair, Violet" }
	],
    vraieQuestion: { texte: "Dans un certain livre pour les 5 ans d'Æternam, combien de questions, le.la streamer.euse à donné comme question ?", solutions: ["4", "quatre"], affichage: "4 !", commentaire:"Merci encore pour le gâteau, je me suis régalé !"}
  },
  {
    id: "etape-12",
    titre: "Étape 12",
    indices: [
		{ id: "indice-1", texte: "Qui est le petit filou à caché des “suavemente“ partout dans le serveur ?", solutions: ["Silent", "Silent_seef"], affichage:"Silent_seef !", commentaire:"Il paraît qu'il apprécie beaucoup Gras-non-dort" }
	],
    vraieQuestion: { texte: "Combien de salles “officielles“ y a-t-il dans la CTM ? (le discord peut vous aider)", solutions: ["15", "quinze"], affichage: "15 !", commentaire:"J'ai mis à peine 5h pour finir ces épreuves !"}
  },
  {
    id: "etape-13",
    titre: "Étape 13",
    indices: [
		{ id: "indice-1", texte: "À qui appartient une place si immense qu'on pourrait en mettre 20 000 ?", solutions: ["Goombs", "Goombs64"], affichage:"Goombs !", commentaire:"Le saviez vous ? il aime les parkings !" }
	],
    vraieQuestion: { texte: "Sous sa pyramide, Cette personne a fait un build qui s'inspire d'un jeu, lequel ?", solutions: ["sonic", "sonic adventure", "sa2", "sa2b", "sonic adventure 2", "sonic adventure 2 battle"], affichage: "Sonic adventure 2 battle !"}
  },
  {
    id: "etape-14",
    titre: "Étape 14",
    indices: [
		{ id: "indice-1", texte: "Quel film sorti en 1996 se classe au 5e rang des plus grands succès d'un cinéaste connu pour Les Infiltrés ?", solutions: ["Casino"], affichage:"Casino !"},
		{ id: "indice-2", texte: "Qui a construit un bâtiment de cette envergure ?", solutions: ["Froaggy", "Fro"], affichage:"Froaggy !"}
	],
    vraieQuestion: { texte: "Combien de jeux d'argent ont été conçus dans le crôasino ?", solutions: ["8", "huit"], affichage: "8 !"}
  },
  {
    id: "etape-15",
    titre: "Étape 15",
    indices: [
		{ id: "indice-1", texte: "Quel type de commerce alimentaire a été inauguré en 1930 ?", solutions: ["Supermarché", "un supermarché"], affichage:"un supermarché !"},
		{ id: "indice-2", texte: "Qui a inauguré ce type de commerce sur le serveur ?", solutions: ["Merlin", "mer1in"], affichage:"Merlin !"},
		{ id: "indice-3", texte: "Combien de cobblestone O'relio a-t-il commandé ?", solutions: ["54K", "54 k", "54 000", "54000", "54 mille", "cinquante quatre mille"], affichage:"54000 !"}
	],
    vraieQuestion: { texte: "Tant qu'on y est, quelle est la quantité d'améthyste commandé par rockchot ?", solutions: ["7000", "7 000", "7K", "7 k", "7 mille", "sept mille"], affichage: "7000 !"}
  },
  {
    id: "etape-16",
    titre: "Étape 16",
    indices: [
		{ id: "indice-1", texte: "Qui possède une statue de grenouille ?", solutions: ["Kid", "kidsora"], affichage:"kidsora !", commentaire:"et non, ce n'est pas Froaggy !"}
	],
    vraieQuestion: { texte: "Combien de chaînes existe-t-il dans la love room de Twytwy ?", solutions: ["2", "deux"], affichage: "2 !"}
  },
  {
    id: "etape-17",
    titre: "Étape 17",
    indices: [
		{ id: "indice-1", texte: "Qui a construit l'un des endroits les plus lumineux du serveur ?", solutions: ["Delphuss"], affichage:"Delphuss !"}
	],
    vraieQuestion: { texte: "Quel est le nombre d'entrées à la lampe de chevet ?", solutions: ["4", "quatre"], affichage: "4 !"}
  },
  {
    id: "etape-18",
    titre: "Étape 18",
    indices: [
		{ id: "indice-1", texte: "Comment nommes-t-on les petites personnes ?", solutions: ["nains", "les nains", "nain", "un nain"], affichage:"Les nains !"},
		{ id: "indice-2", texte: "Qui a cette particularité sur le serveur ?", solutions: ["Orelio", "Orelionova", "Babs", "Bab_s"], affichage:"Orelio & Babs !"},
		{ id: "indice-3", texte: "Quel est l'aliment produit dans la maison aux 1000 bougies ?", solutions: ["miel", "le miel", "du miel"], affichage:"Le miel !"}
	],
    vraieQuestion: { texte: "Observe bien la statue portant la sphère géante. De quel titan s'inspire la statue ?", solutions: ["Atlas"], affichage: "Atlas !", commentaire:"Ce titan a été condamné par Zeus lui même selon la mythologie grecque !"}
  },
  {
    id: "etape-19",
    titre: "Étape 19",
    indices: [
		{ id: "indice-1", texte: "La prochaine personne est riche d'émeraude. Qui est-ce ?", solutions: ["Mel", "Mel__live"], affichage:"Mel !"}
	],
    vraieQuestion: { texte: "Une cloche cache un passage secret chez lui, trouve le et note la réponse (à voir en jeu)", solutions: ["10", "dix"], affichage: "10 !"}
  },
  {
    id: "etape-20",
    titre: "Étape 20",
    indices: [
		{ id: "indice-1", texte: "Dans quel endroit peut-on trouver un moyen de transport mis en service à Paris en 1900 ?", solutions: ["le métro", "metro", "métro parisien"], affichage:"Le métro !", commentaire:"Il s'agit ici d'un métrou !"},
		{ id: "indice-2", texte: "Qui possède ce type de transport sur le serveur ?", solutions: ["Keraloon", "kera"], affichage:"Keraloon !"}
	],
    vraieQuestion: { texte: "Combien de Yakyak Kera possède-t-elle ?", solutions: ["4", "quatre"], affichage: "4 !", commentaire:"Plus que quelques questions, tiens bon !"}
  },
  {
    id: "etape-21",
    titre: "Étape 21",
    indices: [
		{ id: "indice-1", texte: "La personne à deviner possède un trou énorme. Qui est-ce ?", solutions: ["Bmou", "Bm"], affichage:"Bmou !"}
	],
    vraieQuestion: { texte: "Quelle saison a fait connaître Bmou pour son trou emblématique ?", solutions: ["Saison 3", "3", "trois"], affichage: "saison 3 !"}
  },
  {
    id: "etape-22",
    titre: "Étape 22",
    indices: [
		{ id: "indice-1", texte: "Ce duo prépare une course emblématique. Qui est-ce ?", solutions: ["Jéjou", "Myriade", "Jéjou & Myriade", "jéjou et myriade"], affichage:"Jéjou & Myriade !", commentaire:"meilleur duo que Fanta et Bob !"}
	],
    vraieQuestion: { texte: "Dans le parcours de coussins de Jéjou et Myriade se trouve un panneau. Quel mot y est écrit en MAJUSCULES ?", solutions: ["PANNEAU"], affichage: "PANNEAU !"}
  },
  {
    id: "etape-23",
    titre: "Dernière étape",
    indices: [
		{ id: "indice-1", texte: "Bravo pour avoir vu presque toutes les bases du serveur ! J'espère que ce voyage t'a plu. La destination finale est à portée d'élytras\n\nHop Léééé le grand final !\n\n Calcul des coordonnées :\n\n X = Les cafards géants + les Yakyak de Kera - les chaînes de Kidsora + nombre d'œufs dans la Poêle Géante", solutions: ["10", "dix"], affichage:"10 !"},
		{ id: "indice-2", texte: "Y = Les tours de Lirae + le nombre de salles chez Silent - la réponse de Mel", solutions: ["21", "vingt et un"], affichage:"21 !"}
	],
    vraieQuestion: { texte: "Z = (le cobble d'O'relio - laméthyste commandée de rockchot × les jeux d'argent de Froaggy) + la surface du portail du Nether de Leupho × les axolotls de Jowy - la saison de Bmou ×  (les couleurs de la pisse arc-en-ciel - les geysers du spawn) × (les questions du livre de Lyorine + les entrées de la lampe de Delphuss + Les bougies de la citrouille) + le nombre de Peach, coupé en 2001 et 24 et additionné.", solutions: ["2021"], affichage: "2021 !", commentaire:"ces chiffres ne te rappellent rien ?"}
  }
];
