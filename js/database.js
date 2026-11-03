// Communication avec Supabase (fonctions RPC côté participant). Aucune table accessible directement.
const DB = (() => {
  const sb = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  const rpc = async (fn, args) => { const { data, error } = await sb.rpc(fn, args); if (error) throw error; return data; };
  return {
    sb,
    login: pseudo => rpc("jdp_login", { p_pseudo: pseudo }),
    submit: (playerId, stepId, itemId, answer, ok) =>
      rpc("jdp_submit", { p_player: playerId, p_step: stepId, p_item: itemId, p_answer: answer, p_ok: ok })
  };
})();
