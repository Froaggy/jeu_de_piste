// Administration : connexion Supabase Auth + consultation. Lecture seule, protégée par RLS côté base.
(() => {
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = d => new Date(d).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "medium" });
  const sb = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  let players = [], attempts = [], selected = null;

  async function fetchAll(table, order) { // pagination (Supabase limite à 1000 lignes par requête)
    let all = [], from = 0;
    for (;;) {
      const { data, error } = await sb.from(table).select("*").order(order, { ascending: true }).range(from, from + 999);
      if (error) throw error;
      all = all.concat(data); if (data.length < 1000) return all; from += 1000;
    }
  }

  async function load() {
    try { [players, attempts] = await Promise.all([fetchAll("players", "created_at"), fetchAll("attempts", "id")]); }
    catch (e) { console.error(e); $("liste").innerHTML = `<li class="err">Chargement impossible (${esc(e.message)})</li>`; return; }
    const by = {}; attempts.forEach(a => (by[a.player_id] ||= []).push(a));
    const total = questions.length;
    players.forEach(p => {
      p.att = by[p.id] || []; const set = Progression.validatedSet(p.att);
      p.done = Progression.doneCount(questions, set); p.total = total;
      p.last = p.att.length ? p.att[p.att.length - 1].created_at : p.created_at;
    });
    players.sort((a, b) => new Date(b.last) - new Date(a.last));
    renderList(); if (selected) renderDetail(selected); renderErreurs();
  }

  function renderList() {
    const q = $("recherche").value.trim().toLowerCase();
    $("liste").innerHTML = players.filter(p => p.pseudo.toLowerCase().includes(q)).map(p =>
      `<li><button data-id="${p.id}" class="${p.id === selected ? "actif" : ""}"><strong>${esc(p.pseudo)}</strong>
        <span>${p.done} / ${p.total} · ${p.att.length} tentative(s)</span>
        <span class="mini"><i style="width:${p.total ? p.done / p.total * 100 : 0}%"></i></span></button></li>`).join("")
      || `<li class="vide">Aucun participant.</li>`;
  }

  const badge = a => `<li class="${a.is_correct ? "ok" : "ko"}"><span>${a.is_correct ? "✔" : "✘"} ${esc(a.answer)}</span><time>${fmt(a.created_at)}</time></li>`;

  function renderDetail(id) {
    const p = players.find(x => x.id === id); if (!p) return;
    const set = Progression.validatedSet(p.att), cur = Progression.currentIndex(questions, set);
    const known = new Set();
    let h = `<h2>${esc(p.pseudo)}</h2><p class="meta">Inscrit le ${fmt(p.created_at)} · dernière activité ${fmt(p.last)}<br>
      Progression : <strong>${p.done} / ${p.total}</strong> étapes terminées${cur >= p.total ? " · <strong class='okc'>Jeu terminé</strong>" : ""}</p>`;
    questions.forEach((s, i) => {
      const done = Progression.stepDone(s, set), items = Progression.items(s);
      const state = done ? "terminée" : i === cur ? "en cours" : "non commencée";
      h += `<section class="etape ${done ? "fait" : ""}"><h3>${esc(s.titre)} <small>${state}</small></h3>`;
      items.forEach(it => {
        known.add(Progression.key(s.id, it.id));
        const m = p.att.filter(a => a.step_id === s.id && a.item_id === it.id);
        h += `<div class="item"><p><em>${it.kind === "question" ? "Question" : "Indice"}</em> ${esc(it.texte)}</p>${
          m.length ? `<ul class="tent">${m.map(badge).join("")}</ul>` : `<p class="vide">Aucune tentative</p>`}</div>`;
      });
      h += `</section>`;
    });
    const orph = p.att.filter(a => !known.has(Progression.key(a.step_id, a.item_id)));
    if (orph.length) h += `<section class="etape"><h3>Tentatives sur des éléments supprimés ou renommés</h3><ul class="tent">${
      orph.map(a => badge(a).replace("<span>", `<span>[${esc(a.step_id)}/${esc(a.item_id)}] `)).join("")}</ul></section>`;
    h += `<details><summary>Historique chronologique complet (${p.att.length})</summary><ul class="tent">${
      p.att.map(a => badge(a).replace("<span>", `<span>[${esc(a.step_id)}/${esc(a.item_id)}] `)).join("")}</ul></details>`;
    $("detail").innerHTML = h;
  }

  function renderErreurs() { // compare les erreurs de tous les joueurs, question par question
    const names = Object.fromEntries(players.map(p => [p.id, p.pseudo]));
    let h = "<h2>Mauvaises réponses par question</h2>";
    questions.forEach(s => Progression.items(s).forEach(it => {
      const bad = attempts.filter(a => !a.is_correct && a.step_id === s.id && a.item_id === it.id);
      const g = {}; bad.forEach(a => { const k = a.answer.trim().toLowerCase(); (g[k] ||= { txt: a.answer.trim(), who: new Set() }).who.add(names[a.player_id]); });
      const rows = Object.values(g).sort((a, b) => b.who.size - a.who.size);
      h += `<section class="etape"><h3>${esc(s.titre)} – ${esc(it.texte)} <small>${bad.length} erreur(s)</small></h3>${
        rows.length ? `<ul class="tent">${rows.map(r => `<li class="ko"><span>✘ ${esc(r.txt)}</span><time>${[...r.who].map(esc).join(", ")}</time></li>`).join("")}</ul>` : `<p class="vide">Aucune erreur</p>`}</section>`;
    }));
    $("vue-erreurs").innerHTML = h;
  }

  function show(session) {
    $("login").hidden = !!session; $("app").hidden = !session;
    if (session) load();
  }

  $("form-login").addEventListener("submit", async e => {
    e.preventDefault(); $("login-err").textContent = "";
    const { error } = await sb.auth.signInWithPassword({ email: $("email").value, password: $("mdp").value });
    if (error) $("login-err").textContent = "Identifiants incorrects."; else show(true);
  });
  $("logout").onclick = async () => { await sb.auth.signOut(); selected = null; show(false); };
  $("rafraichir").onclick = load;
  $("recherche").oninput = renderList;
  $("liste").addEventListener("click", e => { const b = e.target.closest("button[data-id]"); if (!b) return; selected = b.dataset.id; renderList(); renderDetail(selected); });
  document.querySelectorAll(".onglets button").forEach(b => b.onclick = () => {
    document.querySelectorAll(".onglets button").forEach(x => x.classList.toggle("actif", x === b));
    $("vue-joueurs").hidden = b.dataset.v !== "joueurs"; $("vue-erreurs").hidden = b.dataset.v !== "erreurs";
  });
  sb.auth.getSession().then(({ data }) => show(!!data.session));
})();
