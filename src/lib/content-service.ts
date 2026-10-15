import { createClient } from "@/lib/supabase/server";
import { Topic, Subtopic, Source, SubtopicWithSources } from "@/types/content";

export interface TopicCatalogItem extends Topic {
  subtopic_count: number;
  subtopics: Subtopic[];
}

// Embedded Seed Data for Resilient Offline / Pre-DB Rendering
const SEED_TOPICS: TopicCatalogItem[] = [
  {
    "id": "00000000-0000-0000-0000-000000000001",
    "slug": "kapaligiran",
    "name_fil": "Kapaligiran at Krisis sa Klima",
    "name_en": "Environment and Climate Crisis",
    "description_fil": "Susing pagsusuri sa krisis pangklima, konserbasyon ng kalikasan, at pantay na pangangalaga sa likas-yaman ng kapuluan.",
    "description_en": "Critical examination of the climate crisis, biodiversity conservation, and equitable ecological stewardship.",
    "icon_name": "Leaf",
    "color_token": "--topic-kapaligiran",
    "order_index": 1,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000010",
        "topic_id": "00000000-0000-0000-0000-000000000001",
        "slug": "mga-suliraning-pangkapaligiran",
        "title": "Mga Suliraning Pangkapaligiran sa Bansa",
        "summary": "Pangkalahatang pagsipat sa polusyon sa hangin at tubig, deforestation, at pagkasira ng mga marine habitats sa kapuluan.",
        "content_markdown": "## Ang Hamon ng Kalikasan sa Arkipelago\n\nBilang isang kapuluan na mayaman sa likas na yaman at biodiversity, ang Pilipinas ay humaharap sa matitinding hamong pangkapaligiran. Ang mabilis na urbanisasyon, hindi wastong pagtatapon ng basura, at deforestation ay patuloy na nagdudulot ng pinsala sa ating mga kabundukan at karagatan.\n\n### Mga Pangunahing Suliranin\n\n1. **Deforestation at Pagkasira ng Kagubatan:** Patuloy ang pagliit ng forest cover sa bansa dulot ng illegal logging, quarrying, at commercial conversion.\n2. **Krisis sa Solid Waste Management:** Sa kabila ng RA 9003 (Ecological Solid Waste Management Act), milyun-milyong tonelada ng single-use plastics ang patuloy na napupunta sa mga ilog at Manila Bay.\n3. **Pagkasira ng Marine Ecosystems:** Ang dinamita, labis na pangingisda, at pagtatapon ng kemikal ay sumisira sa mga coral reef na nagsisilbing kanlungan ng mga isda.\n\n> \"Ang pangangalaga sa kalikasan ay hindi lamang usaping siyentipiko; ito ay usapin ng panlipunang katarungan para sa mga susunod na henerasyon ng mga Pilipino.\"\n\n### Mga Hakbang Tungo sa Solusyon\n\nKinakailangan ang mahigpit na pagpapatupad ng batas pangkalikasan sa antas ng barangay, pagsuporta sa mga indigenous forest wardens, at pananagutan ng malalaking korporasyon sa kanilang plastic footprints.",
        "read_time_minutes": 5,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000011",
        "topic_id": "00000000-0000-0000-0000-000000000001",
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
        "topic_id": "00000000-0000-0000-0000-000000000001",
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
    "id": "00000000-0000-0000-0000-000000000002",
    "slug": "ekonomiya",
    "name_fil": "Ekonomiya at Kabuhayan",
    "name_en": "Economy and Livelihood",
    "description_fil": "Pagsipat sa implasyon, karapatan ng manggagawa, agrikultura, at makatarungang pag-unlad ng kabuhayan ng bawat pamilya.",
    "description_en": "Analyzing inflation, labor rights, agrarian reform, and structural economic equity across sectors.",
    "icon_name": "TrendingUp",
    "color_token": "--topic-ekonomiya",
    "order_index": 2,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000020",
        "topic_id": "00000000-0000-0000-0000-000000000002",
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
        "topic_id": "00000000-0000-0000-0000-000000000002",
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
        "topic_id": "00000000-0000-0000-0000-000000000002",
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
  },
  {
    "id": "00000000-0000-0000-0000-000000000003",
    "slug": "pamahalaan",
    "name_fil": "Pamahalaan at Demokrasya",
    "name_en": "Politics and Governance",
    "description_fil": "Mapanuring pagtingin sa mga pampublikong institusyon, pananagutan, desentralisasyon, at pamamahalang demokratiko.",
    "description_en": "Scrutinizing public institutions, civic participation, anti-corruption safeguards, and local governance.",
    "icon_name": "Landmark",
    "color_token": "--topic-pamahalaan",
    "order_index": 3,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000030",
        "topic_id": "00000000-0000-0000-0000-000000000003",
        "slug": "demokrasya-at-partisipasyon",
        "title": "Demokrasya, Saligang Batas, at Partisipasyong Pampolitika",
        "summary": "Pagsusuri sa papel ng civil society, halalan, at mamamayan sa paghubog ng pampublikong polisiya at pananaig ng batas.",
        "content_markdown": "## Ang Kapangyarihan ng Mamamayan sa Demokrasya\n\nAng demokrasya ay hindi nagsisimula at nagtatapos sa araw ng halalan. Ayon sa 1987 Saligang Batas, ang soberanya ay nananahan sa mamamayan at lahat ng awtoridad ng pamahalaan ay nagmumula sa kanila.\n\n### Mga Paraan ng Pakikilahok\n\n1. **Malayang Halalan:** Pagpili ng mga kinatawan batay sa plataporma at pananagutan, hindi sa vote-buying o patronage politics.\n2. **Civil Society Organizations (CSOs):** Ang aktibong pakikilahok ng mga unyon, organisasyong pangkomunidad, at youth groups sa local development councils.\n3. **People's Initiative at Referendum:** Konstitusyonal na mekanismo kung saan ang mamamayan ay maaaring direktang magpanukala ng batas.\n\n> \"Ang isang buhay na demokrasya ay nangangailangan ng mulat, kritikal, at aktibong mamamayan na handang magtanong at magbantay.\"",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000031",
        "topic_id": "00000000-0000-0000-0000-000000000003",
        "slug": "korapsiyon-at-pananagutan",
        "title": "Korapsiyon, Transparensiya, at Pananagutan sa Pamahalaan",
        "summary": "Pagsisiyasat sa mga mekanismo ng auditing, open budget data, at paglaban sa sistemikong katiwalian.",
        "content_markdown": "## Pagsugpo sa Katiwalian sa Pampublikong Institusyon\n\nAng korapsiyon ay hindi lamang pagnanakaw ng pondo ng bayan; ito ay tahasang pagnanakaw sa kinabukasan ng mga kabataan, mga pasyente sa ospital, at mga magsasakang walang kalsada.\n\n### Mga Haligi ng Pananagutan\n\n* **Commission on Audit (COA):** Ang malayang komisyon na nagbabantay sa tamang paggasta ng pera ng taumbayan.\n* **Freedom of Information (FOI):** Ang pangangailangan para sa buong pagsasabatas ng FOI bill upang maging bukas ang lahat ng kontrata at transaksyon ng gobyerno.\n* **Whistleblower Protection:** Pagbibigay ng sapat na legal at pisikal na proteksyon sa mga kawaning naglalantad ng iregularidad.",
        "read_time_minutes": 7,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000032",
        "topic_id": "00000000-0000-0000-0000-000000000003",
        "slug": "desentralisasyon-at-lokal",
        "title": "Desentralisasyon, Pamamahalang Lokal, at ang Mandanas Ruling",
        "summary": "Ang epekto ng Mandanas-Garcia Supreme Court ruling sa National Tax Allotment (NTA) at pagpapalakas sa kapangyarihan ng mga LGU.",
        "content_markdown": "## Kapangyarihan sa mga Lalawigan at Komunidad\n\nSa pamamagitan ng Local Government Code ng 1991 at ng makasaysayang Mandanas-Garcia ruling ng Korte Suprema, pinalaki ang bahagi ng mga Lokal na Pamahalaan (LGUs) sa pambansang buwis (National Tax Allotment o NTA).\n\n### Mga Hamon sa Full Devolution\n\n1. **Kapasidad ng Mas Mahihirap na LGU:** Ang mga 4th hanggang 6th class municipalities ay nangangailangan ng tulong teknikal sa pagpapatupad ng mga devolved projects.\n2. **Pampulitikang Dinastiya:** Banta na ang mas malaking pondo ay mapasakamay lamang ng iilang pamilyang matagal nang nakaluklok sa kapangyarihan.\n3. **Pagpapalakas sa Barangay:** Tiyakin na ang pondo ay direktang nararamdaman ng bawat mamamayan sa antas ng komunidad.",
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
    "id": "00000000-0000-0000-0000-000000000004",
    "slug": "karapatang-pantao",
    "name_fil": "Karapatang Pantao at Katarungan",
    "name_en": "Human Rights and Social Justice",
    "description_fil": "Pagtataguyod sa karapatang pantao, katarungang panlipunan, kalayaang sibil, at dignidad ng bawat sektor.",
    "description_en": "Defending fundamental freedoms, restorative justice, indigenous rights, and human dignity.",
    "icon_name": "Scale",
    "color_token": "--topic-karapatan",
    "order_index": 4,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000040",
        "topic_id": "00000000-0000-0000-0000-000000000004",
        "slug": "batayang-karapatan",
        "title": "Mga Batayang Karapatang Pantao at ang Katipunan ng mga Karapatan",
        "summary": "Pagsusuri sa Bill of Rights (Artikulo III ng 1987 Konstitusyon) at proteksyon sa buhay, kalayaan, at angkop na proseso ng batas.",
        "content_markdown": "## Ang Katipunan ng mga Karapatan (Bill of Rights)\n\nAng Artikulo III ng 1987 Saligang Batas ang pananggalang ng karaniwang mamamayan laban sa labis na kapangyarihan ng estado. Itinatakda nito na walang sinumang aalisan ng buhay, kalayaan, o ari-arian nang walang angkop na proseso ng batas (due process of law).\n\n### Mga Pangunahing Proteksyon\n\n1. **Due Process at Equal Protection:** Ang batas ay dapat ipatupad nang pantay sa mayaman at mahirap.\n2. **Proteksyon Laban sa Di-makatwirang Paghahalughog:** Karapatang maging ligtas sa sariling tahanan nang walang legal na search warrant mula sa hukuman.\n3. **Presumption of Innocence:** Lahat ng akusado ay itinuturing na inosente hangga't hindi napatutunayang nagkasala sa harap ng hukuman.",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000041",
        "topic_id": "00000000-0000-0000-0000-000000000004",
        "slug": "katarungan-at-katutubo",
        "title": "Katarungang Panlipunan at Karapatan ng mga Katutubong Pamayanan",
        "summary": "Pagkilala sa ancestral domain, Indigenous Peoples' Rights Act (IPRA), at proteksyon sa kultura at lupaing ninuno.",
        "content_markdown": "## Ang Laban para sa Lupaing Ninuno\n\nAng mga Katutubong Pilipino ang orihinal na tagapagtanggol ng ating mga kagubatan at kabundukan. Sa ilalim ng Republic Act No. 8371 o Indigenous Peoples' Rights Act (IPRA) ng 1997, kinikilala ang kanilang karapatan sa Ancestral Domains at Self-Determination.\n\n### Mga Isyu sa Pagpapatupad\n\n* **Free, Prior and Informed Consent (FPIC):** Madalas na namamanipula o nalalagpasan ang FPIC ng mga dambuhalang proyektong pagmimina at dam.\n* **Red-tagging at Karahasan:** Ang mga katutubong pinuno na nagtatanggol sa kanilang lupa ay madalas humarap sa harassment at banta sa buhay.\n\n> \"Ang lupa ay buhay. Para sa mga katutubo, ang pag-agaw sa kanilang lupaing ninuno ay katumbas ng pagbura sa kanilang pagkakakilanlan.\"",
        "read_time_minutes": 7,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000042",
        "topic_id": "00000000-0000-0000-0000-000000000004",
        "slug": "kalayaan-sa-pagpapahayag",
        "title": "Kalayaan sa Pagpapahayag at Responsableng Pamamahayag",
        "summary": "Ang mahalagang papel ng malayang pamamahayag, kaligtasan ng mga mamamahayag, at paglaban sa censorship.",
        "content_markdown": "## Malayang Pamamahayag Bilang Haligi ng Katotohanan\n\nAng kalayaan sa pananalita, pagpapahayag, at mapayapang pagtitipon ay pundasyon ng alinmang malusog na lipunan. Kung walang malayang mamamahayag na nag-uulat ng katotohanan nang walang takot, ang kapangyarihan ay madaling abusuhin.\n\n### Mga Hamon sa Pamamahayag\n\n1. **Impunity at Pagpatay sa mga Mamamahayag:** Ang Pilipinas ay nananatiling isa sa mga mapanganib na bansa para sa mga community journalists.\n2. **Weaponization ng Cyberlibel:** Paggamit ng cyberlibel laws upang patahimikin ang mga kritiko at investigative reporters.\n3. **Economic Pressures:** Mababang pasahod at kawalan ng insurance para sa mga provincial correspondents.",
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
    "id": "00000000-0000-0000-0000-000000000005",
    "slug": "edukasyon",
    "name_fil": "Edukasyon at Pagkatuto",
    "name_en": "Education and Learning",
    "description_fil": "Pagsusuri sa kalidad, kakayahan, at pantay na oportunidad sa edukasyon ng kabataang Pilipino sa harap ng mga pandaigdigang pagsubok.",
    "description_en": "Evaluating literacy, curriculum transformation, public school resources, and equitable learning access.",
    "icon_name": "GraduationCap",
    "color_token": "--topic-edukasyon",
    "order_index": 5,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000001",
        "topic_id": "00000000-0000-0000-0000-000000000005",
        "slug": "krisis-sa-edukasyon",
        "title": "Krisis sa Edukasyon at Pagkatuto sa Pilipinas",
        "summary": "Isang malalimang pagsusuri sa estado ng pangunahing edukasyon, kakulangan sa mga silid-aralan, at mga kinakailangang reporma.",
        "content_markdown": "## Ang Kasalukuyang Estado ng Edukasyon\n\nHumaharap ang bansa sa tinatawag ng World Bank na \"learning poverty\" kung saan malaking bahagi ng 10-taong gulang na mga bata ay hindi makabasa o makaunawa ng simpleng teksto.\n\n### Mga Sanhi ng Krisis\n\n1. **Kakapusan sa Silid-aralan:** Backlog na mahigit 150,000 classrooms sa buong bansa, na nagiging sanhi ng siksikang mga klase (hanggang 60 mag-aaral bawat silid).\n2. **Administrative Burden ng mga Guro:** Ang labis na non-teaching tasks ay nagbabawas sa oras ng guro para sa aktuwal na pagtuturo at remedial reading.\n3. **Kakulangan sa Learning Materials:** Pagkaantala sa pamamahagi ng mga aklat-aralin at Science kits sa mga pampublikong paaralan.",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000002",
        "topic_id": "00000000-0000-0000-0000-000000000005",
        "slug": "aksesibilidad-sa-edukasyon",
        "title": "Aksesibilidad at Pagkakapantay-pantay sa Last Mile Schools",
        "summary": "Pagsusuri sa kalagayan ng mga mag-aaral at guro sa malalayong isla, kabundukan, at mga komunidad na walang kuryente.",
        "content_markdown": "## Edukasyon para sa mga Nasa Laylayan\n\nAng \"Last Mile Schools\" ay tumutukoy sa mga pampublikong paaralan na matatagpuan sa mga liblib na komunidad, malalayong isla, o kabundukan na madalas walang kuryente, tubig, at kalsada.\n\n### Ang Hamon sa Bawat Araw\n\n* **Mahabang Paglalakad:** Mga mag-aaral na tumatawid ng mga ilog at naglalakad nang 2 hanggang 3 oras makarating lamang sa eskwelahan.\n* **Kakulangan sa Pasilidad:** Kakulangan ng digital connectivity at science laboratories na nagdudulot ng malaking agwat sa pagitan ng mag-aaral sa lungsod at kanayunan.\n* **Dedikasyon ng mga Guro:** Mga guro na gumagastos mula sa sariling bulsa upang magdala ng modyul at pagkain para sa mga bata.",
        "read_time_minutes": 5,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000009",
        "topic_id": "00000000-0000-0000-0000-000000000005",
        "slug": "krisis-sa-literasiya-at-pisa-results",
        "title": "Ang Krisis sa Literasiya at ang Resulta ng PISA sa Pilipinas",
        "summary": "Pagsusuri sa mababang ranggo ng mga mag-aaral na Pilipino sa Programme for International Student Assessment (PISA) at mga hakbang pasulong.",
        "content_markdown": "## Pagsusuri sa Resulta ng PISA 2022\n\nSa pinakahuling resulta ng Programme for International Student Assessment (PISA) na isinagawa ng OECD, muling lumabas na ang mga mag-aaral na Pilipinong may edad 15 ay kabilang sa pinakamababang marka sa Pagbasa, Matematika, at Agham sa buong mundo.\n\n### Mga Mahahalagang Aral mula sa PISA\n\n1. **Socio-Economic Disadvantage:** Mahigit 80% ng pagkakaiba sa marka ay may kaugnayan sa katayuang pinansyal ng pamilya at kakulangan sa nutrisyon sa murang edad.\n2. **Mother Tongue at Language Policy:** Ang hamon ng paglipat mula sa kinagisnang wika patungo sa Ingles sa pagsusulit sa agham at matematika.\n3. **Kritikal na Pag-iisip:** Ang pangangailangan na lumipat mula sa memorization patungo sa problem-solving at reading comprehension.\n\n> \"Hindi natin masusolusyunan ang krisis sa pagkatuto kung hindi natin sasabayan ng solusyon sa kahirapan, gutom, at kalusugan ng bawat pamilyang Pilipino.\"",
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
    "id": "00000000-0000-0000-0000-000000000006",
    "slug": "teknolohiya",
    "name_fil": "Teknolohiya at Lipunan",
    "name_en": "Technology and Society",
    "description_fil": "Epekto ng artificial intelligence, digital divide, social media, cybersecurity, at digital literacy sa mamamayan.",
    "description_en": "Investigating the digital divide, algorithmic transparency, disinformation campaigns, and artificial intelligence in labor.",
    "icon_name": "Cpu",
    "color_token": "--topic-teknolohiya",
    "order_index": 6,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000060",
        "topic_id": "00000000-0000-0000-0000-000000000006",
        "slug": "digital-divide-pilipinas",
        "title": "Digital Divide at Internet Connectivity sa mga Rehiyon",
        "summary": "Pagsipat sa agwat ng digital infrastructure sa pagitan ng mga siyudad at probinsya, at ang karapatan sa mabilis at abot-kayang internet.",
        "content_markdown": "## Ang Agwat sa Mundo ng Digital\n\nSa makabagong panahon, ang access sa mabilis at abot-kayang internet ay hindi na luho kundi batayang pangangailangan para sa edukasyon, trabaho, at serbisyo publiko.\n\n### Ang Realidad sa Pilipinas\n\n* **Mataas na Gastos, Mababang Bilis:** Ang Pilipinas ay nananatiling isa sa may pinakamahal na broadband costs kaugnay sa purchasing power ng mamamayan.\n* **Geographical Inequity:** Malalaking siyudad lamang ang may fiber connectivity habang maraming baryo ang umaasa pa rin sa mahinang cellular signals.\n* **National Broadband Program:** Ang pangangailangan na pabilisin ang rollout ng DICT sa mga libreng Wi-Fi sites sa mga pampublikong plaza at paaralan.",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000061",
        "topic_id": "00000000-0000-0000-0000-000000000006",
        "slug": "ai-at-paggawa",
        "title": "Artificial Intelligence at ang Hinaharap ng Trabaho at BPO sa Bansa",
        "summary": "Pagsusuri sa epekto ng generative AI sa sektor ng Business Process Outsourcing (BPO), upskilling, at mga manggagawa sa kaalaman.",
        "content_markdown": "## AI sa Sentro ng Industriya ng Paggawa\n\nAng sektor ng IT-BPO ay nag-aambag ng bilyun-bilyong dolyar taon-taon sa ekonomiya ng Pilipinas at nagbibigay ng trabaho sa mahigit 1.5 milyong manggagawa. Sa mabilis na pag-usbong ng Generative AI at automated customer agents, humaharap ang bansa sa malaking transisyon.\n\n### Mga Hakbang para sa Proteksyon ng Manggagawa\n\n1. **Upskilling tungo sa Mas Mataas na Halaga:** Paglipat mula sa basic voice calls patungo sa data analytics, AI supervision, healthcare services, at software management.\n2. **Etikal na Pamantayan sa AI:** Pagtiyak na ang paggamit ng AI sa opisina ay makatao at may proteksyon laban sa biglaang tanggalan.\n3. **Pakikipagtulungan sa Academe:** Pag-aangkop ng kurikulum sa kolehiyo upang ihanda ang mga mag-aaral sa pakikipagtulungan sa AI tools.",
        "read_time_minutes": 7,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000062",
        "topic_id": "00000000-0000-0000-0000-000000000006",
        "slug": "disimpormasyon-at-social-media",
        "title": "Disimpormasyon, Fake News, at Media and Information Literacy",
        "summary": "Ang pananalasa ng fake news, troll farms, at ang kahalagahan ng fact-checking at kritikal na pag-iisip sa digital age.",
        "content_markdown": "## Ang Laban para sa Katotohanan sa Social Media\n\nAng Pilipinas ay kilala bilang \"social media capital of the world\". Subalit ang kasangkapang ito na nag-uugnay sa mga pamilya ay naging daluyan din ng coordinated inauthentic behavior, historical distortion, at pekeng balita.\n\n### Paano Kumikilos ang Disimpormasyon\n\n* **Echo Chambers at Algorithms:** Pabor ang mga social media algorithms sa mga nakakagalit o sensasyonal na nilalaman na humahati sa opinyon ng publiko.\n* **Troll Farms at Clickbait:** Organisadong mga grupo na binabayaran upang manipulahin ang pampublikong diskurso.\n* **Media Literacy sa Silid-Aralan:** Pagtuturo sa kabataan kung paano kumilatis ng lehitimong balita, mag-cross reference ng sanggunian, at kilalanin ang cognitive bias.",
        "read_time_minutes": 7,
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
    "slug": "kalusugan",
    "name_fil": "Kalusugan at Likas-kayang Pag-unlad",
    "name_en": "Health and Sustainable Development",
    "description_fil": "Pagtutugma ng pangkalahatang kalusugan ng pamayanan, nutrisyon, at pambansang healthcare system tungo sa makataong lipunan.",
    "description_en": "Balancing universal healthcare, public health resilience, nutrition, and environmental sustainability.",
    "icon_name": "HeartPulse",
    "color_token": "--topic-kalusugan",
    "order_index": 7,
    "is_published": true,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "subtopic_count": 3,
    "subtopics": [
      {
        "id": "10000000-0000-0000-0000-000000000070",
        "topic_id": "00000000-0000-0000-0000-000000000007",
        "slug": "kalusugang-pangkalahatan",
        "title": "Kalusugang Pangkalahatan at ang Universal Health Care Act",
        "summary": "Pagsusuri sa pagpapatupad ng UHC Act (RA 11223), PhilHealth coverage, at accessibility ng gamot at duktor sa mga baryo.",
        "content_markdown": "## Kalusugan Bilang Pangunahing Karapatan\n\nAng Republic Act No. 11223 o Universal Health Care (UHC) Act ay nilagdaan upang tiyakin na bawat Pilipino ay may proteksyon sa pinansyal na panganib dulot ng pagkakasakit at may access sa de-kalidad na serbisyong medikal.\n\n### Mga Hamon sa Pagpapatupad\n\n1. **Out-of-Pocket Expenses:** Nananatiling mataas ang binabayaran ng pamilya mula sa sariling bulsa para sa gamot at laboratory tests.\n2. **Kakapusan sa mga Duktor sa Baryo:** Maraming municipal health centers ang walang permanenteng doktor o sapat na supply ng life-saving medicines.\n3. **Pangangalaga sa Primary Care:** Pagpapalakas sa Barangay Health Stations (BHS) bilang unang pananggalang bago pumunta sa malalaking ospital.",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000071",
        "topic_id": "00000000-0000-0000-0000-000000000007",
        "slug": "seguridad-sa-pagkain",
        "title": "Malnutrisyon, Pagkabansot, at Seguridad sa Nutrisyon ng Kabataan",
        "summary": "Pagsusuri sa childhood stunting, First 1,000 Days Law, at epekto ng kakulangan sa masustansyang pagkain sa talino ng bata.",
        "content_markdown": "## Ang Tahimik na Krisis ng Malnutrisyon\n\nAyon sa Food and Nutrition Research Institute (FNRI), halos isa sa bawat tatlong batang Pilipinong may edad 5 pababa ay bansot (stunted). Ang stunting ay hindi lamang usapin ng tangkad; ito ay permanenteng pinsala sa pag-unlad ng utak.\n\n### Ang Kritikal na First 1,000 Days\n\n* **Kalusugan ng Ina:** Sapat na nutrisyon habang nagdadalang-tao upang maiwasan ang low birth weight sa mga sanggol.\n* **Eksklusibong Pagpapasuso:** Pagpapalakas sa suporta sa exclusive breastfeeding sa unang 6 na buwan.\n* **School Feeding Programs:** Palakihin ang saklaw ng DepEd at DSWD feeding programs gamit ang sariwang ani mula sa mga lokal na magsasaka.",
        "read_time_minutes": 6,
        "is_published": true,
        "published_at": "2026-03-01T00:00:00Z",
        "created_at": "2026-03-01T00:00:00Z",
        "updated_at": "2026-03-01T00:00:00Z",
        "search_vector": null
      },
      {
        "id": "10000000-0000-0000-0000-000000000072",
        "topic_id": "00000000-0000-0000-0000-000000000007",
        "slug": "luntiang-enerhiya",
        "title": "Luntiang Enerhiya, Malinis na Hangin, at Pangmatagalang Kalusugan",
        "summary": "Ang ugnayan ng kalidad ng hangin sa pampublikong kalusugan, renewable energy, at likas-kayang pag-unlad sa mga komunidad.",
        "content_markdown": "## Malinis na Hangin at Likas-kayang Enerhiya\n\nAng polusyon sa hangin dulot ng fossil fuels at lumang transportasyon ay nagdudulot ng libu-libong maagang pagkamatay taon-taon dahil sa sakit sa puso, baga, at hika.\n\n### Ang Solusyon sa Malinis na Enerhiya\n\n1. **Transisyon sa Solar at Geothermal:** Paggamit sa natural na yaman ng Pilipinas bilang lider sa geothermal energy sa Asya.\n2. **Modernisasyon ng Pampublikong Transportasyon:** Paglipat sa mga electric jeepneys at pagtatayo ng ligtas na protected bike lanes sa mga kalunsuran.\n3. **Pangangalaga sa Kalidad ng Hangin:** Mahigpit na monitoring sa emissions ng mga pabrika at power plants alinsunod sa Clean Air Act.",
        "read_time_minutes": 6,
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

