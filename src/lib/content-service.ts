import { createClient } from "@/lib/supabase/server";
import { Topic, Subtopic, Source, SubtopicWithSources } from "@/types/content";

export interface TopicCatalogItem extends Topic {
  subtopic_count: number;
  subtopics: Subtopic[];
}

// Embedded Seed Data for Resilient Offline / Pre-DB Rendering
const SEED_TOPICS: TopicCatalogItem[] = [
  {
    "id": "9b426877-33ee-44c3-a6f6-fa712e2f2dbf",
    "slug": "kahalagahan-pag-aaral-kontemporaryong-isyu",
    "name_fil": "Kahalagahan ng Pag-aaral ng mga Kontemporaryong Isyu",
    "name_en": "Importance of Studying Contemporary Issues",
    "description_fil": "Ang temang ito ay nakatuon sa kahalagahan ng pag-aaral ng mga kontemporaryong isyu upang maunawaan ng mga mag-aaral ang mga napapanahong pangyayari at suliranin sa lipunan. Layunin nitong malinang ang kritikal na pag-iisip, pagiging mapanuri, at responsableng pakikilahok sa paglutas ng mga problema sa komunidad at bansa.",
    "description_en": "This theme focuses on the importance of studying contemporary issues to help students understand current events and social problems. It develops critical thinking, awareness, and responsible participation in addressing challenges in the community and the country.",
    "icon_name": "BookOpen",
    "color_token": "--topic-edukasyon",
    "order_index": 1,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000001",
        "topic_id": "9b426877-33ee-44c3-a6f6-fa712e2f2dbf",
        "slug": "konsepto-at-katuturan-ng-kontemporaryong-isyu",
        "title": "Konsepto at Katuturan ng Kontemporaryong Isyu",
        "summary": "Pangkalahatang pagsipat sa kahulugan, saklaw, at uri ng mga kontemporaryong isyu sa lipunang Pilipino at pandaigdig.",
        "content_markdown": "## Ano ang Kontemporaryong Isyu?\n\nAng salitang **kontemporaryo** ay tumutukoy sa mga pangyayari, ideya, o paksang nagaganap sa kasalukuyang panahon o may direktang impluwensya sa kasalukuyan. Sa kabilang banda, ang **isyu** ay isang mahalagang paksa o suliranin na pinagdedebatihan, pinag-uusapan, at may epekto sa pamumuhay ng mga tao sa isang komunidad o bansa.\n\n### Katangian ng Kontemporaryong Isyu\n\n1. **Kasalukuyan at Napapanahon:** May direktang kaugnayan sa mga kaganapan sa loob ng kasalukuyang henerasyon.\n2. **May Panlipunang Epekto:** Nakakaapekto hindi lamang sa iisang tao kundi sa malaking bahagi ng populasyon.\n3. **Pinagtatalunan:** May iba't ibang pananaw, tindig, at pagsusuri ang iba't ibang sektor ng lipunan.\n4. **May Halaga sa Kinabukasan:** Ang mga desisyong gagawin hinggil dito ay magtatakda ng kalagayan ng mga susunod na salinlahi.\n\n> \"Ang pag-aaral ng kontemporaryong isyu ay hindi simpleng pagbabasa ng balita; ito ay pag-unawa sa ugat ng suliranin upang maging bahagi ng solusyon.\"",
        "read_time_minutes": 5,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000002",
        "topic_id": "9b426877-33ee-44c3-a6f6-fa712e2f2dbf",
        "slug": "kasanayan-sa-pagsusuri-ng-isyu",
        "title": "Kasanayan sa Mapanuring Pagsusuri ng mga Isyung Panlipunan",
        "summary": "Paggamit ng primarya at sekundaryang sanggunian, pagkilatis sa katotohanan laban sa opinyon, at pagtukoy sa pagkiling (bias).",
        "content_markdown": "## Mga Kasanayang Kinakailangan sa Pagsusuri\n\nUpang maging epektibo ang pag-aaral ng mga kontemporaryong isyu, kinakailangang taglayin ng mag-aaral ang mga sumusunod na kasanayang pangkaisipan:\n\n### 1. Pagkilala sa Primarya at Sekundaryang Sanggunian\n* **Primaryang Sanggunian:** Orihinal na tala ng mga pangyayaring isinulat o ginawa ng mga taong nakaranas o nakasaksi nito (hal. talaarawan, legal na dokumento, opisyal na ulat, larawan).\n* **Sekundaryang Sanggunian:** Impormasyon o interpretasyon batay sa primaryang pinagkunan na inihanda ng ibang tao (hal. aklat, editoryal, encyclopedia).\n\n### 2. Pagtukoy sa Katotohanan at Opinyon\n* Ang **katotohanan** ay totoong pahayag o kaganapan na pinatutunayan ng mga aktuwal na datos o ebidensya.\n* Ang **opinyon** ay personal na pananaw, saloobin, o kaisipan na nagpapahayag ng damdamin o paghuhusga.\n\n### 3. Pagtukoy sa Pagkiling (Bias)\nMahalagang suriin kung ang isang ulat ay may kinikilingan o naglalahad lamang ng isang panig ng kuwento nang may layuning manipulahin ang opinyon ng publiko.",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000003",
        "topic_id": "9b426877-33ee-44c3-a6f6-fa712e2f2dbf",
        "slug": "kahalagahan-ng-aktibong-pagkamamamayan",
        "title": "Kahalagahan ng Aktibong Pagkamamamayan at Pakikilahok",
        "summary": "Ang pananagutan ng bawat mamamayan sa paglutas ng mga suliraning panlipunan at pagtaguyod ng kabutihang panlahat.",
        "content_markdown": "## Mula Kamalayan Patungong Aksyon\n\nHindi sapat na alam lamang natin ang mga suliranin sa ating paligid. Ang tunay na kabuluhan ng pag-aaral ng kontemporaryong isyu ay ang pagiging mapanagutan at aktibong mamamayan.\n\n### Bakit Mahalaga ang Pakikilahok?\n\n1. **Paghubog ng Mapanuring Pag-iisip:** Natututuhan ng mag-aaral na hindi basta maniwala sa sabi-sabi o fake news.\n2. **Pagkakaroon ng Panlipunang Kamalayan:** Nagiging sensitibo sa pangangailangan ng marhinalisadong sektor tulad ng magsasaka, manggagawa, at katutubo.\n3. **Pagpapalakas ng Demokrasya:** Ang isang maalam at mulat na mamamayan ang pinakamabisang pananggalang laban sa katiwalian at maling pamamahala.\n\n> \"Ang kinabukasan ng bayan ay hindi nakasalalay sa mga namumuno lamang; ito ay nakasalalay sa kapangyarihan ng isang mulat at nagkakaisang mamamayan.\"",
        "read_time_minutes": 5,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      }
    ]
  },
  {
    "id": "00000000-0000-0000-0000-000000000005",
    "slug": "mga-suliraning-pangkapaligiran",
    "name_fil": "Mga Suliraning Pangkapaligiran",
    "name_en": "Environmental Issues",
    "description_fil": "Susing pagsusuri sa krisis pangklima, solid waste management, deforestation, at makatarungang pangangalaga sa kalikasan alinsunod sa AP 10 Curriculum.",
    "description_en": "Critical examination of the climate crisis, waste management, deforestation, and ecological stewardship in the Philippines.",
    "icon_name": "Leaf",
    "color_token": "--topic-kapaligiran",
    "order_index": 2,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000010",
        "topic_id": "00000000-0000-0000-0000-000000000005",
        "slug": "mga-suliraning-pangkapaligiran",
        "title": "Mga Suliraning Pangkapaligiran sa Bansa",
        "summary": "Pangkalahatang pagsipat sa polusyon sa hangin at tubig, deforestation, at pagkasira ng mga marine habitats sa kapuluan.",
        "content_markdown": "## Ang Hamon ng Kalikasan sa Arkipelago\n\nBilang isang kapuluan na mayaman sa likas na yaman at biodiversity, ang Pilipinas ay humaharap sa matitinding hamong pangkapaligiran. Ang mabilis na urbanisasyon, hindi wastong pagtatapon ng basura, at deforestation ay patuloy na nagdudulot ng pinsala sa ating mga kabundukan at karagatan.\n\n### Mga Pangunahing Suliranin\n\n1. **Deforestation at Pagkasira ng Kagubatan:** Patuloy ang pagliit ng forest cover sa bansa dulot ng illegal logging, quarrying, at commercial conversion.\n2. **Krisis sa Solid Waste Management:** Sa kabila ng RA 9003 (Ecological Solid Waste Management Act), milyun-milyong tonelada ng single-use plastics ang patuloy na napupunta sa mga ilog at Manila Bay.\n3. **Pagkasira ng Marine Ecosystems:** Ang dinamita, labis na pangingisda, at pagtatapon ng kemikal ay sumisira sa mga coral reef na nagsisilbing kanlungan ng mga isda.\n\n> \"Ang pangangalaga sa kalikasan ay hindi lamang usaping siyentipiko; ito ay usapin ng panlipunang katarungan para sa mga susunod na henerasyon ng mga Pilipino.\"",
        "read_time_minutes": 5,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000011",
        "topic_id": "00000000-0000-0000-0000-000000000005",
        "slug": "climate-change-sa-pilipinas",
        "title": "Climate Change sa Pilipinas: Vulnerabilities, Impacts, and Ecological Justice",
        "summary": "Susing pagsusuri sa krisis pangklima, pagtaas ng antas ng dagat, at ang kagyat na pangangailangan para sa hustisyang pangklima.",
        "content_markdown": "## Ang Pilipinas sa Mata ng Bagyo\n\nAng kapuluan ng Pilipinas ay kabilang sa mga pinakabulnerableng bansa sa daigdig pagdating sa epekto ng climate change. Bagama't mababa sa 0.5% ang ambag ng bansa sa pandaigdigang greenhouse gas emissions, tayo ang isa sa mga labis na nagdurusa sa lumalakas na mga super typhoon, matagalang tagtuyot dulot ng El Niño, at pagtaas ng antas ng dagat.\n\n### Mga Pangunahing Datos at Katotohanan\n\n> **TALA NG DATOS: ANTAS NG DAGAT**  \n> **3x** Pandaigdigang Karaniwang Bilis ng Pagtaas ng Dagat  \n> Ayon sa PAGASA at Climate Change Commission, ang pagtaas ng karagatan sa ilang bahagi ng Pilipinas ay triple kaysa sa pandaigdigang average dahil sa subsidence at ocean thermal expansion.\n\n### Epekto sa Agrikultura at Pangingisda\n\n* **Mababang Ani:** Ang hindi mahulaang pattern ng tag-ulan ay nagdudulot ng malawakang pagkalugi sa mga magsasaka ng palay at mais sa Luzon at Mindanao.\n* **Fish Kills at Coral Bleaching:** Ang pag-init ng temperatura ng tubig ay nagdudulot ng mass bleaching sa mga bahura, na direktang nagpapaliit sa huli ng mga municipal fisherfolk.\n\n> \"Climate justice requires high-emitting industrialized economies to honor their loss and damage commitments to frontline archipelagic communities.\"",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000012",
        "topic_id": "00000000-0000-0000-0000-000000000005",
        "slug": "mga-hakbang-tungo-sa-sustainability",
        "title": "Mga Hakbang Tungo sa Sustainability at Likas-kayang Kaunlaran",
        "summary": "Pagsusuri sa Renewable Energy Act, community-led reforestation, at mga polisiya para sa climate adaptation sa Pilipinas.",
        "content_markdown": "## Pagpapatupad ng Likas-kayang Kaunlaran\n\nHindi sapat ang reaktibong pagtugon kapag may dumarating na kalamidad. Ang tunay na katatagan o resilience ay nakaugat sa pangmatagalang polisiya at community-based disaster risk reduction and management (CBDRRM).\n\n### Mga Estratehikong Haligi\n\n1. **Renewable Energy Transition:** Pagpapabilis sa paglipat mula sa coal-fired plants patungo sa solar, wind, at geothermal energy alinsunod sa Renewable Energy Act ng 2008.\n2. **Proteksyon sa Mangrove Buffers:** Ang pagtatanim ng bakawan sa mga baybayin ay nagpapatunay na pinakamabisang natural na pananggalang laban sa storm surges.\n3. **Lokal na Pagsasanay:** Pagbibigay ng sapat na pondo at kagamitan sa mga Local Disaster Risk Reduction Management Offices (LDRRMOs) sa halip na umasa lamang sa pambansang pondo.",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      }
    ]
  },
  {
    "id": "00000000-0000-0000-0000-000000000007",
    "slug": "mga-isyung-pang-ekonomiya",
    "name_fil": "Mga Isyung Pang-ekonomiya",
    "name_en": "Economic Issues",
    "description_fil": "Ang Mga Isyung Pang-Ekonomiya ay tumutukoy sa mga pampublikong kaganapan, usapin, at suliraning may direktang epekto sa sistema ng produksiyon, alokasyon, pamamahagi, at pagkonsumo ng mga produkto at serbisyo sa loob at labas ng bansa.",
    "description_en": "Analyzing economic issues, employment, market systems, inflation, and sustainable livelihood.",
    "icon_name": "TrendingUp",
    "color_token": "--topic-ekonomiya",
    "order_index": 3,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000020",
        "topic_id": "00000000-0000-0000-0000-000000000007",
        "slug": "implasyon-at-presyo",
        "title": "Implasyon at Presyo ng mga Pangunahing Bilihin",
        "summary": "Pagsusuri sa mga sanhi ng pagtaas ng presyo ng pagkain at enerhiya, at epekto nito sa kapangyarihang bumili ng mga karaniwang pamilya.",
        "content_markdown": "## Ang Hamon ng Implasyon sa Araw-araw na Pamumuhay\n\nAng implasyon ay tumutukoy sa pangkalahatang pagtaas ng presyo ng mga bilihin at serbisyo sa paglipas ng panahon. Para sa karaniwang pamilyang Pilipino, ang implasyon sa pagkain (tulad ng bigas, sibuyas, at karne) at langis ang may pinakamabigat na epekto sa badyet ng tahanan.\n\n### Mga Salik sa Pagtaas ng Presyo\n\n1. **Supply-Side Bottlenecks:** Kakulangan sa lokal na produksyon at mga kalamidad na sumisira sa pananim.\n2. **Pandaigdigang Presyo ng Krudo:** Ang pagiging import-dependent ng Pilipinas sa langis ay nagdudulot ng mataas na gastos sa transportasyon at kuryente.\n3. **Papel ng mga Middlemen:** Malaking agwat sa pagitan ng farmgate price na binabayad sa magsasaka at retail price sa palengke.\n\n> \"Kapag tumaas ang presyo ng bigas nang 10%, ang pinakamahihirap na sektor ang unang napipilitang magbawas ng pagkain sa kanilang hapag-kainan.\"",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000021",
        "topic_id": "00000000-0000-0000-0000-000000000007",
        "slug": "kalagayan-ng-manggagawa",
        "title": "Kalagayan ng mga Manggagawa, Pasahod, at Karapatan sa Paggawa",
        "summary": "Pagsipat sa kontraktuwalisasyon, agwat ng minimum wage at living wage, at proteksyon sa impormal na sektor.",
        "content_markdown": "## Dignidad sa Paggawa at Karampatang Sahod\n\nAng mga manggagawang Pilipino ang gulugod ng ekonomiya. Subalit patuloy silang humaharap sa mga hamon tulad ng kawalan ng katiyakan sa trabaho (endo/kontraktuwalisasyon) at pasahod na hindi sumasapat sa family living wage.\n\n### Kasalukuyang Realidad\n\n* **Regional Wage Disparities:** Malaki ang agwat ng minimum wage sa Kalakhang Maynila kumpara sa mga rehiyon, sa kabila ng magkatulad na presyo ng mga pangunahing bilihin.\n* **Impormal na Sektor:** Mahigit 40% ng lakas-paggawa ay nasa informal economy (mga vendor, delivery rider, domestic worker) na walang sapat na social protection tulad ng SSS, PhilHealth, at Pag-IBIG.\n\n> \"Ang disenteng trabaho ay hindi pribilehiyo kundi batayang karapatang pantao na ginagarantiyahan ng Saligang Batas.\"",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000022",
        "topic_id": "00000000-0000-0000-0000-000000000007",
        "slug": "agrikultura-at-repormang-agraryo",
        "title": "Agrikultura, Seguridad sa Pagkain, at Repormang Agraryo",
        "summary": "Pagsusuri sa kalagayan ng mga magsasaka, land conversion, modernisasyon, at subsidiya sa sektor ng agrikultura.",
        "content_markdown": "## Ang Banta sa Agrikultura at Seguridad sa Pagkain\n\nSa kabila ng pagiging bansang agrikultural, ang sektor ng pagsasaka sa Pilipinas ay nananatiling isa sa may pinakamataas na antas ng kahirapan. Ang pagtanda ng populasyon ng mga magsasaka (average age: 53 taong gulang) at kakulangan sa makabagong kagamitan ay nagbabanta sa seguridad ng pagkain ng bansa.\n\n### Mga Kritikal na Isyu\n\n1. **Repormang Agraryo:** Maraming magsasaka ang nabigyan ng Certificate of Land Ownership Award (CLOA) ngunit salat sa suportang serbisyo tulad ng irigasyon, pautang, at post-harvest facilities.\n2. **Import Dependency:** Ang labis na pag-asa sa imported na bigas at asuk ay nagpapabagsak sa kita ng lokal na produksyon.\n3. **Land Conversion:** Pagpapalit-gamit ng matatabang lupang pansakahan patungo sa commercial subdivisions at industrial parks.",
        "read_time_minutes": 7,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      }
    ]
  }
];


// Seed Sources / Citations
const SEED_SOURCES: Record<string, Source[]> = {
  "mga-suliraning-pangkapaligiran": [
    {
      "id": "src-mga-suliraning-pangkapaligiran-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000010",
      "title": "Philippine Environment Monitor & Solid Waste Management Statistics",
      "author": "Department of Environment and Natural Resources (DENR)",
      "publication": "Environmental Management Bureau",
      "url": "https://emb.gov.ph",
      "published_date": "2023-08-15",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "climate-change-sa-pilipinas": [
    {
      "id": "src-climate-change-sa-pilipinas-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000011",
      "title": "Climate Change 2023: Synthesis Report (AR6)",
      "author": "Intergovernmental Panel on Climate Change (IPCC)",
      "publication": "IPCC Secretariat, Geneva",
      "url": "https://www.ipcc.ch/report/ar6/syr/",
      "published_date": "2023-03-20",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    },
    {
      "id": "src-climate-change-sa-pilipinas-2",
      "subtopic_id": "10000000-0000-0000-0000-000000000011",
      "title": "National Climate Change Action Plan Assessment",
      "author": "Climate Change Commission (CCC)",
      "publication": "Office of the President, Malacañang",
      "url": "https://climate.gov.ph",
      "published_date": "2022-11-15",
      "order_index": 2,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "mga-hakbang-tungo-sa-sustainability": [
    {
      "id": "src-mga-hakbang-tungo-sa-sustainability-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000012",
      "title": "Philippine Development Plan 2023–2028: Chapter 15 — Accelerating Climate Action",
      "author": "National Economic and Development Authority (NEDA)",
      "publication": "NEDA Pasig City",
      "url": "https://pdp.neda.gov.ph",
      "published_date": "2023-01-10",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "implasyon-at-presyo": [
    {
      "id": "src-implasyon-at-presyo-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000020",
      "title": "Consumer Price Index and Inflation Rate Reports",
      "author": "Philippine Statistics Authority (PSA)",
      "publication": "PSA Official Statistics",
      "url": "https://psa.gov.ph",
      "published_date": "2024-02-06",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "kalagayan-ng-manggagawa": [
    {
      "id": "src-kalagayan-ng-manggagawa-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000021",
      "title": "Labor Force Survey & Decent Work Country Diagnostic",
      "author": "International Labour Organization (ILO)",
      "publication": "ILO Country Office for the Philippines",
      "url": "https://www.ilo.org/manila",
      "published_date": "2023-09-12",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "agrikultura-at-repormang-agraryo": [
    {
      "id": "src-agrikultura-at-repormang-agraryo-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000022",
      "title": "Agrarian Reform Impact Assessment and Agricultural Performance",
      "author": "Department of Agrarian Reform (DAR)",
      "publication": "DAR Policy and Planning Bureau",
      "url": "https://www.dar.gov.ph",
      "published_date": "2023-05-18",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "demokrasya-at-partisipasyon": [
    {
      "id": "src-demokrasya-at-partisipasyon-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000030",
      "title": "1987 Philippine Constitution: Article II and Article III",
      "author": "Constitutional Commission",
      "publication": "Official Gazette of the Republic of the Philippines",
      "url": "https://www.officialgazette.gov.ph/constitutions/1987-constitution/",
      "published_date": "1987-02-02",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "korapsiyon-at-pananagutan": [
    {
      "id": "src-korapsiyon-at-pananagutan-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000031",
      "title": "Annual Financial Reports & Citizen's Participatory Audit Manual",
      "author": "Commission on Audit (COA)",
      "publication": "COA Central Office, Quezon City",
      "url": "https://www.coa.gov.ph",
      "published_date": "2023-11-20",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "desentralisasyon-at-lokal": [
    {
      "id": "src-desentralisasyon-at-lokal-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000032",
      "title": "Mandanas-Garcia Ruling Implementation: Executive Order No. 138 Framework",
      "author": "Department of the Interior and Local Government (DILG)",
      "publication": "DILG Bureau of Local Government Development",
      "url": "https://www.dilg.gov.ph",
      "published_date": "2022-06-30",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "batayang-karapatan": [
    {
      "id": "src-batayang-karapatan-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000040",
      "title": "Universal Declaration of Human Rights and the Philippine Bill of Rights",
      "author": "Commission on Human Rights (CHR)",
      "publication": "CHR Human Rights Education Bureau",
      "url": "https://chr.gov.ph",
      "published_date": "2023-12-10",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "katarungan-at-katutubo": [
    {
      "id": "src-katarungan-at-katutubo-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000041",
      "title": "Republic Act No. 8371 (IPRA) and Ancestral Domains Review",
      "author": "National Commission on Indigenous Peoples (NCIP)",
      "publication": "NCIP Official Portal",
      "url": "https://ncip.gov.ph",
      "published_date": "2023-10-29",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "kalayaan-sa-pagpapahayag": [
    {
      "id": "src-kalayaan-sa-pagpapahayag-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000042",
      "title": "State of Free Expression and Media Safety Report",
      "author": "National Union of Journalists of the Philippines (NUJP)",
      "publication": "NUJP Secretariat",
      "url": "https://nujp.org",
      "published_date": "2024-05-03",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "krisis-sa-edukasyon": [
    {
      "id": "src-krisis-sa-edukasyon-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000001",
      "title": "Basic Education Report (BER) 2024",
      "author": "Department of Education (DepEd)",
      "publication": "DepEd Public Affairs Service",
      "url": "https://www.deped.gov.ph",
      "published_date": "2024-01-25",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "aksesibilidad-sa-edukasyon": [
    {
      "id": "src-aksesibilidad-sa-edukasyon-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000002",
      "title": "The State of the 21st Century Last Mile Schools in the Philippines",
      "author": "Philippine Institute for Development Studies (PIDS)",
      "publication": "PIDS Policy Notes",
      "url": "https://www.pids.gov.ph",
      "published_date": "2023-04-14",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "krisis-sa-literasiya-at-pisa-results": [
    {
      "id": "src-krisis-sa-literasiya-at-pisa-results-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000009",
      "title": "PISA 2022 Results: Factsheets Philippines",
      "author": "OECD",
      "publication": "Organisation for Economic Co-operation and Development",
      "url": "https://www.oecd.org/publication/pisa-2022-results/",
      "published_date": "2023-12-05",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "digital-divide-pilipinas": [
    {
      "id": "src-digital-divide-pilipinas-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000060",
      "title": "National ICT Household Survey & Connectivity Assessment",
      "author": "Department of Information and Communications Technology (DICT)",
      "publication": "DICT ICT Planning Bureau",
      "url": "https://dict.gov.ph",
      "published_date": "2023-07-22",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "ai-at-paggawa": [
    {
      "id": "src-ai-at-paggawa-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000061",
      "title": "Artificial Intelligence Roadmap for the Philippines & BPO Evolution",
      "author": "Department of Trade and Industry (DTI)",
      "publication": "DTI Board of Investments",
      "url": "https://innovate.dti.gov.ph",
      "published_date": "2023-11-08",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "disimpormasyon-at-social-media": [
    {
      "id": "src-disimpormasyon-at-social-media-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000062",
      "title": "Tracking Digital Disinformation and Algorithmic Manipulation in the Philippines",
      "author": "UP College of Mass Communication & VERA Files",
      "publication": "Philippine Journalism Review",
      "url": "https://verafiles.org",
      "published_date": "2024-02-19",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "kalusugang-pangkalahatan": [
    {
      "id": "src-kalusugang-pangkalahatan-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000070",
      "title": "Universal Health Care Act (RA 11223) Progress Report",
      "author": "Department of Health (DOH)",
      "publication": "DOH Health Policy Development and Planning Bureau",
      "url": "https://doh.gov.ph",
      "published_date": "2023-10-12",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "seguridad-sa-pagkain": [
    {
      "id": "src-seguridad-sa-pagkain-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000071",
      "title": "National Nutrition Survey: Stunting and Malnutrition in Filipino Children",
      "author": "Food and Nutrition Research Institute (DOST-FNRI)",
      "publication": "DOST Taguig",
      "url": "https://www.fnri.dost.gov.ph",
      "published_date": "2023-06-30",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "luntiang-enerhiya": [
    {
      "id": "src-luntiang-enerhiya-1",
      "subtopic_id": "10000000-0000-0000-0000-000000000072",
      "title": "Philippine Energy Plan 2023–2050: Clean Energy Scenario",
      "author": "Department of Energy (DOE)",
      "publication": "DOE Energy Policy and Planning Bureau",
      "url": "https://www.doe.gov.ph",
      "published_date": "2023-09-25",
      "order_index": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
};

/**
 * Retrieve all topics with their subtopics and counts
 */
export async function getAllTopics(): Promise<TopicCatalogItem[]> {
  try {
    const supabase = await createClient();
    const { data: topics, error } = await supabase
      .from("topics")
      .select("*, subtopics(*)")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (!error && topics && topics.length > 0) {
      return (topics as any[]).map((t) => ({
        ...t,
        subtopic_count: (t.subtopics || []).filter((s: Subtopic) => s.is_published).length,
        subtopics: (t.subtopics || []).sort((a: Subtopic, b: Subtopic) => (a.published_at || "").localeCompare(b.published_at || "")),
      }));
    }
  } catch {
    // Database connection fallback
  }

  return SEED_TOPICS;
}

/**
 * Retrieve a single topic by slug with its subtopics
 */
export async function getTopicBySlug(slug: string): Promise<TopicCatalogItem | null> {
  try {
    const supabase = await createClient();
    const { data: topic, error } = await supabase
      .from("topics")
      .select("*, subtopics(*)")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (!error && topic) {
      const t = topic as any;
      return {
        ...t,
        subtopic_count: (t.subtopics || []).filter((s: Subtopic) => s.is_published).length,
        subtopics: (t.subtopics || []).sort((a: Subtopic, b: Subtopic) => (a.published_at || "").localeCompare(b.published_at || "")),
      };
    }
  } catch {
    // Database connection fallback
  }

  const found = SEED_TOPICS.find((t) => t.slug === slug);
  return found || null;
}

/**
 * Retrieve a subtopic article by topic and subtopic slugs with sources
 */
export async function getSubtopicBySlug(
  topicSlug: string,
  subtopicSlug: string
): Promise<SubtopicWithSources | null> {
  try {
    const supabase = await createClient();
    const { data: subtopic, error } = await supabase
      .from("subtopics")
      .select("*, topic:topics(*), sources(*)")
      .eq("slug", subtopicSlug)
      .eq("is_published", true)
      .single();

    if (!error && subtopic && (subtopic as any).topic?.slug === topicSlug) {
      const s = subtopic as any;
      return {
        ...s,
        sources: (s.sources || []).sort((a: Source, b: Source) => a.order_index - b.order_index),
      };
    }
  } catch {
    // Database connection fallback
  }

  // Fallback to embedded seed
  const topic = SEED_TOPICS.find((t) => t.slug === topicSlug);
  if (!topic) return null;

  const subtopic = topic.subtopics.find((s) => s.slug === subtopicSlug);
  if (!subtopic) return null;

  const sources = SEED_SOURCES[subtopicSlug] || [];

  return {
    ...subtopic,
    topic,
    sources,
  };
}

/**
 * Retrieve previous and next adjacent subtopics in curriculum order
 */
export async function getAdjacentSubtopics(
  topicSlug: string,
  subtopicSlug: string
): Promise<{ prev: Subtopic | null; next: Subtopic | null }> {
  const topic = await getTopicBySlug(topicSlug);
  if (!topic || !topic.subtopics) {
    return { prev: null, next: null };
  }

  const currentIndex = topic.subtopics.findIndex((s) => s.slug === subtopicSlug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? topic.subtopics[currentIndex - 1] : null;
  const next = currentIndex < topic.subtopics.length - 1 ? topic.subtopics[currentIndex + 1] : null;

  return { prev, next };
}

export interface RelatedSubtopicItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  readTimeMinutes: number;
  topicSlug: string;
  topicTitle: string;
  topicColorToken: string;
  isSibling: boolean;
}

/**
 * Retrieve curated related subtopics: 2 siblings + 1 cross-thematic intersection
 */
export async function getRelatedSubtopics(
  topicSlug: string,
  subtopicSlug: string
): Promise<RelatedSubtopicItem[]> {
  const allTopics = await getAllTopics();
  const currentTopic = allTopics.find((t) => t.slug === topicSlug);

  const related: RelatedSubtopicItem[] = [];

  // 1. Pick up to 2 sibling subtopics from current topic
  if (currentTopic) {
    const siblings = currentTopic.subtopics.filter((s) => s.slug !== subtopicSlug);
    for (const sib of siblings.slice(0, 2)) {
      related.push({
        id: sib.id,
        slug: sib.slug,
        title: sib.title,
        summary: sib.summary || "",
        readTimeMinutes: sib.read_time_minutes || 5,
        topicSlug: currentTopic.slug,
        topicTitle: currentTopic.name_fil,
        topicColorToken: currentTopic.color_token,
        isSibling: true,
      });
    }
  }

  // 2. Pick 1 (or fill up to 3) cross-thematic subtopics from other topics
  const otherTopics = allTopics.filter((t) => t.slug !== topicSlug);
  for (const otherTopic of otherTopics) {
    if (related.length >= 3) break;
    const candidate = otherTopic.subtopics[0];
    if (candidate) {
      related.push({
        id: candidate.id,
        slug: candidate.slug,
        title: candidate.title,
        summary: candidate.summary || "",
        readTimeMinutes: candidate.read_time_minutes || 5,
        topicSlug: otherTopic.slug,
        topicTitle: otherTopic.name_fil,
        topicColorToken: otherTopic.color_token,
        isSibling: false,
      });
    }
  }

  return related.slice(0, 3);
}

