// Validation souple : casse, accents, espaces, ponctuation, variantes, petites fautes.
const Validation = (() => {
  const norm = s => String(s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  function dist(a, b) {
    const m = a.length, n = b.length;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++)
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }

  // Tolérance : ≤4 car. = exact ; 5-8 = 1 faute ; >8 = 2 fautes. Réponses numériques = exactes.
  function tolerance(sol) {
    if (/\d/.test(sol)) return 0;
    return sol.length <= 4 ? 0 : sol.length <= 8 ? 1 : 2;
  }

  function check(answer, solutions) {
    const a = norm(answer);
    if (!a) return false;
    return (solutions || []).some(s => { const n = norm(s); return n && dist(a, n) <= tolerance(n); });
  }
  return { norm, check };
})();
if (typeof module !== "undefined") module.exports = Validation;
