-- =============================================================================
-- Migration: 00006_allow_editor_and_admin_subtopics_and_sources.sql
-- Description: Grant editorial staff (both 'admin' and 'editor') permission to manage subtopics and sources
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- 1. Helper function for editorial staff (admin and editor)
create or replace function public.is_staff()
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

comment on function public.is_staff is 'Returns true if authenticated user holds admin or editor role in public.profiles.';

-- 2. Subtopics RLS policies
drop policy if exists "Only admins can insert subtopics" on public.subtopics;
drop policy if exists "Admins and editors can insert subtopics" on public.subtopics;
create policy "Admins and editors can insert subtopics"
  on public.subtopics for insert
  with check (public.is_staff());

drop policy if exists "Only admins can update subtopics" on public.subtopics;
drop policy if exists "Admins and editors can update subtopics" on public.subtopics;
create policy "Admins and editors can update subtopics"
  on public.subtopics for update
  using (public.is_staff());

drop policy if exists "Only admins can delete subtopics" on public.subtopics;
drop policy if exists "Admins and editors can delete subtopics" on public.subtopics;
create policy "Admins and editors can delete subtopics"
  on public.subtopics for delete
  using (public.is_staff());

-- 3. Sources RLS policies
drop policy if exists "Only admins can insert sources" on public.sources;
drop policy if exists "Admins and editors can insert sources" on public.sources;
create policy "Admins and editors can insert sources"
  on public.sources for insert
  with check (public.is_staff());

drop policy if exists "Only admins can update sources" on public.sources;
drop policy if exists "Admins and editors can update sources" on public.sources;
create policy "Admins and editors can update sources"
  on public.sources for update
  using (public.is_staff());

drop policy if exists "Only admins can delete sources" on public.sources;
drop policy if exists "Admins and editors can delete sources" on public.sources;
create policy "Admins and editors can delete sources"
  on public.sources for delete
  using (public.is_staff());
