-- =============================================================================
-- Migration: 00004_update_topics_contemporary_issues.sql
-- Description: Align core topics to the 3 contemporary issues modules and delete others
-- =============================================================================

-- 1. Delete obsolete topics
delete from public.topics where id in (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000006'
);

-- 2. Upsert Topic 1: Kahalagahan ng Pag-aaral ng mga Kontemporaryong Isyu
insert into public.topics (id, slug, name_fil, name_en, description_fil, description_en, icon_name, color_token, order_index, is_published)
values (
  '9b426877-33ee-44c3-a6f6-fa712e2f2dbf',
  'kahalagahan-pag-aaral-kontemporaryong-isyu',
  'Kahalagahan ng Pag-aaral ng mga Kontemporaryong Isyu',
  'Importance of Studying Contemporary Issues',
  'Ang temang ito ay nakatuon sa kahalagahan ng pag-aaral ng mga kontemporaryong isyu upang maunawaan ng mga mag-aaral ang mga napapanahong pangyayari at suliranin sa lipunan. Layunin nitong malinang ang kritikal na pag-iisip, pagiging mapanuri, at responsableng pakikilahok sa paglutas ng mga problema sa komunidad at bansa.',
  'This theme focuses on the importance of studying contemporary issues to help students understand current events and social problems. It develops critical thinking, awareness, and responsible participation in addressing challenges in the community and the country.',
  'BookOpen',
  '--topic-edukasyon',
  1,
  true
)
on conflict (id) do update set
  slug = excluded.slug,
  name_fil = excluded.name_fil,
  name_en = excluded.name_en,
  order_index = excluded.order_index;

-- 3. Upsert Topic 2: Mga Suliraning Pangkapaligiran
insert into public.topics (id, slug, name_fil, name_en, description_fil, description_en, icon_name, color_token, order_index, is_published)
values (
  '00000000-0000-0000-0000-000000000005',
  'mga-suliraning-pangkapaligiran',
  'Mga Suliraning Pangkapaligiran',
  'Environmental Issues',
  'Susing pagsusuri sa krisis pangklima, solid waste management, deforestation, at makatarungang pangangalaga sa kalikasan alinsunod sa AP 10 Curriculum.',
  'Critical examination of the climate crisis, waste management, deforestation, and ecological stewardship in the Philippines.',
  'Leaf',
  '--topic-kapaligiran',
  2,
  true
)
on conflict (id) do update set
  slug = excluded.slug,
  name_fil = excluded.name_fil,
  name_en = excluded.name_en,
  order_index = excluded.order_index;

-- 4. Upsert Topic 3: Mga Isyung Pang-ekonomiya
insert into public.topics (id, slug, name_fil, name_en, description_fil, description_en, icon_name, color_token, order_index, is_published)
values (
  '00000000-0000-0000-0000-000000000007',
  'mga-isyung-pang-ekonomiya',
  'Mga Isyung Pang-ekonomiya',
  'Economic Issues',
  'Ang Mga Isyung Pang-Ekonomiya ay tumutukoy sa mga pampublikong kaganapan, usapin, at suliraning may direktang epekto sa sistema ng produksiyon, alokasyon, pamamahagi, at pagkonsumo ng mga produkto at serbisyo sa loob at labas ng bansa.',
  'Analyzing economic issues, inflation, labor conditions, and sustainable livelihood.',
  'TrendingUp',
  '--topic-ekonomiya',
  3,
  true
)
on conflict (id) do update set
  slug = excluded.slug,
  name_fil = excluded.name_fil,
  name_en = excluded.name_en,
  order_index = excluded.order_index;
