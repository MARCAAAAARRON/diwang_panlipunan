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
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer', 'user')),
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

create or replace function public.is_staff()
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

comment on function public.is_staff is 'Returns true if authenticated user holds admin or editor role in public.profiles.';

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
    ) or public.is_staff()
  );

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
-- Description: Clean, complete 7 societal themes, 21 structured aralin, and verified citations
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Insert 7 Canonical Thematic Topics (Pangkalahatan / Paksa)
-- -----------------------------------------------------------------------------
insert into public.topics (id, slug, name_fil, name_en, description_fil, description_en, icon_name, color_token, order_index, is_published)
values
  (
    '00000000-0000-0000-0000-000000000001',
    'kapaligiran',
    'Kapaligiran at Krisis sa Klima',
    'Environment and Climate Crisis',
    'Susing pagsusuri sa krisis pangklima, konserbasyon ng kalikasan, at pantay na pangangalaga sa likas-yaman ng kapuluan.',
    'Critical examination of the climate crisis, biodiversity conservation, and equitable ecological stewardship.',
    'Leaf',
    '--topic-kapaligiran',
    1,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'ekonomiya',
    'Ekonomiya at Kabuhayan',
    'Economy and Livelihood',
    'Pagsipat sa implasyon, karapatan ng manggagawa, agrikultura, at makatarungang pag-unlad ng kabuhayan ng bawat pamilya.',
    'Analyzing inflation, labor rights, agrarian reform, and structural economic equity across sectors.',
    'TrendingUp',
    '--topic-ekonomiya',
    2,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'pamahalaan',
    'Pamahalaan at Demokrasya',
    'Politics and Governance',
    'Mapanuring pagtingin sa mga pampublikong institusyon, pananagutan, desentralisasyon, at pamamahalang demokratiko.',
    'Scrutinizing public institutions, civic participation, anti-corruption safeguards, and local governance.',
    'Landmark',
    '--topic-pamahalaan',
    3,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'karapatang-pantao',
    'Karapatang Pantao at Katarungan',
    'Human Rights and Social Justice',
    'Pagtataguyod sa karapatang pantao, katarungang panlipunan, kalayaang sibil, at dignidad ng bawat sektor.',
    'Defending fundamental freedoms, restorative justice, indigenous rights, and human dignity.',
    'Scale',
    '--topic-karapatan',
    4,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'edukasyon',
    'Edukasyon at Pagkatuto',
    'Education and Learning',
    'Pagsusuri sa kalidad, kakayahan, at pantay na oportunidad sa edukasyon ng kabataang Pilipino sa harap ng mga pandaigdigang pagsubok.',
    'Evaluating literacy, curriculum transformation, public school resources, and equitable learning access.',
    'GraduationCap',
    '--topic-edukasyon',
    5,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'teknolohiya',
    'Teknolohiya at Lipunan',
    'Technology and Society',
    'Epekto ng artificial intelligence, digital divide, social media, cybersecurity, at digital literacy sa mamamayan.',
    'Investigating the digital divide, algorithmic transparency, disinformation campaigns, and artificial intelligence in labor.',
    'Cpu',
    '--topic-teknolohiya',
    6,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'kalusugan',
    'Kalusugan at Likas-kayang Pag-unlad',
    'Health and Sustainable Development',
    'Pagtutugma ng pangkalahatang kalusugan ng pamayanan, nutrisyon, at pambansang healthcare system tungo sa makataong lipunan.',
    'Balancing universal healthcare, public health resilience, nutrition, and environmental sustainability.',
    'HeartPulse',
    '--topic-kalusugan',
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
-- 2. Insert 21 Canonical Aralin (Subtopics)
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
  '10000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000001',
  'mga-suliraning-pangkapaligiran',
  'Mga Suliraning Pangkapaligiran sa Bansa',
  'Pangkalahatang pagsipat sa polusyon sa hangin at tubig, deforestation, at pagkasira ng mga marine habitats sa kapuluan.',
  '## Ang Hamon ng Kalikasan sa Arkipelago

Bilang isang kapuluan na mayaman sa likas na yaman at biodiversity, ang Pilipinas ay humaharap sa matitinding hamong pangkapaligiran. Ang mabilis na urbanisasyon, hindi wastong pagtatapon ng basura, at deforestation ay patuloy na nagdudulot ng pinsala sa ating mga kabundukan at karagatan.

### Mga Pangunahing Suliranin

1. **Deforestation at Pagkasira ng Kagubatan:** Patuloy ang pagliit ng forest cover sa bansa dulot ng illegal logging, quarrying, at commercial conversion.
2. **Krisis sa Solid Waste Management:** Sa kabila ng RA 9003 (Ecological Solid Waste Management Act), milyun-milyong tonelada ng single-use plastics ang patuloy na napupunta sa mga ilog at Manila Bay.
3. **Pagkasira ng Marine Ecosystems:** Ang dinamita, labis na pangingisda, at pagtatapon ng kemikal ay sumisira sa mga coral reef na nagsisilbing kanlungan ng mga isda.

> "Ang pangangalaga sa kalikasan ay hindi lamang usaping siyentipiko; ito ay usapin ng panlipunang katarungan para sa mga susunod na henerasyon ng mga Pilipino."

### Mga Hakbang Tungo sa Solusyon

Kinakailangan ang mahigpit na pagpapatupad ng batas pangkalikasan sa antas ng barangay, pagsuporta sa mga indigenous forest wardens, at pananagutan ng malalaking korporasyon sa kanilang plastic footprints.',
  5,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000001',
  'climate-change-sa-pilipinas',
  'Climate Change sa Pilipinas: Vulnerabilities, Impacts, and Ecological Justice',
  'Susing pagsusuri sa krisis pangklima, pagtaas ng antas ng dagat, at ang kagyat na pangangailangan para sa hustisyang pangklima.',
  '## Ang Pilipinas sa Mata ng Bagyo

Ang kapuluan ng Pilipinas ay kabilang sa mga pinakabulnerableng bansa sa daigdig pagdating sa epekto ng climate change. Bagama''t mababa sa 0.5% ang ambag ng bansa sa pandaigdigang greenhouse gas emissions, tayo ang isa sa mga labis na nagdurusa sa lumalakas na mga super typhoon, matagalang tagtuyot dulot ng El Niño, at pagtaas ng antas ng dagat.

### Mga Pangunahing Datos at Katotohanan

> **TALA NG DATOS: ANTAS NG DAGAT**  
> **3x** Pandaigdigang Karaniwang Bilis ng Pagtaas ng Dagat  
> Ayon sa PAGASA at Climate Change Commission, ang pagtaas ng karagatan sa ilang bahagi ng Pilipinas ay triple kaysa sa pandaigdigang average dahil sa subsidence at ocean thermal expansion.

### Epekto sa Agrikultura at Pangingisda

* **Mababang Ani:** Ang hindi mahulaang pattern ng tag-ulan ay nagdudulot ng malawakang pagkalugi sa mga magsasaka ng palay at mais sa Luzon at Mindanao.
* **Fish Kills at Coral Bleaching:** Ang pag-init ng temperatura ng tubig ay nagdudulot ng mass bleaching sa mga bahura, na direktang nagpapaliit sa huli ng mga municipal fisherfolk.

> "Climate justice requires high-emitting industrialized economies to honor their loss and damage commitments to frontline archipelagic communities."',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000001',
  'mga-hakbang-tungo-sa-sustainability',
  'Mga Hakbang Tungo sa Sustainability at Likas-kayang Kaunlaran',
  'Pagsusuri sa Renewable Energy Act, community-led reforestation, at mga polisiya para sa climate adaptation sa Pilipinas.',
  '## Pagpapatupad ng Likas-kayang Kaunlaran

Hindi sapat ang reaktibong pagtugon kapag may dumarating na kalamidad. Ang tunay na katatagan o resilience ay nakaugat sa pangmatagalang polisiya at community-based disaster risk reduction and management (CBDRRM).

### Mga Estratehikong Haligi

1. **Renewable Energy Transition:** Pagpapabilis sa paglipat mula sa coal-fired plants patungo sa solar, wind, at geothermal energy alinsunod sa Renewable Energy Act ng 2008.
2. **Proteksyon sa Mangrove Buffers:** Ang pagtatanim ng bakawan sa mga baybayin ay nagpapatunay na pinakamabisang natural na pananggalang laban sa storm surges.
3. **Lokal na Pagsasanay:** Pagbibigay ng sapat na pondo at kagamitan sa mga Local Disaster Risk Reduction Management Offices (LDRRMOs) sa halip na umasa lamang sa pambansang pondo.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000020',
  '00000000-0000-0000-0000-000000000002',
  'implasyon-at-presyo',
  'Implasyon at Presyo ng mga Pangunahing Bilihin',
  'Pagsusuri sa mga sanhi ng pagtaas ng presyo ng pagkain at enerhiya, at epekto nito sa kapangyarihang bumili ng mga karaniwang pamilya.',
  '## Ang Hamon ng Implasyon sa Araw-araw na Pamumuhay

Ang implasyon ay tumutukoy sa pangkalahatang pagtaas ng presyo ng mga bilihin at serbisyo sa paglipas ng panahon. Para sa karaniwang pamilyang Pilipino, ang implasyon sa pagkain (tulad ng bigas, sibuyas, at karne) at langis ang may pinakamabigat na epekto sa badyet ng tahanan.

### Mga Salik sa Pagtaas ng Presyo

1. **Supply-Side Bottlenecks:** Kakulangan sa lokal na produksyon at mga kalamidad na sumisira sa pananim.
2. **Pandaigdigang Presyo ng Krudo:** Ang pagiging import-dependent ng Pilipinas sa langis ay nagdudulot ng mataas na gastos sa transportasyon at kuryente.
3. **Papel ng mga Middlemen:** Malaking agwat sa pagitan ng farmgate price na binabayad sa magsasaka at retail price sa palengke.

> "Kapag tumaas ang presyo ng bigas nang 10%, ang pinakamahihirap na sektor ang unang napipilitang magbawas ng pagkain sa kanilang hapag-kainan."',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000021',
  '00000000-0000-0000-0000-000000000002',
  'kalagayan-ng-manggagawa',
  'Kalagayan ng mga Manggagawa, Pasahod, at Karapatan sa Paggawa',
  'Pagsipat sa kontraktuwalisasyon, agwat ng minimum wage at living wage, at proteksyon sa impormal na sektor.',
  '## Dignidad sa Paggawa at Karampatang Sahod

Ang mga manggagawang Pilipino ang gulugod ng ekonomiya. Subalit patuloy silang humaharap sa mga hamon tulad ng kawalan ng katiyakan sa trabaho (endo/kontraktuwalisasyon) at pasahod na hindi sumasapat sa family living wage.

### Kasalukuyang Realidad

* **Regional Wage Disparities:** Malaki ang agwat ng minimum wage sa Kalakhang Maynila kumpara sa mga rehiyon, sa kabila ng magkatulad na presyo ng mga pangunahing bilihin.
* **Impormal na Sektor:** Mahigit 40% ng lakas-paggawa ay nasa informal economy (mga vendor, delivery rider, domestic worker) na walang sapat na social protection tulad ng SSS, PhilHealth, at Pag-IBIG.

> "Ang disenteng trabaho ay hindi pribilehiyo kundi batayang karapatang pantao na ginagarantiyahan ng Saligang Batas."',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000022',
  '00000000-0000-0000-0000-000000000002',
  'agrikultura-at-repormang-agraryo',
  'Agrikultura, Seguridad sa Pagkain, at Repormang Agraryo',
  'Pagsusuri sa kalagayan ng mga magsasaka, land conversion, modernisasyon, at subsidiya sa sektor ng agrikultura.',
  '## Ang Banta sa Agrikultura at Seguridad sa Pagkain

Sa kabila ng pagiging bansang agrikultural, ang sektor ng pagsasaka sa Pilipinas ay nananatiling isa sa may pinakamataas na antas ng kahirapan. Ang pagtanda ng populasyon ng mga magsasaka (average age: 53 taong gulang) at kakulangan sa makabagong kagamitan ay nagbabanta sa seguridad ng pagkain ng bansa.

### Mga Kritikal na Isyu

1. **Repormang Agraryo:** Maraming magsasaka ang nabigyan ng Certificate of Land Ownership Award (CLOA) ngunit salat sa suportang serbisyo tulad ng irigasyon, pautang, at post-harvest facilities.
2. **Import Dependency:** Ang labis na pag-asa sa imported na bigas at asuk ay nagpapabagsak sa kita ng lokal na produksyon.
3. **Land Conversion:** Pagpapalit-gamit ng matatabang lupang pansakahan patungo sa commercial subdivisions at industrial parks.',
  7,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000030',
  '00000000-0000-0000-0000-000000000003',
  'demokrasya-at-partisipasyon',
  'Demokrasya, Saligang Batas, at Partisipasyong Pampolitika',
  'Pagsusuri sa papel ng civil society, halalan, at mamamayan sa paghubog ng pampublikong polisiya at pananaig ng batas.',
  '## Ang Kapangyarihan ng Mamamayan sa Demokrasya

Ang demokrasya ay hindi nagsisimula at nagtatapos sa araw ng halalan. Ayon sa 1987 Saligang Batas, ang soberanya ay nananahan sa mamamayan at lahat ng awtoridad ng pamahalaan ay nagmumula sa kanila.

### Mga Paraan ng Pakikilahok

1. **Malayang Halalan:** Pagpili ng mga kinatawan batay sa plataporma at pananagutan, hindi sa vote-buying o patronage politics.
2. **Civil Society Organizations (CSOs):** Ang aktibong pakikilahok ng mga unyon, organisasyong pangkomunidad, at youth groups sa local development councils.
3. **People''s Initiative at Referendum:** Konstitusyonal na mekanismo kung saan ang mamamayan ay maaaring direktang magpanukala ng batas.

> "Ang isang buhay na demokrasya ay nangangailangan ng mulat, kritikal, at aktibong mamamayan na handang magtanong at magbantay."',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000031',
  '00000000-0000-0000-0000-000000000003',
  'korapsiyon-at-pananagutan',
  'Korapsiyon, Transparensiya, at Pananagutan sa Pamahalaan',
  'Pagsisiyasat sa mga mekanismo ng auditing, open budget data, at paglaban sa sistemikong katiwalian.',
  '## Pagsugpo sa Katiwalian sa Pampublikong Institusyon

Ang korapsiyon ay hindi lamang pagnanakaw ng pondo ng bayan; ito ay tahasang pagnanakaw sa kinabukasan ng mga kabataan, mga pasyente sa ospital, at mga magsasakang walang kalsada.

### Mga Haligi ng Pananagutan

* **Commission on Audit (COA):** Ang malayang komisyon na nagbabantay sa tamang paggasta ng pera ng taumbayan.
* **Freedom of Information (FOI):** Ang pangangailangan para sa buong pagsasabatas ng FOI bill upang maging bukas ang lahat ng kontrata at transaksyon ng gobyerno.
* **Whistleblower Protection:** Pagbibigay ng sapat na legal at pisikal na proteksyon sa mga kawaning naglalantad ng iregularidad.',
  7,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000032',
  '00000000-0000-0000-0000-000000000003',
  'desentralisasyon-at-lokal',
  'Desentralisasyon, Pamamahalang Lokal, at ang Mandanas Ruling',
  'Ang epekto ng Mandanas-Garcia Supreme Court ruling sa National Tax Allotment (NTA) at pagpapalakas sa kapangyarihan ng mga LGU.',
  '## Kapangyarihan sa mga Lalawigan at Komunidad

Sa pamamagitan ng Local Government Code ng 1991 at ng makasaysayang Mandanas-Garcia ruling ng Korte Suprema, pinalaki ang bahagi ng mga Lokal na Pamahalaan (LGUs) sa pambansang buwis (National Tax Allotment o NTA).

### Mga Hamon sa Full Devolution

1. **Kapasidad ng Mas Mahihirap na LGU:** Ang mga 4th hanggang 6th class municipalities ay nangangailangan ng tulong teknikal sa pagpapatupad ng mga devolved projects.
2. **Pampulitikang Dinastiya:** Banta na ang mas malaking pondo ay mapasakamay lamang ng iilang pamilyang matagal nang nakaluklok sa kapangyarihan.
3. **Pagpapalakas sa Barangay:** Tiyakin na ang pondo ay direktang nararamdaman ng bawat mamamayan sa antas ng komunidad.',
  5,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000040',
  '00000000-0000-0000-0000-000000000004',
  'batayang-karapatan',
  'Mga Batayang Karapatang Pantao at ang Katipunan ng mga Karapatan',
  'Pagsusuri sa Bill of Rights (Artikulo III ng 1987 Konstitusyon) at proteksyon sa buhay, kalayaan, at angkop na proseso ng batas.',
  '## Ang Katipunan ng mga Karapatan (Bill of Rights)

Ang Artikulo III ng 1987 Saligang Batas ang pananggalang ng karaniwang mamamayan laban sa labis na kapangyarihan ng estado. Itinatakda nito na walang sinumang aalisan ng buhay, kalayaan, o ari-arian nang walang angkop na proseso ng batas (due process of law).

### Mga Pangunahing Proteksyon

1. **Due Process at Equal Protection:** Ang batas ay dapat ipatupad nang pantay sa mayaman at mahirap.
2. **Proteksyon Laban sa Di-makatwirang Paghahalughog:** Karapatang maging ligtas sa sariling tahanan nang walang legal na search warrant mula sa hukuman.
3. **Presumption of Innocence:** Lahat ng akusado ay itinuturing na inosente hangga''t hindi napatutunayang nagkasala sa harap ng hukuman.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000041',
  '00000000-0000-0000-0000-000000000004',
  'katarungan-at-katutubo',
  'Katarungang Panlipunan at Karapatan ng mga Katutubong Pamayanan',
  'Pagkilala sa ancestral domain, Indigenous Peoples'' Rights Act (IPRA), at proteksyon sa kultura at lupaing ninuno.',
  '## Ang Laban para sa Lupaing Ninuno

Ang mga Katutubong Pilipino ang orihinal na tagapagtanggol ng ating mga kagubatan at kabundukan. Sa ilalim ng Republic Act No. 8371 o Indigenous Peoples'' Rights Act (IPRA) ng 1997, kinikilala ang kanilang karapatan sa Ancestral Domains at Self-Determination.

### Mga Isyu sa Pagpapatupad

* **Free, Prior and Informed Consent (FPIC):** Madalas na namamanipula o nalalagpasan ang FPIC ng mga dambuhalang proyektong pagmimina at dam.
* **Red-tagging at Karahasan:** Ang mga katutubong pinuno na nagtatanggol sa kanilang lupa ay madalas humarap sa harassment at banta sa buhay.

> "Ang lupa ay buhay. Para sa mga katutubo, ang pag-agaw sa kanilang lupaing ninuno ay katumbas ng pagbura sa kanilang pagkakakilanlan."',
  7,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000042',
  '00000000-0000-0000-0000-000000000004',
  'kalayaan-sa-pagpapahayag',
  'Kalayaan sa Pagpapahayag at Responsableng Pamamahayag',
  'Ang mahalagang papel ng malayang pamamahayag, kaligtasan ng mga mamamahayag, at paglaban sa censorship.',
  '## Malayang Pamamahayag Bilang Haligi ng Katotohanan

Ang kalayaan sa pananalita, pagpapahayag, at mapayapang pagtitipon ay pundasyon ng alinmang malusog na lipunan. Kung walang malayang mamamahayag na nag-uulat ng katotohanan nang walang takot, ang kapangyarihan ay madaling abusuhin.

### Mga Hamon sa Pamamahayag

1. **Impunity at Pagpatay sa mga Mamamahayag:** Ang Pilipinas ay nananatiling isa sa mga mapanganib na bansa para sa mga community journalists.
2. **Weaponization ng Cyberlibel:** Paggamit ng cyberlibel laws upang patahimikin ang mga kritiko at investigative reporters.
3. **Economic Pressures:** Mababang pasahod at kawalan ng insurance para sa mga provincial correspondents.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '00000000-0000-0000-0000-000000000005',
  'krisis-sa-edukasyon',
  'Krisis sa Edukasyon at Pagkatuto sa Pilipinas',
  'Isang malalimang pagsusuri sa estado ng pangunahing edukasyon, kakulangan sa mga silid-aralan, at mga kinakailangang reporma.',
  '## Ang Kasalukuyang Estado ng Edukasyon

Humaharap ang bansa sa tinatawag ng World Bank na "learning poverty" kung saan malaking bahagi ng 10-taong gulang na mga bata ay hindi makabasa o makaunawa ng simpleng teksto.

### Mga Sanhi ng Krisis

1. **Kakapusan sa Silid-aralan:** Backlog na mahigit 150,000 classrooms sa buong bansa, na nagiging sanhi ng siksikang mga klase (hanggang 60 mag-aaral bawat silid).
2. **Administrative Burden ng mga Guro:** Ang labis na non-teaching tasks ay nagbabawas sa oras ng guro para sa aktuwal na pagtuturo at remedial reading.
3. **Kakulangan sa Learning Materials:** Pagkaantala sa pamamahagi ng mga aklat-aralin at Science kits sa mga pampublikong paaralan.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000005',
  'aksesibilidad-sa-edukasyon',
  'Aksesibilidad at Pagkakapantay-pantay sa Last Mile Schools',
  'Pagsusuri sa kalagayan ng mga mag-aaral at guro sa malalayong isla, kabundukan, at mga komunidad na walang kuryente.',
  '## Edukasyon para sa mga Nasa Laylayan

Ang "Last Mile Schools" ay tumutukoy sa mga pampublikong paaralan na matatagpuan sa mga liblib na komunidad, malalayong isla, o kabundukan na madalas walang kuryente, tubig, at kalsada.

### Ang Hamon sa Bawat Araw

* **Mahabang Paglalakad:** Mga mag-aaral na tumatawid ng mga ilog at naglalakad nang 2 hanggang 3 oras makarating lamang sa eskwelahan.
* **Kakulangan sa Pasilidad:** Kakulangan ng digital connectivity at science laboratories na nagdudulot ng malaking agwat sa pagitan ng mag-aaral sa lungsod at kanayunan.
* **Dedikasyon ng mga Guro:** Mga guro na gumagastos mula sa sariling bulsa upang magdala ng modyul at pagkain para sa mga bata.',
  5,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000009',
  '00000000-0000-0000-0000-000000000005',
  'krisis-sa-literasiya-at-pisa-results',
  'Ang Krisis sa Literasiya at ang Resulta ng PISA sa Pilipinas',
  'Pagsusuri sa mababang ranggo ng mga mag-aaral na Pilipino sa Programme for International Student Assessment (PISA) at mga hakbang pasulong.',
  '## Pagsusuri sa Resulta ng PISA 2022

Sa pinakahuling resulta ng Programme for International Student Assessment (PISA) na isinagawa ng OECD, muling lumabas na ang mga mag-aaral na Pilipinong may edad 15 ay kabilang sa pinakamababang marka sa Pagbasa, Matematika, at Agham sa buong mundo.

### Mga Mahahalagang Aral mula sa PISA

1. **Socio-Economic Disadvantage:** Mahigit 80% ng pagkakaiba sa marka ay may kaugnayan sa katayuang pinansyal ng pamilya at kakulangan sa nutrisyon sa murang edad.
2. **Mother Tongue at Language Policy:** Ang hamon ng paglipat mula sa kinagisnang wika patungo sa Ingles sa pagsusulit sa agham at matematika.
3. **Kritikal na Pag-iisip:** Ang pangangailangan na lumipat mula sa memorization patungo sa problem-solving at reading comprehension.

> "Hindi natin masusolusyunan ang krisis sa pagkatuto kung hindi natin sasabayan ng solusyon sa kahirapan, gutom, at kalusugan ng bawat pamilyang Pilipino."',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000060',
  '00000000-0000-0000-0000-000000000006',
  'digital-divide-pilipinas',
  'Digital Divide at Internet Connectivity sa mga Rehiyon',
  'Pagsipat sa agwat ng digital infrastructure sa pagitan ng mga siyudad at probinsya, at ang karapatan sa mabilis at abot-kayang internet.',
  '## Ang Agwat sa Mundo ng Digital

Sa makabagong panahon, ang access sa mabilis at abot-kayang internet ay hindi na luho kundi batayang pangangailangan para sa edukasyon, trabaho, at serbisyo publiko.

### Ang Realidad sa Pilipinas

* **Mataas na Gastos, Mababang Bilis:** Ang Pilipinas ay nananatiling isa sa may pinakamahal na broadband costs kaugnay sa purchasing power ng mamamayan.
* **Geographical Inequity:** Malalaking siyudad lamang ang may fiber connectivity habang maraming baryo ang umaasa pa rin sa mahinang cellular signals.
* **National Broadband Program:** Ang pangangailangan na pabilisin ang rollout ng DICT sa mga libreng Wi-Fi sites sa mga pampublikong plaza at paaralan.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000061',
  '00000000-0000-0000-0000-000000000006',
  'ai-at-paggawa',
  'Artificial Intelligence at ang Hinaharap ng Trabaho at BPO sa Bansa',
  'Pagsusuri sa epekto ng generative AI sa sektor ng Business Process Outsourcing (BPO), upskilling, at mga manggagawa sa kaalaman.',
  '## AI sa Sentro ng Industriya ng Paggawa

Ang sektor ng IT-BPO ay nag-aambag ng bilyun-bilyong dolyar taon-taon sa ekonomiya ng Pilipinas at nagbibigay ng trabaho sa mahigit 1.5 milyong manggagawa. Sa mabilis na pag-usbong ng Generative AI at automated customer agents, humaharap ang bansa sa malaking transisyon.

### Mga Hakbang para sa Proteksyon ng Manggagawa

1. **Upskilling tungo sa Mas Mataas na Halaga:** Paglipat mula sa basic voice calls patungo sa data analytics, AI supervision, healthcare services, at software management.
2. **Etikal na Pamantayan sa AI:** Pagtiyak na ang paggamit ng AI sa opisina ay makatao at may proteksyon laban sa biglaang tanggalan.
3. **Pakikipagtulungan sa Academe:** Pag-aangkop ng kurikulum sa kolehiyo upang ihanda ang mga mag-aaral sa pakikipagtulungan sa AI tools.',
  7,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000062',
  '00000000-0000-0000-0000-000000000006',
  'disimpormasyon-at-social-media',
  'Disimpormasyon, Fake News, at Media and Information Literacy',
  'Ang pananalasa ng fake news, troll farms, at ang kahalagahan ng fact-checking at kritikal na pag-iisip sa digital age.',
  '## Ang Laban para sa Katotohanan sa Social Media

Ang Pilipinas ay kilala bilang "social media capital of the world". Subalit ang kasangkapang ito na nag-uugnay sa mga pamilya ay naging daluyan din ng coordinated inauthentic behavior, historical distortion, at pekeng balita.

### Paano Kumikilos ang Disimpormasyon

* **Echo Chambers at Algorithms:** Pabor ang mga social media algorithms sa mga nakakagalit o sensasyonal na nilalaman na humahati sa opinyon ng publiko.
* **Troll Farms at Clickbait:** Organisadong mga grupo na binabayaran upang manipulahin ang pampublikong diskurso.
* **Media Literacy sa Silid-Aralan:** Pagtuturo sa kabataan kung paano kumilatis ng lehitimong balita, mag-cross reference ng sanggunian, at kilalanin ang cognitive bias.',
  7,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000070',
  '00000000-0000-0000-0000-000000000007',
  'kalusugang-pangkalahatan',
  'Kalusugang Pangkalahatan at ang Universal Health Care Act',
  'Pagsusuri sa pagpapatupad ng UHC Act (RA 11223), PhilHealth coverage, at accessibility ng gamot at duktor sa mga baryo.',
  '## Kalusugan Bilang Pangunahing Karapatan

Ang Republic Act No. 11223 o Universal Health Care (UHC) Act ay nilagdaan upang tiyakin na bawat Pilipino ay may proteksyon sa pinansyal na panganib dulot ng pagkakasakit at may access sa de-kalidad na serbisyong medikal.

### Mga Hamon sa Pagpapatupad

1. **Out-of-Pocket Expenses:** Nananatiling mataas ang binabayaran ng pamilya mula sa sariling bulsa para sa gamot at laboratory tests.
2. **Kakapusan sa mga Duktor sa Baryo:** Maraming municipal health centers ang walang permanenteng doktor o sapat na supply ng life-saving medicines.
3. **Pangangalaga sa Primary Care:** Pagpapalakas sa Barangay Health Stations (BHS) bilang unang pananggalang bago pumunta sa malalaking ospital.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000071',
  '00000000-0000-0000-0000-000000000007',
  'seguridad-sa-pagkain',
  'Malnutrisyon, Pagkabansot, at Seguridad sa Nutrisyon ng Kabataan',
  'Pagsusuri sa childhood stunting, First 1,000 Days Law, at epekto ng kakulangan sa masustansyang pagkain sa talino ng bata.',
  '## Ang Tahimik na Krisis ng Malnutrisyon

Ayon sa Food and Nutrition Research Institute (FNRI), halos isa sa bawat tatlong batang Pilipinong may edad 5 pababa ay bansot (stunted). Ang stunting ay hindi lamang usapin ng tangkad; ito ay permanenteng pinsala sa pag-unlad ng utak.

### Ang Kritikal na First 1,000 Days

* **Kalusugan ng Ina:** Sapat na nutrisyon habang nagdadalang-tao upang maiwasan ang low birth weight sa mga sanggol.
* **Eksklusibong Pagpapasuso:** Pagpapalakas sa suporta sa exclusive breastfeeding sa unang 6 na buwan.
* **School Feeding Programs:** Palakihin ang saklaw ng DepEd at DSWD feeding programs gamit ang sariwang ani mula sa mga lokal na magsasaka.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

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
  '10000000-0000-0000-0000-000000000072',
  '00000000-0000-0000-0000-000000000007',
  'luntiang-enerhiya',
  'Luntiang Enerhiya, Malinis na Hangin, at Pangmatagalang Kalusugan',
  'Ang ugnayan ng kalidad ng hangin sa pampublikong kalusugan, renewable energy, at likas-kayang pag-unlad sa mga komunidad.',
  '## Malinis na Hangin at Likas-kayang Enerhiya

Ang polusyon sa hangin dulot ng fossil fuels at lumang transportasyon ay nagdudulot ng libu-libong maagang pagkamatay taon-taon dahil sa sakit sa puso, baga, at hika.

### Ang Solusyon sa Malinis na Enerhiya

1. **Transisyon sa Solar at Geothermal:** Paggamit sa natural na yaman ng Pilipinas bilang lider sa geothermal energy sa Asya.
2. **Modernisasyon ng Pampublikong Transportasyon:** Paglipat sa mga electric jeepneys at pagtatayo ng ligtas na protected bike lanes sa mga kalunsuran.
3. **Pangangalaga sa Kalidad ng Hangin:** Mahigpit na monitoring sa emissions ng mga pabrika at power plants alinsunod sa Clean Air Act.',
  6,
  true,
  now()
)
on conflict (slug) do update set
  topic_id = excluded.topic_id,
  title = excluded.title,
  summary = excluded.summary,
  content_markdown = excluded.content_markdown,
  read_time_minutes = excluded.read_time_minutes,
  is_published = excluded.is_published,
  updated_at = now();

-- -----------------------------------------------------------------------------
-- 3. Insert Verified Citations (Sources)
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
values (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000010',
  'Philippine Environment Monitor & Solid Waste Management Statistics',
  'Department of Environment and Natural Resources (DENR)',
  'Environmental Management Bureau',
  'https://emb.gov.ph',
  '2023-08-15',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000011',
  'Climate Change 2023: Synthesis Report (AR6)',
  'Intergovernmental Panel on Climate Change (IPCC)',
  'IPCC Secretariat, Geneva',
  'https://www.ipcc.ch/report/ar6/syr/',
  '2023-03-20',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000011',
  'National Climate Change Action Plan Assessment',
  'Climate Change Commission (CCC)',
  'Office of the President, Malacañang',
  'https://climate.gov.ph',
  '2022-11-15',
  2
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000012',
  'Philippine Development Plan 2023–2028: Chapter 15 — Accelerating Climate Action',
  'National Economic and Development Authority (NEDA)',
  'NEDA Pasig City',
  'https://pdp.neda.gov.ph',
  '2023-01-10',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000020',
  'Consumer Price Index and Inflation Rate Reports',
  'Philippine Statistics Authority (PSA)',
  'PSA Official Statistics',
  'https://psa.gov.ph',
  '2024-02-06',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000021',
  'Labor Force Survey & Decent Work Country Diagnostic',
  'International Labour Organization (ILO)',
  'ILO Country Office for the Philippines',
  'https://www.ilo.org/manila',
  '2023-09-12',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000022',
  'Agrarian Reform Impact Assessment and Agricultural Performance',
  'Department of Agrarian Reform (DAR)',
  'DAR Policy and Planning Bureau',
  'https://www.dar.gov.ph',
  '2023-05-18',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000030',
  '1987 Philippine Constitution: Article II and Article III',
  'Constitutional Commission',
  'Official Gazette of the Republic of the Philippines',
  'https://www.officialgazette.gov.ph/constitutions/1987-constitution/',
  '1987-02-02',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000031',
  'Annual Financial Reports & Citizen''s Participatory Audit Manual',
  'Commission on Audit (COA)',
  'COA Central Office, Quezon City',
  'https://www.coa.gov.ph',
  '2023-11-20',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000032',
  'Mandanas-Garcia Ruling Implementation: Executive Order No. 138 Framework',
  'Department of the Interior and Local Government (DILG)',
  'DILG Bureau of Local Government Development',
  'https://www.dilg.gov.ph',
  '2022-06-30',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000040',
  'Universal Declaration of Human Rights and the Philippine Bill of Rights',
  'Commission on Human Rights (CHR)',
  'CHR Human Rights Education Bureau',
  'https://chr.gov.ph',
  '2023-12-10',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000012',
  '10000000-0000-0000-0000-000000000041',
  'Republic Act No. 8371 (IPRA) and Ancestral Domains Review',
  'National Commission on Indigenous Peoples (NCIP)',
  'NCIP Official Portal',
  'https://ncip.gov.ph',
  '2023-10-29',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000013',
  '10000000-0000-0000-0000-000000000042',
  'State of Free Expression and Media Safety Report',
  'National Union of Journalists of the Philippines (NUJP)',
  'NUJP Secretariat',
  'https://nujp.org',
  '2024-05-03',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000014',
  '10000000-0000-0000-0000-000000000001',
  'Basic Education Report (BER) 2024',
  'Department of Education (DepEd)',
  'DepEd Public Affairs Service',
  'https://www.deped.gov.ph',
  '2024-01-25',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000015',
  '10000000-0000-0000-0000-000000000002',
  'The State of the 21st Century Last Mile Schools in the Philippines',
  'Philippine Institute for Development Studies (PIDS)',
  'PIDS Policy Notes',
  'https://www.pids.gov.ph',
  '2023-04-14',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000016',
  '10000000-0000-0000-0000-000000000009',
  'PISA 2022 Results: Factsheets Philippines',
  'OECD',
  'Organisation for Economic Co-operation and Development',
  'https://www.oecd.org/publication/pisa-2022-results/',
  '2023-12-05',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000017',
  '10000000-0000-0000-0000-000000000060',
  'National ICT Household Survey & Connectivity Assessment',
  'Department of Information and Communications Technology (DICT)',
  'DICT ICT Planning Bureau',
  'https://dict.gov.ph',
  '2023-07-22',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000018',
  '10000000-0000-0000-0000-000000000061',
  'Artificial Intelligence Roadmap for the Philippines & BPO Evolution',
  'Department of Trade and Industry (DTI)',
  'DTI Board of Investments',
  'https://innovate.dti.gov.ph',
  '2023-11-08',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000019',
  '10000000-0000-0000-0000-000000000062',
  'Tracking Digital Disinformation and Algorithmic Manipulation in the Philippines',
  'UP College of Mass Communication & VERA Files',
  'Philippine Journalism Review',
  'https://verafiles.org',
  '2024-02-19',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000020',
  '10000000-0000-0000-0000-000000000070',
  'Universal Health Care Act (RA 11223) Progress Report',
  'Department of Health (DOH)',
  'DOH Health Policy Development and Planning Bureau',
  'https://doh.gov.ph',
  '2023-10-12',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000021',
  '10000000-0000-0000-0000-000000000071',
  'National Nutrition Survey: Stunting and Malnutrition in Filipino Children',
  'Food and Nutrition Research Institute (DOST-FNRI)',
  'DOST Taguig',
  'https://www.fnri.dost.gov.ph',
  '2023-06-30',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;

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
values (
  '20000000-0000-0000-0000-000000000022',
  '10000000-0000-0000-0000-000000000072',
  'Philippine Energy Plan 2023–2050: Clean Energy Scenario',
  'Department of Energy (DOE)',
  'DOE Energy Policy and Planning Bureau',
  'https://www.doe.gov.ph',
  '2023-09-25',
  1
)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  publication = excluded.publication,
  url = excluded.url,
  published_date = excluded.published_date,
  order_index = excluded.order_index;



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


-- -----------------------------------------------------------------------------
-- Ensure Admin User has 'admin' Role in profiles
-- -----------------------------------------------------------------------------
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, 'Punong Patnugot', 'admin'
FROM auth.users
WHERE email = 'admin@diwangpanlipunan.ph'
ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();
