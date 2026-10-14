-- =============================================================================
-- Migration: 00002_rls_and_auth.sql
-- Description: Authentication profile trigger, is_admin() function, and Row Level Security
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Automated Profile Creation Trigger
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 2. Security Definer Helper: is_admin()
-- -----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

comment on function public.is_admin is 'Returns true if authenticated user holds the admin role in public.profiles.';

-- -----------------------------------------------------------------------------
-- 3. Enable Row Level Security (RLS) on all tables
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.topics enable row level security;
alter table public.subtopics enable row level security;
alter table public.sources enable row level security;
alter table public.feedback enable row level security;
alter table public.suggestions enable row level security;

-- -----------------------------------------------------------------------------
-- 4. RLS Policies: Profiles
-- -----------------------------------------------------------------------------
create policy "Users can view their own profile or admin can view all"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Admins can update any profile"
  on public.profiles for update
  using (public.is_admin());

create policy "Users can update their own non-role profile fields"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select p.role from public.profiles p where p.id = auth.uid()));

-- -----------------------------------------------------------------------------
-- 5. RLS Policies: Topics
-- -----------------------------------------------------------------------------
create policy "Anyone can view published topics or admin can view all"
  on public.topics for select
  using (is_published = true or public.is_admin());

create policy "Only admins can insert topics"
  on public.topics for insert
  with check (public.is_admin());

create policy "Only admins can update topics"
  on public.topics for update
  using (public.is_admin());

create policy "Only admins can delete topics"
  on public.topics for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 6. RLS Policies: Subtopics
-- -----------------------------------------------------------------------------
create policy "Anyone can view published subtopics of published topics or admin"
  on public.subtopics for select
  using (
    (
      is_published = true and
      exists (
        select 1 from public.topics t
        where t.id = topic_id and t.is_published = true
      )
    ) or public.is_admin()
  );

create policy "Only admins can insert subtopics"
  on public.subtopics for insert
  with check (public.is_admin());

create policy "Only admins can update subtopics"
  on public.subtopics for update
  using (public.is_admin());

create policy "Only admins can delete subtopics"
  on public.subtopics for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 7. RLS Policies: Sources
-- -----------------------------------------------------------------------------
create policy "Anyone can view citations for published subtopics or admin"
  on public.sources for select
  using (
    exists (
      select 1 from public.subtopics s
      where s.id = subtopic_id and s.is_published = true
    ) or public.is_admin()
  );

create policy "Only admins can insert sources"
  on public.sources for insert
  with check (public.is_admin());

create policy "Only admins can update sources"
  on public.sources for update
  using (public.is_admin());

create policy "Only admins can delete sources"
  on public.sources for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8. RLS Policies: Feedback
-- -----------------------------------------------------------------------------
create policy "Anyone can submit content feedback"
  on public.feedback for insert
  with check (true);

create policy "Only admins can view feedback"
  on public.feedback for select
  using (public.is_admin());

create policy "Only admins can delete feedback"
  on public.feedback for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 9. RLS Policies: Suggestions
-- -----------------------------------------------------------------------------
create policy "Anyone can submit topic suggestions"
  on public.suggestions for insert
  with check (true);

create policy "Only admins can view suggestions"
  on public.suggestions for select
  using (public.is_admin());

create policy "Only admins can update suggestion status"
  on public.suggestions for update
  using (public.is_admin());

create policy "Only admins can delete suggestions"
  on public.suggestions for delete
  using (public.is_admin());
