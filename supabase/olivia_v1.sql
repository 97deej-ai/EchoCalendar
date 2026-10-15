-- Run ONCE in your existing EchoCalendar project. Does not modify existing tables.
create table if not exists public.olivia_school_days (day date primary key, activity text not null check(activity in ('kindergarten','daycare','home','none')), note text not null default '', updated_at timestamptz not null default now());
create table if not exists public.olivia_school_lunch (day date primary key, entree text not null default '', sides text not null default '', updated_at timestamptz not null default now());
create table if not exists public.olivia_specials_override (day date primary key, specials text[] not null default '{}', updated_at timestamptz not null default now());
-- Existing application allows authenticated family members; follow same access model.
do $$ declare t text; begin foreach t in array array['olivia_school_days','olivia_school_lunch','olivia_specials_override'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('drop policy if exists olivia_family_access on public.%I',t);
 execute format('create policy olivia_family_access on public.%I for all to authenticated using (true) with check (true)',t);
 end loop; end $$;
