// Point d'entrée participant : écran d'accueil et identification par pseudo.
(() => {
  const $ = id => document.getElementById(id);
  $("titre-jeu").textContent = CONFIG.TITRE; document.title = CONFIG.TITRE;
  $("intro").innerHTML = CONFIG.INTRO.map(p => `<p>${p.replace(/[<>&]/g, "")}</p>`).join("");

  async function entrer(pseudo) {
    const err = $("pseudo-erreur"), btn = $("commencer");
    err.textContent = ""; btn.disabled = true; btn.classList.add("charge");
    try {
      const data = await DB.login(pseudo);
      localStorage.setItem("jdp_pseudo", data.pseudo);
      Jeu.start(data);
    } catch (e) {
      console.error(e); err.textContent = "Connexion impossible. Vérifie ta connexion et réessaie.";
      btn.disabled = false; btn.classList.remove("charge");
    }
  }
  $("form-pseudo").addEventListener("submit", e => { e.preventDefault(); const p = $("pseudo").value.trim(); if (p) entrer(p); });
  $("changer").addEventListener("click", Jeu.quitter);
  const saved = localStorage.getItem("jdp_pseudo");
  if (saved) { $("pseudo").value = saved; entrer(saved); }
})();
