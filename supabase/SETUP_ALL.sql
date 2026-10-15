-- =============================================================================
-- DIWANG PANLIPUNAN: Complete Consolidated Database Setup
-- Instructions: Run this in your Supabase Dashboard -> SQL Editor -> New query -> Run
-- =============================================================================

-- =============================================================================
-- Migration: 00001_initial_schema.sql
-- Description: Core tables, foreign keys, constraints, indexes, and full-text search
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- Enable pgcrypto extension for gen_random_uuid() if not enabled
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. Profiles (linked to Supabase auth.users)
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('admin', 'user')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'User profile metadata extending Supabase auth.users with RBAC role.';

-- -----------------------------------------------------------------------------
-- 2. Topics (7 core societal themes)
-- -----------------------------------------------------------------------------
create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fil text not null,
  name_en text not null,
  description_fil text not null,
  description_en text,
  icon_name text not null,
  color_token text not null,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.topics is 'Core societal themes (Edukasyon, Kalusugan, Ekonomiya, atbp.).';

-- -----------------------------------------------------------------------------
-- 3. Subtopics (Articles / In-depth analyses)
-- -----------------------------------------------------------------------------
create table if not exists public.subtopics (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  slug text not null unique,
  title text not null,
  summary text not null,
  content_markdown text not null,
  read_time_minutes integer not null default 5,
  cover_image_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector
);

-- Idempotent column check in case table already exists
alter table public.subtopics add column if not exists cover_image_url text;

comment on table public.subtopics is 'Long-form editorial articles under each topic.';

-- -----------------------------------------------------------------------------
-- 4. Sources (Citations and external academic references)
-- -----------------------------------------------------------------------------
create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  subtopic_id uuid not null references public.subtopics(id) on delete cascade,
  title text not null,
  author text,
  publication text not null,
  url text not null,
  published_date date,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.sources is 'Verified bibliographic citations attached to subtopic articles.';

-- -----------------------------------------------------------------------------
-- 5. Feedback (Binary reader feedback with optional comments)
-- -----------------------------------------------------------------------------
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  subtopic_id uuid not null references public.subtopics(id) on delete cascade,
  is_helpful boolean not null,
  comment text,
  client_ip_hash text,
  created_at timestamptz not null default now()
);

comment on table public.feedback is 'Reader feedback ("Nakatulong ba ito? Oo / Hindi") on subtopics.';

-- -----------------------------------------------------------------------------
-- 6. Suggestions (Public topic suggestions for editorial consideration)
-- -----------------------------------------------------------------------------
create table if not exists public.suggestions (
  id uuid primary key default gen_random_uuid(),
  topic_title text not null,
  description text not null,
  rationale text,
  contact_email text,
  status text not null default 'pending' check (status in ('pending', 'in_review', 'implemented', 'dismissed')),
  client_ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.suggestions is 'Public submissions proposing new societal issues to cover.';

-- -----------------------------------------------------------------------------
-- Indexes for Performance
-- -----------------------------------------------------------------------------
create index if not exists idx_subtopics_topic_id on public.subtopics(topic_id);
create index if not exists idx_subtopics_is_published on public.subtopics(is_published);
create index if not exists idx_sources_subtopic_id on public.sources(subtopic_id);
create index if not exists idx_feedback_subtopic_id on public.feedback(subtopic_id);
create index if not exists idx_suggestions_status on public.suggestions(status);

-- -----------------------------------------------------------------------------
-- Full-Text Search Configuration (PostgreSQL tsvector with simple dictionary)
-- -----------------------------------------------------------------------------
create or replace function public.subtopics_search_vector_trigger()
returns trigger language plpgsql as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.summary, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(new.content_markdown, '')), 'C');
  return new;
end;
$$;

drop trigger if exists trg_subtopics_search_vector on public.subtopics;
create trigger trg_subtopics_search_vector
before insert or update on public.subtopics
for each row execute function public.subtopics_search_vector_trigger();

create index if not exists idx_subtopics_search_vector on public.subtopics using gin(search_vector);


-- =============================================================================

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
drop policy if exists "Users can view their own profile or admin can view all" on public.profiles;
create policy "Users can view their own profile or admin can view all"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "Admins can update any profile" on public.profiles;
create policy "Admins can update any profile"
  on public.profiles for update
  using (public.is_admin());

drop policy if exists "Users can update their own non-role profile fields" on public.profiles;
create policy "Users can update their own non-role profile fields"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select p.role from public.profiles p where p.id = auth.uid()));

-- -----------------------------------------------------------------------------
-- 5. RLS Policies: Topics
-- -----------------------------------------------------------------------------
drop policy if exists "Anyone can view published topics or admin can view all" on public.topics;
create policy "Anyone can view published topics or admin can view all"
  on public.topics for select
  using (is_published = true or public.is_admin());

drop policy if exists "Only admins can insert topics" on public.topics;
create policy "Only admins can insert topics"
  on public.topics for insert
  with check (public.is_admin());

drop policy if exists "Only admins can update topics" on public.topics;
create policy "Only admins can update topics"
  on public.topics for update
  using (public.is_admin());

drop policy if exists "Only admins can delete topics" on public.topics;
create policy "Only admins can delete topics"
  on public.topics for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 6. RLS Policies: Subtopics
-- -----------------------------------------------------------------------------
drop policy if exists "Anyone can view published subtopics of published topics or admin" on public.subtopics;
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

drop policy if exists "Only admins can insert subtopics" on public.subtopics;
create policy "Only admins can insert subtopics"
  on public.subtopics for insert
  with check (public.is_admin());

drop policy if exists "Only admins can update subtopics" on public.subtopics;
create policy "Only admins can update subtopics"
  on public.subtopics for update
  using (public.is_admin());

drop policy if exists "Only admins can delete subtopics" on public.subtopics;
create policy "Only admins can delete subtopics"
  on public.subtopics for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 7. RLS Policies: Sources
-- -----------------------------------------------------------------------------
drop policy if exists "Anyone can view citations for published subtopics or admin" on public.sources;
create policy "Anyone can view citations for published subtopics or admin"
  on public.sources for select
  using (
    exists (
      select 1 from public.subtopics s
      where s.id = subtopic_id and s.is_published = true
    ) or public.is_admin()
  );

drop policy if exists "Only admins can insert sources" on public.sources;
create policy "Only admins can insert sources"
  on public.sources for insert
  with check (public.is_admin());

drop policy if exists "Only admins can update sources" on public.sources;
create policy "Only admins can update sources"
  on public.sources for update
  using (public.is_admin());

drop policy if exists "Only admins can delete sources" on public.sources;
create policy "Only admins can delete sources"
  on public.sources for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8. RLS Policies: Feedback
-- -----------------------------------------------------------------------------
drop policy if exists "Anyone can submit content feedback" on public.feedback;
create policy "Anyone can submit content feedback"
  on public.feedback for insert
  with check (true);

drop policy if exists "Only admins can view feedback" on public.feedback;
create policy "Only admins can view feedback"
  on public.feedback for select
  using (public.is_admin());

drop policy if exists "Only admins can delete feedback" on public.feedback;
create policy "Only admins can delete feedback"
  on public.feedback for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 9. RLS Policies: Suggestions
-- -----------------------------------------------------------------------------
drop policy if exists "Anyone can submit topic suggestions" on public.suggestions;
create policy "Anyone can submit topic suggestions"
  on public.suggestions for insert
  with check (true);

drop policy if exists "Only admins can view suggestions" on public.suggestions;
create policy "Only admins can view suggestions"
  on public.suggestions for select
  using (public.is_admin());

drop policy if exists "Only admins can update suggestion status" on public.suggestions;
create policy "Only admins can update suggestion status"
  on public.suggestions for update
  using (public.is_admin());

drop policy if exists "Only admins can delete suggestions" on public.suggestions;
create policy "Only admins can delete suggestions"
  on public.suggestions for delete
  using (public.is_admin());


-- =============================================================================

-- =============================================================================
-- Migration: 00003_seed_data.sql
-- Description: Canonical 7 Philippine societal themes, realistic sample subtopics, and citations
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Insert 7 Canonical Thematic Topics
-- -----------------------------------------------------------------------------
insert into public.topics (id, slug, name_fil, name_en, description_fil, description_en, icon_name, color_token, order_index, is_published)
values
  (
    '00000000-0000-0000-0000-000000000001',
    'edukasyon',
    'Edukasyon',
    'Education',
    'Kalinangan sa kalidad ng edukasyon, krisis sa literasiya, at pagbabagong-anyo ng kurikulum sa Pilipinas.',
    'Quality of education, literacy challenges, and curriculum transformation in the Philippines.',
    'GraduationCap',
    '--topic-edukasyon',
    1,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'kalusugan',
    'Kalusugan',
    'Healthcare',
    'Pangkalahatang kalusugan, sistemang medikal, at mga hamon sa pampublikong kalusugan at kapakanan.',
    'Public healthcare systems, universal health coverage, and community wellness in the country.',
    'HeartPulse',
    '--topic-kalusugan',
    2,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'ekonomiya',
    'Ekonomiya',
    'Economy',
    'Kabuhayan, implasyon, agrikultura, trabaho, at mga polisiya para sa pantay na kaunlarang pang-ekonomiya.',
    'Livelihood, inflation, agricultural stability, labor markets, and inclusive economic growth.',
    'TrendingUp',
    '--topic-ekonomiya',
    3,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'karapatang-pantao',
    'Karapatang Pantao',
    'Human Rights',
    'Katarungang panlipunan, kalayaang sibil, at pangangalaga sa mga marhinalisadong sektor ng lipunan.',
    'Social justice, civil liberties, rule of law, and protection of marginalized sectors.',
    'Scale',
    '--topic-karapatan',
    4,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'kapaligiran',
    'Kapaligiran',
    'Environment',
    'Krisis sa klima, likas na yaman, pagbawas ng pinsala sa sakuna, at likas-kayang pag-unlad.',
    'Climate vulnerability, biodiversity conservation, disaster resilience, and sustainable development.',
    'Leaf',
    '--topic-kapaligiran',
    5,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'teknolohiya',
    'Teknolohiya',
    'Technology',
    'Karapatang digital, disimpormasyon, pamamahala sa artificial intelligence, at modernong inobasyon.',
    'Digital rights, algorithmic governance, combating disinformation, and technological access.',
    'Cpu',
    '--topic-teknolohiya',
    6,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'pamahalaan',
    'Pamahalaan',
    'Governance',
    'Pananagutan ng mga pinuno, reporma sa institusyon, desentralisasyon, at pakikilahok ng mamamayan.',
    'Public accountability, institutional reforms, local governance, and participatory democracy.',
    'Landmark',
    '--topic-pamahalaan',
    7,
    true
  )
on conflict (slug) do update set
  name_fil = excluded.name_fil,
  name_en = excluded.name_en,
  description_fil = excluded.description_fil,
  description_en = excluded.description_en,
  icon_name = excluded.icon_name,
  color_token = excluded.color_token,
  order_index = excluded.order_index,
  is_published = excluded.is_published,
  updated_at = now();

-- -----------------------------------------------------------------------------
-- 2. Insert Sample Published Subtopic: Krisis sa Edukasyon
-- -----------------------------------------------------------------------------
insert into public.subtopics (
  id,
  topic_id,
  slug,
  title,
  summary,
  content_markdown,
  read_time_minutes,
  is_published,
  published_at
)
values (
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'krisis-sa-literasiya-at-pisa-results',
  'Ang Krisis sa Literasiya at ang Resulta ng PISA sa Pilipinas',
  'Isang malalimang pagsusuri sa estado ng pangunahing edukasyon, mga sanhi ng mababang marka sa pandaigdigang pagsusulit, at mga kinakailangang reporma.',
  '## Kalagayan ng Pangunahing Edukasyon sa Bansa

Ipinakita sa pinakahuling resulta ng Programme for International Student Assessment (PISA) na patuloy na nahihirapan ang mga mag-aaral na Pilipino sa larangan ng pagbasa, matematika, at agham. Ang hamong ito ay hindi lamang suliranin ng mga guro at paaralan kundi salamin ng mas malawak na sosyo-ekonomikong kalagayan ng bansa.

### Mga Pangunahing Salik

1. **Kakapusan sa Pasilidad at Materyales:** Maraming pampublikong paaralan ang patuloy na nakakaranas ng kakulangan sa mga silid-aralan, aklat, at digital resources.
2. **Nutrisyon at Kalusugan ng Mag-aaral:** Ang malnutrisyon sa mga bata sa murang edad ay may direktang epekto sa kanilang kakayahang matuto at mag-isip nang kritikal.
3. **Pagsasanay sa mga Guro:** Bagama''t masisipag ang mga guro, kailangan ng higit na suporta sa makabagong pedagogical methods at pagbawas sa administrative workload.

> "Ang tunay na reporma sa edukasyon ay nagsisimula sa pagtiyak na bawat bata ay may malusog na pangangatawan, ligtas na silid-aralan, at mapagkalingang komunidad na sumusuporta sa pag-aaral."

### Mga Hakbang Pasulong

Kinakailangan ang mas mataas na alokasyon sa pambansang badyet para sa edukasyon alinsunod sa pandaigdigang pamantayan, pagsusuri sa mother tongue-based education, at pagpapalakas sa feeding programs ng pamahalaan.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  published_at = excluded.published_at,
  updated_at = now();

-- -----------------------------------------------------------------------------
-- 3. Insert Verified Citations for the Subtopic
-- -----------------------------------------------------------------------------
insert into public.sources (
  id,
  subtopic_id,
  title,
  author,
  publication,
  url,
  published_date,
  order_index
)
values
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'PISA 2022 Results: Factsheets Philippines',
    'OECD',
    'Organisation for Economic Co-operation and Development',
    'https://www.oecd.org/publication/pisa-2022-results/',
    '2023-12-05',
    1
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Basic Education Report 2024',
    'Department of Education',
    'DepEd Official Gazette',
    'https://www.deped.gov.ph',
    '2024-01-25',
    2
  )
on conflict (id) do nothing;


-- =============================================================================

-- =============================================================================
-- Migration: 00004_admin_promotion.sql
-- Description: Idempotent helper script and stored function to promote an administrator
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- Stored function to promote a user to admin by email
create or replace function public.promote_user_to_admin(target_email text)
returns text language plpgsql security definer set search_path = public as $$
declare
  user_found boolean;
begin
  select exists (
    select 1 from public.profiles where email = target_email
  ) into user_found;

  if not user_found then
    return 'User with email ' || target_email || ' not found in public.profiles. Ensure the user has registered first.';
  end if;

  update public.profiles
  set role = 'admin', updated_at = now()
  where email = target_email;

  return 'Success: ' || target_email || ' promoted to admin role.';
end;
$$;

comment on function public.promote_user_to_admin is 'Idempotent security definer function to promote a registered user to admin.';

-- Example usage in Supabase SQL editor:
-- select public.promote_user_to_admin('admin@diwangpanlipunan.ph');


-- =============================================================================


-- -----------------------------------------------------------------------------
-- Ensure Admin User has 'admin' Role in profiles
-- -----------------------------------------------------------------------------
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, 'Punong Patnugot', 'admin'
FROM auth.users
WHERE email = 'admin@diwangpanlipunan.ph'
ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();
