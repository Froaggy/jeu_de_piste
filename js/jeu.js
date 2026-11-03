// Moteur du jeu : affichage des étapes, soumission, navigation. Ne contient aucune énigme.
const Jeu = (() => {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = d => new Date(d).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
  let S = null; // { playerId, pseudo, attempts, view, flash, ko, busy, review }

  function start(data) {
    const set = Progression.validatedSet(data.attempts);
    S = { playerId: data.player_id, pseudo: data.pseudo, attempts: data.attempts, busy: false, flash: null, ko: false, review: false,
          view: Math.min(Progression.currentIndex(questions, set), questions.length - 1) };
    $("accueil").hidden = true; render();
  }

  function render() {
    const set = Progression.validatedSet(S.attempts);
    const total = questions.length, done = Progression.doneCount(questions, set);
    const cur = Progression.currentIndex(questions, set);
    $("pseudo-affiche").textContent = S.pseudo;
    $("compteur").textContent = `${done} / ${total}`;
    $("barre").style.width = total ? (done / total * 100) + "%" : "0%";
    $("barre-wrap").setAttribute("aria-valuenow", done); $("barre-wrap").setAttribute("aria-valuemax", total);
    $("barre-bloc").hidden = false;
    if (cur >= total && !S.review) return victoire();
    $("victoire").hidden = true; $("jeu").hidden = false;

    const step = questions[S.view], past = S.view < cur;
    const list = Progression.items(step);
    const activeIdx = list.findIndex(it => !set.has(Progression.key(step.id, it.id)));
    let html = `<h2>${esc(step.titre)}</h2>`;
    if (S.flash) html += `<p class="flash">${esc(S.flash)}</p>`;
    if (!list.length) html += `<p class="muted">Cette étape ne contient aucune question.</p>`;
    list.forEach((it, i) => {
      if (activeIdx !== -1 && i > activeIdx) return; // éléments futurs masqués
      const mine = S.attempts.filter(a => a.step_id === step.id && a.item_id === it.id);
      const good = mine.find(a => a.is_correct), active = i === activeIdx && !past;
      html += `<section class="item ${good ? "valide" : ""}"><p class="type">${it.kind === "question" ? "Question" : "Indice"}</p>
        <p class="texte">${esc(it.texte)}</p>`;
      if (good) html += `<p class="rep-ok">✔ ${esc(good.answer)}</p>`;
      if (active) html += `<form id="form" autocomplete="off"><div class="rangee">
          <input id="reponse" type="text" placeholder="Ta réponse" aria-label="Ta réponse" autocapitalize="none" required>
          <button id="envoyer" class="btn" type="submit">Valider</button></div>
          <p id="statut" class="statut" role="status" aria-live="polite"></p></form>`;
      if (mine.length) html += `<details ${active && mine.length ? "open" : ""}><summary>Mes tentatives (${mine.length})</summary><ul class="tentatives">${
        mine.map(a => `<li class="${a.is_correct ? "ok" : "ko"}"><span>${a.is_correct ? "✔" : "✘"} ${esc(a.answer)}</span><time>${fmt(a.created_at)}</time></li>`).join("")}</ul></details>`;
      html += `</section>`;
    });
    const maxView = Math.min(cur, total - 1);
    html += `<nav class="nav"><button class="btn sec" id="prec" ${S.view === 0 ? "disabled" : ""}>Précédent</button>
      ${S.view < maxView ? `<button class="btn" id="suiv">Suivant</button>` : ""}
      ${cur >= total ? `<button class="btn" id="fin">Retour à la victoire</button>` : (cur - S.view > 1 ? `<button class="btn sec" id="courante">Étape en cours</button>` : "")}</nav>`;
    $("jeu").innerHTML = html;
    S.flash = null;
    const f = $("form");
    if (f) {
      f.addEventListener("submit", submit);
      const inp = $("reponse"); inp.focus({ preventScroll: true });
      if (S.ko) { $("statut").className = "statut ko"; $("statut").textContent = "Mauvaise réponse"; inp.classList.add("secoue"); S.ko = false; }
    }
    $("prec")?.addEventListener("click", () => { S.view--; render(); });
    $("suiv")?.addEventListener("click", () => { S.view++; render(); });
    $("courante")?.addEventListener("click", () => { S.view = cur; render(); });
    $("fin")?.addEventListener("click", () => { S.review = false; render(); });
  }

  async function submit(e) {
    e.preventDefault();
    if (S.busy) return;
    const step = questions[S.view], set = Progression.validatedSet(S.attempts);
    const item = Progression.items(step).find(it => !set.has(Progression.key(step.id, it.id)));
    const input = $("reponse"), raw = input.value, st = $("statut"), btn = $("envoyer");
    if (!raw.trim() || !item) return;
    S.busy = true; btn.disabled = true; input.disabled = true; btn.classList.add("charge");
    st.className = "statut"; st.textContent = "Envoi en cours…";
    const ok = Validation.check(raw, item.solutions);
    try {
      const res = await DB.submit(S.playerId, step.id, item.id, raw, ok);
      S.attempts.push({ step_id: step.id, item_id: item.id, answer: raw, is_correct: ok, created_at: res || new Date().toISOString() });
    } catch (err) {
      console.error(err); S.busy = false; btn.disabled = false; input.disabled = false; btn.classList.remove("charge");
      st.className = "statut ko"; st.textContent = "Connexion impossible : ta réponse n'a pas été enregistrée. Réessaie.";
      return;
    }
    S.busy = false;
    if (ok) {
      st.className = "statut ok"; st.textContent = "✔ Bonne réponse, enregistrée !";
      const nowDone = Progression.stepDone(step, Progression.validatedSet(S.attempts));
      setTimeout(() => { if (nowDone) S.flash = "Étape terminée, bravo !"; render(); }, 800);
    } else { S.ko = true; render(); }
  }

  function youtubeId(url) {
    const m = String(url).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/); return m ? m[1] : null;
  }

  function victoire() {
    $("jeu").hidden = true; $("victoire").hidden = false;
    const id = youtubeId(CONFIG.VIDEO_URL);
    $("video").innerHTML = id ? `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="Récompense" allowfullscreen
      allow="accelerometer; encrypted-media; picture-in-picture"></iframe>` : `<p class="muted">Vidéo non configurée.</p>`;
    $("confettis").innerHTML = Array.from({ length: 28 }, (_, i) =>
      `<i style="left:${(i * 37) % 100}%;animation-delay:${(i % 7) * .25}s;background:var(--c${i % 4})"></i>`).join("");
    $("revoir").onclick = () => { S.review = true; S.view = questions.length - 1; render(); };
  }

  function quitter() { localStorage.removeItem("jdp_pseudo"); location.reload(); }
  return { start, quitter };
})();
