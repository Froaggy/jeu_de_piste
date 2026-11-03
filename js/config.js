// ============ CONFIGURATION (à modifier) ============
const CONFIG = {
  // Supabase : Project Settings > API (clé "anon / public" UNIQUEMENT, jamais la service_role)
  SUPABASE_URL: "https://VOTRE-PROJET.supabase.co",
  SUPABASE_ANON_KEY: "VOTRE_CLE_ANON_PUBLIQUE",

  // Récompense finale : n'importe quelle adresse YouTube (watch?v=..., youtu.be/..., embed/...)
  VIDEO_URL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

  TITRE: "Le Jeu de piste",
  INTRO: [
    "Bienvenue ! Une série d'étapes t'attend, chacune cachant des indices et une question finale.",
    "Résous-les dans l'ordre pour débloquer la récompense. Les tentatives sont illimitées.",
    "Ta progression est sauvegardée : reviens quand tu veux avec le même pseudo, depuis n'importe quel appareil."
  ]
};
