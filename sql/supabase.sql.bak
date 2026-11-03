-- ============================================================
-- Jeu de piste : à coller dans Supabase > SQL Editor > Run
-- 1) REMPLACE 'ton-email@exemple.fr' par l'e-mail du compte administrateur
-- ============================================================

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  pseudo text not null check (char_length(btrim(pseudo)) between 1 and 30),
  pseudo_key text generated always as (lower(btrim(pseudo))) stored unique,  -- unicité sans casse
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id bigint generated always as identity primary key,
  player_id uuid not null references public.players(id) on delete cascade,
  step_id text not null,
  item_id text not null,          -- id de l'indice, ou id de la vraie question
  answer text not null check (char_length(answer) <= 500),
  is_correct boolean not null,
  created_at timestamptz not null default now()
);
create index if not exists attempts_player_idx on public.attempts (player_id, created_at);

-- Sécurité : RLS activée, aucun accès direct pour les visiteurs (anon)
alter table public.players enable row level security;
alter table public.attempts enable row level security;
revoke all on public.players, public.attempts from anon;
grant select on public.players, public.attempts to authenticated;

create or replace function public.is_admin() returns boolean
language sql stable as $$ select coalesce(auth.jwt() ->> 'email', '') = 'ton-email@exemple.fr' $$;

drop policy if exists admin_read_players on public.players;
drop policy if exists admin_read_attempts on public.attempts;
create policy admin_read_players on public.players for select to authenticated using (public.is_admin());
create policy admin_read_attempts on public.attempts for select to authenticated using (public.is_admin());

-- Fonctions utilisées par le site participant (seul point d'entrée des visiteurs)
create or replace function public.jdp_login(p_pseudo text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_pseudo text := btrim(coalesce(p_pseudo, '')); v_player public.players; v_created boolean := false;
begin
  if char_length(v_pseudo) not between 1 and 30 then raise exception 'pseudo invalide'; end if;
  select * into v_player from public.players where pseudo_key = lower(v_pseudo);
  if not found then
    insert into public.players(pseudo) values (v_pseudo)
      on conflict (pseudo_key) do nothing returning * into v_player;
    v_created := found;
    if v_player.id is null then
      select * into v_player from public.players where pseudo_key = lower(v_pseudo);
    end if;
  end if;
  return jsonb_build_object(
    'player_id', v_player.id, 'pseudo', v_player.pseudo, 'created', v_created,
    'attempts', coalesce((select jsonb_agg(jsonb_build_object(
        'step_id', step_id, 'item_id', item_id, 'answer', answer,
        'is_correct', is_correct, 'created_at', created_at) order by created_at, id)
      from public.attempts where player_id = v_player.id), '[]'::jsonb));
end $$;

create or replace function public.jdp_submit(p_player uuid, p_step text, p_item text, p_answer text, p_ok boolean)
returns timestamptz language plpgsql security definer set search_path = public as $$
declare v_at timestamptz;
begin
  insert into public.attempts(player_id, step_id, item_id, answer, is_correct)
  values (p_player, left(p_step, 100), left(p_item, 100), left(p_answer, 500), p_ok)
  returning created_at into v_at;
  return v_at;
end $$;

revoke all on function public.jdp_login(text), public.jdp_submit(uuid, text, text, text, boolean) from public;
grant execute on function public.jdp_login(text), public.jdp_submit(uuid, text, text, text, boolean) to anon, authenticated;
