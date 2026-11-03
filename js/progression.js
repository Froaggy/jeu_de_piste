// Calcul de la progression à partir des tentatives enregistrées (source unique de vérité).
// Une étape est terminée quand TOUS ses éléments (indices + question) ont une tentative correcte.
const Progression = (() => {
  const items = step => {
    const list = (step.indices || []).map(i => ({ ...i, kind: "indice" }));
    if (step.vraieQuestion) list.push({ ...step.vraieQuestion, id: step.vraieQuestion.id || "question", kind: "question" });
    return list;
  };
  const key = (stepId, itemId) => stepId + "|" + itemId;
  const validatedSet = attempts => new Set(attempts.filter(a => a.is_correct).map(a => key(a.step_id, a.item_id)));
  const stepDone = (step, set) => items(step).every(it => set.has(key(step.id, it.id)));
  const currentIndex = (qs, set) => { const i = qs.findIndex(s => !stepDone(s, set)); return i === -1 ? qs.length : i; };
  const doneCount = (qs, set) => qs.filter(s => stepDone(s, set)).length;
  return { items, key, validatedSet, stepDone, currentIndex, doneCount };
})();
if (typeof module !== "undefined") module.exports = Progression;
