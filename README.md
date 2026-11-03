# Jeu de piste

Site de chasse au trésor : HTML/CSS/JS pur, hébergé sur **GitHub Pages**, données dans **Supabase** (gratuit).

```
index.html        site des participants      admin.html   administration (page distincte)
css/style.css     css/admin.css
js/config.js      ← URL/clé Supabase, vidéo finale, textes d'intro
js/questions.js   ← TON ESPACE DE TRAVAIL : toutes les énigmes
js/validation.js  validation souple    js/progression.js  calcul de progression
js/database.js    échanges Supabase    js/jeu.js, app.js  moteur + accueil    js/admin.js
sql/supabase.sql  tables, sécurité, fonctions
```

## 1. Configurer Supabase
1. Crée un compte et un projet sur supabase.com (offre gratuite).
2. **Authentication > Providers > Email** : désactive **« Allow new users to sign up »** (essentiel : sinon n'importe qui pourrait se créer un compte).
3. **Authentication > Users > Add user** : crée ton compte administrateur (e-mail + mot de passe, coche « Auto confirm »).
4. Ouvre `sql/supabase.sql`, **remplace `ton-email@exemple.fr` par l'e-mail de l'étape 3**, colle le tout dans **SQL Editor** et clique **Run**.
5. **Project Settings > API** : copie la *Project URL* et la clé **anon / public** dans `js/config.js`. N'utilise **jamais** la clé `service_role`.

## 2. Déployer sur GitHub Pages
1. Crée un dépôt GitHub (ex. `jeu-de-piste`) et envoie-y tous les fichiers (glisser-déposer sur github.com suffit).
2. **Settings > Pages** : Source = *Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. Après une minute : `https://TON-PSEUDO.github.io/jeu-de-piste/` (joueurs) et `…/admin.html` (admin).

Tester en local : ouvre `index.html` dans un navigateur (ou `python3 -m http.server`).

## 3. Écrire tes énigmes (`js/questions.js`)
Une étape = `id` stable + `titre` + `indices` (0, 1 ou plusieurs) + `vraieQuestion` (optionnelle). Chaque indice et la question ont `texte` et `solutions` (autant que voulu). Le compteur `x / N` et la barre s'adaptent seuls. Les solutions sont tolérantes : majuscules, accents, espaces, ponctuation, et petites fautes (réponses de ≤ 4 caractères ou contenant un chiffre : exactes ; 5-8 caractères : 1 faute ; au-delà : 2 fautes). Ajoute toi-même les variantes utiles (« pumpkin »…).

### Modifier le jeu en cours de partie : précautions
La progression est **recalculée à partir des tentatives enregistrées**, associées à `id` d'étape + `id` d'indice. Donc :
- **Sans risque** : changer `titre`, `texte`, `solutions` ; réordonner les étapes ou les indices ; ajouter une étape à la fin.
- **Ne jamais** changer ou réutiliser un `id` existant : les réponses associées deviendraient « orphelines » (elles restent visibles dans l'admin, mais ne comptent plus).
- **Ajouter un indice** dans une étape : donne-lui un **nouvel id inédit**. Les joueurs qui avaient *terminé* cette étape la voient redevenir incomplète et devront répondre au nouvel indice (leur compteur recule d'un cran). Pour l'éviter, ajoute plutôt l'indice à une étape pas encore atteinte.
- **Insérer une étape au milieu** : les joueurs plus avancés devront la faire (leur compteur recule). Préfère l'ajouter à la fin.
- **Supprimer un indice/une étape** : l'historique reste en base ; la progression ignore simplement l'élément retiré.
- Le ré-ordonnancement d'indices d'une étape déjà commencée est possible, mais le joueur verra d'abord le premier indice non validé dans le nouvel ordre.

## 4. Vidéo finale
Modifie `VIDEO_URL` dans `js/config.js` (lien YouTube classique, `youtu.be` ou `embed`).

## 5. Administration
Va sur `admin.html`, connecte-toi avec le compte de l'étape 1.3. Tu y trouves : la liste des participants (progression, nombre de tentatives, recherche), le détail par participant (étapes, réponses justes ✔ en vert / fausses ✘ en rouge avec date et heure, historique chronologique complet) et l'onglet **Erreurs par question** pour comparer les mauvaises réponses de tous. Après un changement de `questions.js`, l'admin utilise la même liste d'étapes (même dépôt).

## 6. Sécurité (proportionnée)
- Les tables sont fermées aux visiteurs (RLS). Ils n'ont accès qu'à deux fonctions : `jdp_login` (créer/retrouver un pseudo) et `jdp_submit` (enregistrer une tentative). Ils ne peuvent donc pas lister les autres joueurs.
- Seul le compte dont l'e-mail figure dans `is_admin()` peut lire les données ; le mot de passe n'est jamais dans le code.
- Limites assumées : les solutions sont dans `questions.js` (lisibles par un curieux) ; le pseudo n'est pas protégé (quelqu'un connaissant un pseudo peut jouer sous ce nom) ; la bonne/mauvaise réponse est jugée par le navigateur.
- Supabase gratuit : un projet inactif 7 jours est mis en pause — ouvre simplement le tableau de bord pour le relancer avant de lancer le jeu.

## 7. Check-list de test manuelle
Nouveau pseudo · même pseudo en « ALICE »/« alice » (même compte) · bonne puis mauvaise réponse (vérifier les lignes dans *Table Editor > attempts*) · fermer le navigateur au milieu d'une étape à plusieurs indices et revenir (même pseudo, autre appareil) · bouton Précédent (rien ne régresse, pas de champ de saisie sur les anciennes étapes) · barre et compteur · écran de victoire et vidéo · `admin.html` : connexion, détail, onglet Erreurs · `admin.html` sans connexion ou avec un autre compte : aucune donnée.
