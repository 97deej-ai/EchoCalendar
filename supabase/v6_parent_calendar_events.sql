-- Echo Calendar V6 parent-only event isolation. Run in Supabase SQL editor.
-- IMPORTANT: first add approved adult auth user IDs to parent_calendar_adults.
-- Existing Olivia tables are not changed by this migration.
create table if not exists public.parent_calendar_adults (
 user_id uuid primary key references auth.users(id) on delete cascade,
 added_at timestamptz not null default now()
);
alter table public.parent_calendar_adults enable row level security;
revoke all on public.parent_calendar_adults from anon, authenticated;
-- Adults cannot grant themselves access. Provision IDs only via SQL editor/service role.

create table if not exists public.parent_calendar_events (
 id uuid primary key default gen_random_uuid(),
 title text not null check (length(trim(title)) between 1 and 200),
 event_date date not null,
 event_time time,
 member_id uuid references public.family_members(id) on delete set null,
 notes text not null default '',
 repeat text not null default 'none' check (repeat in ('none','daily','weekly','monthly','yearly')),
 source_kind text not null default 'parent' check (source_kind = 'parent'),
 excluded_dates date[] not null default '{}'::date[],
 created_at timestamptz not null default now()
);
-- Safe for existing V6 development tables: idempotently add recurring exclusions.
alter table public.parent_calendar_events add column if not exists excluded_dates date[] not null default '{}'::date[];
create index if not exists parent_calendar_events_date_idx on public.parent_calendar_events(event_date);
alter table public.parent_calendar_events enable row level security;
-- Remove the overly permissive Checkpoint 6 policy if present.
drop policy if exists parent_calendar_authenticated on public.parent_calendar_events;
drop policy if exists parent_calendar_adult_select on public.parent_calendar_events;
drop policy if exists parent_calendar_adult_insert on public.parent_calendar_events;
drop policy if exists parent_calendar_adult_update on public.parent_calendar_events;
drop policy if exists parent_calendar_adult_delete on public.parent_calendar_events;
-- The lookup is protected by a security-definer function, not a user-editable flag.
create or replace function public.echo_is_parent_adult()
returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.parent_calendar_adults where user_id = (select auth.uid()));
$$;
revoke all on function public.echo_is_parent_adult() from public;
grant execute on function public.echo_is_parent_adult() to authenticated;
create policy parent_calendar_adult_select on public.parent_calendar_events
 for select to authenticated using ((select public.echo_is_parent_adult()));
create policy parent_calendar_adult_insert on public.parent_calendar_events
 for insert to authenticated with check ((select public.echo_is_parent_adult()));
create policy parent_calendar_adult_update on public.parent_calendar_events
 for update to authenticated using ((select public.echo_is_parent_adult())) with check ((select public.echo_is_parent_adult()));
create policy parent_calendar_adult_delete on public.parent_calendar_events
 for delete to authenticated using ((select public.echo_is_parent_adult()));
-- IMPORTANT: run a separate command for each authorized adult (replace placeholder):
-- insert into public.parent_calendar_adults(user_id) values ('YOUR-AUTH-USER-UUID') on conflict do nothing;
-- Do not add any triggers copying these events into public.calendar_events.
