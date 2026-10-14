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
