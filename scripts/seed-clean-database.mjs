import fs from "fs";

// Load .env.local
const envFile = fs.readFileSync(".env.local", "utf8");
const env = {};
envFile.split("\n").forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

// -----------------------------------------------------------------------------
// 7 CANONICAL THEMES / TOPICS (Pangkalahatan / Paksa)
// -----------------------------------------------------------------------------
export const CLEAN_TOPICS = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "kapaligiran",
    name_fil: "Kapaligiran at Krisis sa Klima",
    name_en: "Environment and Climate Crisis",
    description_fil: "Susing pagsusuri sa krisis pangklima, konserbasyon ng kalikasan, at pantay na pangangalaga sa likas-yaman ng kapuluan.",
    description_en: "Critical examination of the climate crisis, biodiversity conservation, and equitable ecological stewardship.",
    icon_name: "Leaf",
    color_token: "--topic-kapaligiran",
    order_index: 1,
    is_published: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "ekonomiya",
    name_fil: "Ekonomiya at Kabuhayan",
    name_en: "Economy and Livelihood",
    description_fil: "Pagsipat sa implasyon, karapatan ng manggagawa, agrikultura, at makatarungang pag-unlad ng kabuhayan ng bawat pamilya.",
    description_en: "Analyzing inflation, labor rights, agrarian reform, and structural economic equity across sectors.",
    icon_name: "TrendingUp",
    color_token: "--topic-ekonomiya",
    order_index: 2,
    is_published: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "pamahalaan",
    name_fil: "Pamahalaan at Demokrasya",
    name_en: "Politics and Governance",
    description_fil: "Mapanuring pagtingin sa mga pampublikong institusyon, pananagutan, desentralisasyon, at pamamahalang demokratiko.",
    description_en: "Scrutinizing public institutions, civic participation, anti-corruption safeguards, and local governance.",
    icon_name: "Landmark",
    color_token: "--topic-pamahalaan",
    order_index: 3,
    is_published: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    slug: "karapatang-pantao",
    name_fil: "Karapatang Pantao at Katarungan",
    name_en: "Human Rights and Social Justice",
    description_fil: "Pagtataguyod sa karapatang pantao, katarungang panlipunan, kalayaang sibil, at dignidad ng bawat sektor.",
    description_en: "Defending fundamental freedoms, restorative justice, indigenous rights, and human dignity.",
    icon_name: "Scale",
    color_token: "--topic-karapatan",
    order_index: 4,
    is_published: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    slug: "edukasyon",
    name_fil: "Edukasyon at Pagkatuto",
    name_en: "Education and Learning",
    description_fil: "Pagsusuri sa kalidad, kakayahan, at pantay na oportunidad sa edukasyon ng kabataang Pilipino sa harap ng mga pandaigdigang pagsubok.",
    description_en: "Evaluating literacy, curriculum transformation, public school resources, and equitable learning access.",
    icon_name: "GraduationCap",
    color_token: "--topic-edukasyon",
    order_index: 5,
    is_published: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    slug: "teknolohiya",
    name_fil: "Teknolohiya at Lipunan",
    name_en: "Technology and Society",
    description_fil: "Epekto ng artificial intelligence, digital divide, social media, cybersecurity, at digital literacy sa mamamayan.",
    description_en: "Investigating the digital divide, algorithmic transparency, disinformation campaigns, and artificial intelligence in labor.",
    icon_name: "Cpu",
    color_token: "--topic-teknolohiya",
    order_index: 6,
    is_published: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000007",
    slug: "kalusugan",
    name_fil: "Kalusugan at Likas-kayang Pag-unlad",
    name_en: "Health and Sustainable Development",
    description_fil: "Pagtutugma ng pangkalahatang kalusugan ng pamayanan, nutrisyon, at pambansang healthcare system tungo sa makataong lipunan.",
    description_en: "Balancing universal healthcare, public health resilience, nutrition, and environmental sustainability.",
    icon_name: "HeartPulse",
    color_token: "--topic-kalusugan",
    order_index: 7,
    is_published: true,
  },
];

// -----------------------------------------------------------------------------
// 21 CANONICAL ARALIN / SUBTOPICS (3 Aralin bawat Paksa)
// -----------------------------------------------------------------------------
export const CLEAN_SUBTOPICS = [
  // 01 KAPALIGIRAN
  {
    id: "10000000-0000-0000-0000-000000000010",
    topic_id: "00000000-0000-0000-0000-000000000001",
    slug: "mga-suliraning-pangkapaligiran",
    title: "Mga Suliraning Pangkapaligiran sa Bansa",
    summary: "Pangkalahatang pagsipat sa polusyon sa hangin at tubig, deforestation, at pagkasira ng mga marine habitats sa kapuluan.",
    content_markdown: `## Ang Hamon ng Kalikasan sa Arkipelago

Bilang isang kapuluan na mayaman sa likas na yaman at biodiversity, ang Pilipinas ay humaharap sa matitinding hamong pangkapaligiran. Ang mabilis na urbanisasyon, hindi wastong pagtatapon ng basura, at deforestation ay patuloy na nagdudulot ng pinsala sa ating mga kabundukan at karagatan.

### Mga Pangunahing Suliranin

1. **Deforestation at Pagkasira ng Kagubatan:** Patuloy ang pagliit ng forest cover sa bansa dulot ng illegal logging, quarrying, at commercial conversion.
2. **Krisis sa Solid Waste Management:** Sa kabila ng RA 9003 (Ecological Solid Waste Management Act), milyun-milyong tonelada ng single-use plastics ang patuloy na napupunta sa mga ilog at Manila Bay.
3. **Pagkasira ng Marine Ecosystems:** Ang dinamita, labis na pangingisda, at pagtatapon ng kemikal ay sumisira sa mga coral reef na nagsisilbing kanlungan ng mga isda.

> "Ang pangangalaga sa kalikasan ay hindi lamang usaping siyentipiko; ito ay usapin ng panlipunang katarungan para sa mga susunod na henerasyon ng mga Pilipino."

### Mga Hakbang Tungo sa Solusyon

Kinakailangan ang mahigpit na pagpapatupad ng batas pangkalikasan sa antas ng barangay, pagsuporta sa mga indigenous forest wardens, at pananagutan ng malalaking korporasyon sa kanilang plastic footprints.`,
    read_time_minutes: 5,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000011",
    topic_id: "00000000-0000-0000-0000-000000000001",
    slug: "climate-change-sa-pilipinas",
    title: "Climate Change sa Pilipinas: Vulnerabilities, Impacts, and Ecological Justice",
    summary: "Susing pagsusuri sa krisis pangklima, pagtaas ng antas ng dagat, at ang kagyat na pangangailangan para sa hustisyang pangklima.",
    content_markdown: `## Ang Pilipinas sa Mata ng Bagyo

Ang kapuluan ng Pilipinas ay kabilang sa mga pinakabulnerableng bansa sa daigdig pagdating sa epekto ng climate change. Bagama't mababa sa 0.5% ang ambag ng bansa sa pandaigdigang greenhouse gas emissions, tayo ang isa sa mga labis na nagdurusa sa lumalakas na mga super typhoon, matagalang tagtuyot dulot ng El Niño, at pagtaas ng antas ng dagat.

### Mga Pangunahing Datos at Katotohanan

> **TALA NG DATOS: ANTAS NG DAGAT**  
> **3x** Pandaigdigang Karaniwang Bilis ng Pagtaas ng Dagat  
> Ayon sa PAGASA at Climate Change Commission, ang pagtaas ng karagatan sa ilang bahagi ng Pilipinas ay triple kaysa sa pandaigdigang average dahil sa subsidence at ocean thermal expansion.

### Epekto sa Agrikultura at Pangingisda

* **Mababang Ani:** Ang hindi mahulaang pattern ng tag-ulan ay nagdudulot ng malawakang pagkalugi sa mga magsasaka ng palay at mais sa Luzon at Mindanao.
* **Fish Kills at Coral Bleaching:** Ang pag-init ng temperatura ng tubig ay nagdudulot ng mass bleaching sa mga bahura, na direktang nagpapaliit sa huli ng mga municipal fisherfolk.

> "Climate justice requires high-emitting industrialized economies to honor their loss and damage commitments to frontline archipelagic communities."`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000012",
    topic_id: "00000000-0000-0000-0000-000000000001",
    slug: "mga-hakbang-tungo-sa-sustainability",
    title: "Mga Hakbang Tungo sa Sustainability at Likas-kayang Kaunlaran",
    summary: "Pagsusuri sa Renewable Energy Act, community-led reforestation, at mga polisiya para sa climate adaptation sa Pilipinas.",
    content_markdown: `## Pagpapatupad ng Likas-kayang Kaunlaran

Hindi sapat ang reaktibong pagtugon kapag may dumarating na kalamidad. Ang tunay na katatagan o resilience ay nakaugat sa pangmatagalang polisiya at community-based disaster risk reduction and management (CBDRRM).

### Mga Estratehikong Haligi

1. **Renewable Energy Transition:** Pagpapabilis sa paglipat mula sa coal-fired plants patungo sa solar, wind, at geothermal energy alinsunod sa Renewable Energy Act ng 2008.
2. **Proteksyon sa Mangrove Buffers:** Ang pagtatanim ng bakawan sa mga baybayin ay nagpapatunay na pinakamabisang natural na pananggalang laban sa storm surges.
3. **Lokal na Pagsasanay:** Pagbibigay ng sapat na pondo at kagamitan sa mga Local Disaster Risk Reduction Management Offices (LDRRMOs) sa halip na umasa lamang sa pambansang pondo.`,
    read_time_minutes: 6,
    is_published: true,
  },

  // 02 EKONOMIYA
  {
    id: "10000000-0000-0000-0000-000000000020",
    topic_id: "00000000-0000-0000-0000-000000000002",
    slug: "implasyon-at-presyo",
    title: "Implasyon at Presyo ng mga Pangunahing Bilihin",
    summary: "Pagsusuri sa mga sanhi ng pagtaas ng presyo ng pagkain at enerhiya, at epekto nito sa kapangyarihang bumili ng mga karaniwang pamilya.",
    content_markdown: `## Ang Hamon ng Implasyon sa Araw-araw na Pamumuhay

Ang implasyon ay tumutukoy sa pangkalahatang pagtaas ng presyo ng mga bilihin at serbisyo sa paglipas ng panahon. Para sa karaniwang pamilyang Pilipino, ang implasyon sa pagkain (tulad ng bigas, sibuyas, at karne) at langis ang may pinakamabigat na epekto sa badyet ng tahanan.

### Mga Salik sa Pagtaas ng Presyo

1. **Supply-Side Bottlenecks:** Kakulangan sa lokal na produksyon at mga kalamidad na sumisira sa pananim.
2. **Pandaigdigang Presyo ng Krudo:** Ang pagiging import-dependent ng Pilipinas sa langis ay nagdudulot ng mataas na gastos sa transportasyon at kuryente.
3. **Papel ng mga Middlemen:** Malaking agwat sa pagitan ng farmgate price na binabayad sa magsasaka at retail price sa palengke.

> "Kapag tumaas ang presyo ng bigas nang 10%, ang pinakamahihirap na sektor ang unang napipilitang magbawas ng pagkain sa kanilang hapag-kainan."`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000021",
    topic_id: "00000000-0000-0000-0000-000000000002",
    slug: "kalagayan-ng-manggagawa",
    title: "Kalagayan ng mga Manggagawa, Pasahod, at Karapatan sa Paggawa",
    summary: "Pagsipat sa kontraktuwalisasyon, agwat ng minimum wage at living wage, at proteksyon sa impormal na sektor.",
    content_markdown: `## Dignidad sa Paggawa at Karampatang Sahod

Ang mga manggagawang Pilipino ang gulugod ng ekonomiya. Subalit patuloy silang humaharap sa mga hamon tulad ng kawalan ng katiyakan sa trabaho (endo/kontraktuwalisasyon) at pasahod na hindi sumasapat sa family living wage.

### Kasalukuyang Realidad

* **Regional Wage Disparities:** Malaki ang agwat ng minimum wage sa Kalakhang Maynila kumpara sa mga rehiyon, sa kabila ng magkatulad na presyo ng mga pangunahing bilihin.
* **Impormal na Sektor:** Mahigit 40% ng lakas-paggawa ay nasa informal economy (mga vendor, delivery rider, domestic worker) na walang sapat na social protection tulad ng SSS, PhilHealth, at Pag-IBIG.

> "Ang disenteng trabaho ay hindi pribilehiyo kundi batayang karapatang pantao na ginagarantiyahan ng Saligang Batas."`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000022",
    topic_id: "00000000-0000-0000-0000-000000000002",
    slug: "agrikultura-at-repormang-agraryo",
    title: "Agrikultura, Seguridad sa Pagkain, at Repormang Agraryo",
    summary: "Pagsusuri sa kalagayan ng mga magsasaka, land conversion, modernisasyon, at subsidiya sa sektor ng agrikultura.",
    content_markdown: `## Ang Banta sa Agrikultura at Seguridad sa Pagkain

Sa kabila ng pagiging bansang agrikultural, ang sektor ng pagsasaka sa Pilipinas ay nananatiling isa sa may pinakamataas na antas ng kahirapan. Ang pagtanda ng populasyon ng mga magsasaka (average age: 53 taong gulang) at kakulangan sa makabagong kagamitan ay nagbabanta sa seguridad ng pagkain ng bansa.

### Mga Kritikal na Isyu

1. **Repormang Agraryo:** Maraming magsasaka ang nabigyan ng Certificate of Land Ownership Award (CLOA) ngunit salat sa suportang serbisyo tulad ng irigasyon, pautang, at post-harvest facilities.
2. **Import Dependency:** Ang labis na pag-asa sa imported na bigas at asuk ay nagpapabagsak sa kita ng lokal na produksyon.
3. **Land Conversion:** Pagpapalit-gamit ng matatabang lupang pansakahan patungo sa commercial subdivisions at industrial parks.`,
    read_time_minutes: 7,
    is_published: true,
  },

  // 03 PAMAHALAAN
  {
    id: "10000000-0000-0000-0000-000000000030",
    topic_id: "00000000-0000-0000-0000-000000000003",
    slug: "demokrasya-at-partisipasyon",
    title: "Demokrasya, Saligang Batas, at Partisipasyong Pampolitika",
    summary: "Pagsusuri sa papel ng civil society, halalan, at mamamayan sa paghubog ng pampublikong polisiya at pananaig ng batas.",
    content_markdown: `## Ang Kapangyarihan ng Mamamayan sa Demokrasya

Ang demokrasya ay hindi nagsisimula at nagtatapos sa araw ng halalan. Ayon sa 1987 Saligang Batas, ang soberanya ay nananahan sa mamamayan at lahat ng awtoridad ng pamahalaan ay nagmumula sa kanila.

### Mga Paraan ng Pakikilahok

1. **Malayang Halalan:** Pagpili ng mga kinatawan batay sa plataporma at pananagutan, hindi sa vote-buying o patronage politics.
2. **Civil Society Organizations (CSOs):** Ang aktibong pakikilahok ng mga unyon, organisasyong pangkomunidad, at youth groups sa local development councils.
3. **People's Initiative at Referendum:** Konstitusyonal na mekanismo kung saan ang mamamayan ay maaaring direktang magpanukala ng batas.

> "Ang isang buhay na demokrasya ay nangangailangan ng mulat, kritikal, at aktibong mamamayan na handang magtanong at magbantay."`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000031",
    topic_id: "00000000-0000-0000-0000-000000000003",
    slug: "korapsiyon-at-pananagutan",
    title: "Korapsiyon, Transparensiya, at Pananagutan sa Pamahalaan",
    summary: "Pagsisiyasat sa mga mekanismo ng auditing, open budget data, at paglaban sa sistemikong katiwalian.",
    content_markdown: `## Pagsugpo sa Katiwalian sa Pampublikong Institusyon

Ang korapsiyon ay hindi lamang pagnanakaw ng pondo ng bayan; ito ay tahasang pagnanakaw sa kinabukasan ng mga kabataan, mga pasyente sa ospital, at mga magsasakang walang kalsada.

### Mga Haligi ng Pananagutan

* **Commission on Audit (COA):** Ang malayang komisyon na nagbabantay sa tamang paggasta ng pera ng taumbayan.
* **Freedom of Information (FOI):** Ang pangangailangan para sa buong pagsasabatas ng FOI bill upang maging bukas ang lahat ng kontrata at transaksyon ng gobyerno.
* **Whistleblower Protection:** Pagbibigay ng sapat na legal at pisikal na proteksyon sa mga kawaning naglalantad ng iregularidad.`,
    read_time_minutes: 7,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000032",
    topic_id: "00000000-0000-0000-0000-000000000003",
    slug: "desentralisasyon-at-lokal",
    title: "Desentralisasyon, Pamamahalang Lokal, at ang Mandanas Ruling",
    summary: "Ang epekto ng Mandanas-Garcia Supreme Court ruling sa National Tax Allotment (NTA) at pagpapalakas sa kapangyarihan ng mga LGU.",
    content_markdown: `## Kapangyarihan sa mga Lalawigan at Komunidad

Sa pamamagitan ng Local Government Code ng 1991 at ng makasaysayang Mandanas-Garcia ruling ng Korte Suprema, pinalaki ang bahagi ng mga Lokal na Pamahalaan (LGUs) sa pambansang buwis (National Tax Allotment o NTA).

### Mga Hamon sa Full Devolution

1. **Kapasidad ng Mas Mahihirap na LGU:** Ang mga 4th hanggang 6th class municipalities ay nangangailangan ng tulong teknikal sa pagpapatupad ng mga devolved projects.
2. **Pampulitikang Dinastiya:** Banta na ang mas malaking pondo ay mapasakamay lamang ng iilang pamilyang matagal nang nakaluklok sa kapangyarihan.
3. **Pagpapalakas sa Barangay:** Tiyakin na ang pondo ay direktang nararamdaman ng bawat mamamayan sa antas ng komunidad.`,
    read_time_minutes: 5,
    is_published: true,
  },

  // 04 KARAPATANG PANTAO
  {
    id: "10000000-0000-0000-0000-000000000040",
    topic_id: "00000000-0000-0000-0000-000000000004",
    slug: "batayang-karapatan",
    title: "Mga Batayang Karapatang Pantao at ang Katipunan ng mga Karapatan",
    summary: "Pagsusuri sa Bill of Rights (Artikulo III ng 1987 Konstitusyon) at proteksyon sa buhay, kalayaan, at angkop na proseso ng batas.",
    content_markdown: `## Ang Katipunan ng mga Karapatan (Bill of Rights)

Ang Artikulo III ng 1987 Saligang Batas ang pananggalang ng karaniwang mamamayan laban sa labis na kapangyarihan ng estado. Itinatakda nito na walang sinumang aalisan ng buhay, kalayaan, o ari-arian nang walang angkop na proseso ng batas (due process of law).

### Mga Pangunahing Proteksyon

1. **Due Process at Equal Protection:** Ang batas ay dapat ipatupad nang pantay sa mayaman at mahirap.
2. **Proteksyon Laban sa Di-makatwirang Paghahalughog:** Karapatang maging ligtas sa sariling tahanan nang walang legal na search warrant mula sa hukuman.
3. **Presumption of Innocence:** Lahat ng akusado ay itinuturing na inosente hangga't hindi napatutunayang nagkasala sa harap ng hukuman.`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000041",
    topic_id: "00000000-0000-0000-0000-000000000004",
    slug: "katarungan-at-katutubo",
    title: "Katarungang Panlipunan at Karapatan ng mga Katutubong Pamayanan",
    summary: "Pagkilala sa ancestral domain, Indigenous Peoples' Rights Act (IPRA), at proteksyon sa kultura at lupaing ninuno.",
    content_markdown: `## Ang Laban para sa Lupaing Ninuno

Ang mga Katutubong Pilipino ang orihinal na tagapagtanggol ng ating mga kagubatan at kabundukan. Sa ilalim ng Republic Act No. 8371 o Indigenous Peoples' Rights Act (IPRA) ng 1997, kinikilala ang kanilang karapatan sa Ancestral Domains at Self-Determination.

### Mga Isyu sa Pagpapatupad

* **Free, Prior and Informed Consent (FPIC):** Madalas na namamanipula o nalalagpasan ang FPIC ng mga dambuhalang proyektong pagmimina at dam.
* **Red-tagging at Karahasan:** Ang mga katutubong pinuno na nagtatanggol sa kanilang lupa ay madalas humarap sa harassment at banta sa buhay.

> "Ang lupa ay buhay. Para sa mga katutubo, ang pag-agaw sa kanilang lupaing ninuno ay katumbas ng pagbura sa kanilang pagkakakilanlan."`,
    read_time_minutes: 7,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000042",
    topic_id: "00000000-0000-0000-0000-000000000004",
    slug: "kalayaan-sa-pagpapahayag",
    title: "Kalayaan sa Pagpapahayag at Responsableng Pamamahayag",
    summary: "Ang mahalagang papel ng malayang pamamahayag, kaligtasan ng mga mamamahayag, at paglaban sa censorship.",
    content_markdown: `## Malayang Pamamahayag Bilang Haligi ng Katotohanan

Ang kalayaan sa pananalita, pagpapahayag, at mapayapang pagtitipon ay pundasyon ng alinmang malusog na lipunan. Kung walang malayang mamamahayag na nag-uulat ng katotohanan nang walang takot, ang kapangyarihan ay madaling abusuhin.

### Mga Hamon sa Pamamahayag

1. **Impunity at Pagpatay sa mga Mamamahayag:** Ang Pilipinas ay nananatiling isa sa mga mapanganib na bansa para sa mga community journalists.
2. **Weaponization ng Cyberlibel:** Paggamit ng cyberlibel laws upang patahimikin ang mga kritiko at investigative reporters.
3. **Economic Pressures:** Mababang pasahod at kawalan ng insurance para sa mga provincial correspondents.`,
    read_time_minutes: 6,
    is_published: true,
  },

  // 05 EDUKASYON
  {
    id: "10000000-0000-0000-0000-000000000001",
    topic_id: "00000000-0000-0000-0000-000000000005",
    slug: "krisis-sa-edukasyon",
    title: "Krisis sa Edukasyon at Pagkatuto sa Pilipinas",
    summary: "Isang malalimang pagsusuri sa estado ng pangunahing edukasyon, kakulangan sa mga silid-aralan, at mga kinakailangang reporma.",
    content_markdown: `## Ang Kasalukuyang Estado ng Edukasyon

Humaharap ang bansa sa tinatawag ng World Bank na "learning poverty" kung saan malaking bahagi ng 10-taong gulang na mga bata ay hindi makabasa o makaunawa ng simpleng teksto.

### Mga Sanhi ng Krisis

1. **Kakapusan sa Silid-aralan:** Backlog na mahigit 150,000 classrooms sa buong bansa, na nagiging sanhi ng siksikang mga klase (hanggang 60 mag-aaral bawat silid).
2. **Administrative Burden ng mga Guro:** Ang labis na non-teaching tasks ay nagbabawas sa oras ng guro para sa aktuwal na pagtuturo at remedial reading.
3. **Kakulangan sa Learning Materials:** Pagkaantala sa pamamahagi ng mga aklat-aralin at Science kits sa mga pampublikong paaralan.`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    topic_id: "00000000-0000-0000-0000-000000000005",
    slug: "aksesibilidad-sa-edukasyon",
    title: "Aksesibilidad at Pagkakapantay-pantay sa Last Mile Schools",
    summary: "Pagsusuri sa kalagayan ng mga mag-aaral at guro sa malalayong isla, kabundukan, at mga komunidad na walang kuryente.",
    content_markdown: `## Edukasyon para sa mga Nasa Laylayan

Ang "Last Mile Schools" ay tumutukoy sa mga pampublikong paaralan na matatagpuan sa mga liblib na komunidad, malalayong isla, o kabundukan na madalas walang kuryente, tubig, at kalsada.

### Ang Hamon sa Bawat Araw

* **Mahabang Paglalakad:** Mga mag-aaral na tumatawid ng mga ilog at naglalakad nang 2 hanggang 3 oras makarating lamang sa eskwelahan.
* **Kakulangan sa Pasilidad:** Kakulangan ng digital connectivity at science laboratories na nagdudulot ng malaking agwat sa pagitan ng mag-aaral sa lungsod at kanayunan.
* **Dedikasyon ng mga Guro:** Mga guro na gumagastos mula sa sariling bulsa upang magdala ng modyul at pagkain para sa mga bata.`,
    read_time_minutes: 5,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000009",
    topic_id: "00000000-0000-0000-0000-000000000005",
    slug: "krisis-sa-literasiya-at-pisa-results",
    title: "Ang Krisis sa Literasiya at ang Resulta ng PISA sa Pilipinas",
    summary: "Pagsusuri sa mababang ranggo ng mga mag-aaral na Pilipino sa Programme for International Student Assessment (PISA) at mga hakbang pasulong.",
    content_markdown: `## Pagsusuri sa Resulta ng PISA 2022

Sa pinakahuling resulta ng Programme for International Student Assessment (PISA) na isinagawa ng OECD, muling lumabas na ang mga mag-aaral na Pilipinong may edad 15 ay kabilang sa pinakamababang marka sa Pagbasa, Matematika, at Agham sa buong mundo.

### Mga Mahahalagang Aral mula sa PISA

1. **Socio-Economic Disadvantage:** Mahigit 80% ng pagkakaiba sa marka ay may kaugnayan sa katayuang pinansyal ng pamilya at kakulangan sa nutrisyon sa murang edad.
2. **Mother Tongue at Language Policy:** Ang hamon ng paglipat mula sa kinagisnang wika patungo sa Ingles sa pagsusulit sa agham at matematika.
3. **Kritikal na Pag-iisip:** Ang pangangailangan na lumipat mula sa memorization patungo sa problem-solving at reading comprehension.

> "Hindi natin masusolusyunan ang krisis sa pagkatuto kung hindi natin sasabayan ng solusyon sa kahirapan, gutom, at kalusugan ng bawat pamilyang Pilipino."`,
    read_time_minutes: 6,
    is_published: true,
  },

  // 06 TEKNOLOHIYA
  {
    id: "10000000-0000-0000-0000-000000000060",
    topic_id: "00000000-0000-0000-0000-000000000006",
    slug: "digital-divide-pilipinas",
    title: "Digital Divide at Internet Connectivity sa mga Rehiyon",
    summary: "Pagsipat sa agwat ng digital infrastructure sa pagitan ng mga siyudad at probinsya, at ang karapatan sa mabilis at abot-kayang internet.",
    content_markdown: `## Ang Agwat sa Mundo ng Digital

Sa makabagong panahon, ang access sa mabilis at abot-kayang internet ay hindi na luho kundi batayang pangangailangan para sa edukasyon, trabaho, at serbisyo publiko.

### Ang Realidad sa Pilipinas

* **Mataas na Gastos, Mababang Bilis:** Ang Pilipinas ay nananatiling isa sa may pinakamahal na broadband costs kaugnay sa purchasing power ng mamamayan.
* **Geographical Inequity:** Malalaking siyudad lamang ang may fiber connectivity habang maraming baryo ang umaasa pa rin sa mahinang cellular signals.
* **National Broadband Program:** Ang pangangailangan na pabilisin ang rollout ng DICT sa mga libreng Wi-Fi sites sa mga pampublikong plaza at paaralan.`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000061",
    topic_id: "00000000-0000-0000-0000-000000000006",
    slug: "ai-at-paggawa",
    title: "Artificial Intelligence at ang Hinaharap ng Trabaho at BPO sa Bansa",
    summary: "Pagsusuri sa epekto ng generative AI sa sektor ng Business Process Outsourcing (BPO), upskilling, at mga manggagawa sa kaalaman.",
    content_markdown: `## AI sa Sentro ng Industriya ng Paggawa

Ang sektor ng IT-BPO ay nag-aambag ng bilyun-bilyong dolyar taon-taon sa ekonomiya ng Pilipinas at nagbibigay ng trabaho sa mahigit 1.5 milyong manggagawa. Sa mabilis na pag-usbong ng Generative AI at automated customer agents, humaharap ang bansa sa malaking transisyon.

### Mga Hakbang para sa Proteksyon ng Manggagawa

1. **Upskilling tungo sa Mas Mataas na Halaga:** Paglipat mula sa basic voice calls patungo sa data analytics, AI supervision, healthcare services, at software management.
2. **Etikal na Pamantayan sa AI:** Pagtiyak na ang paggamit ng AI sa opisina ay makatao at may proteksyon laban sa biglaang tanggalan.
3. **Pakikipagtulungan sa Academe:** Pag-aangkop ng kurikulum sa kolehiyo upang ihanda ang mga mag-aaral sa pakikipagtulungan sa AI tools.`,
    read_time_minutes: 7,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000062",
    topic_id: "00000000-0000-0000-0000-000000000006",
    slug: "disimpormasyon-at-social-media",
    title: "Disimpormasyon, Fake News, at Media and Information Literacy",
    summary: "Ang pananalasa ng fake news, troll farms, at ang kahalagahan ng fact-checking at kritikal na pag-iisip sa digital age.",
    content_markdown: `## Ang Laban para sa Katotohanan sa Social Media

Ang Pilipinas ay kilala bilang "social media capital of the world". Subalit ang kasangkapang ito na nag-uugnay sa mga pamilya ay naging daluyan din ng coordinated inauthentic behavior, historical distortion, at pekeng balita.

### Paano Kumikilos ang Disimpormasyon

* **Echo Chambers at Algorithms:** Pabor ang mga social media algorithms sa mga nakakagalit o sensasyonal na nilalaman na humahati sa opinyon ng publiko.
* **Troll Farms at Clickbait:** Organisadong mga grupo na binabayaran upang manipulahin ang pampublikong diskurso.
* **Media Literacy sa Silid-Aralan:** Pagtuturo sa kabataan kung paano kumilatis ng lehitimong balita, mag-cross reference ng sanggunian, at kilalanin ang cognitive bias.`,
    read_time_minutes: 7,
    is_published: true,
  },

  // 07 KALUSUGAN
  {
    id: "10000000-0000-0000-0000-000000000070",
    topic_id: "00000000-0000-0000-0000-000000000007",
    slug: "kalusugang-pangkalahatan",
    title: "Kalusugang Pangkalahatan at ang Universal Health Care Act",
    summary: "Pagsusuri sa pagpapatupad ng UHC Act (RA 11223), PhilHealth coverage, at accessibility ng gamot at duktor sa mga baryo.",
    content_markdown: `## Kalusugan Bilang Pangunahing Karapatan

Ang Republic Act No. 11223 o Universal Health Care (UHC) Act ay nilagdaan upang tiyakin na bawat Pilipino ay may proteksyon sa pinansyal na panganib dulot ng pagkakasakit at may access sa de-kalidad na serbisyong medikal.

### Mga Hamon sa Pagpapatupad

1. **Out-of-Pocket Expenses:** Nananatiling mataas ang binabayaran ng pamilya mula sa sariling bulsa para sa gamot at laboratory tests.
2. **Kakapusan sa mga Duktor sa Baryo:** Maraming municipal health centers ang walang permanenteng doktor o sapat na supply ng life-saving medicines.
3. **Pangangalaga sa Primary Care:** Pagpapalakas sa Barangay Health Stations (BHS) bilang unang pananggalang bago pumunta sa malalaking ospital.`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000071",
    topic_id: "00000000-0000-0000-0000-000000000007",
    slug: "seguridad-sa-pagkain",
    title: "Malnutrisyon, Pagkabansot, at Seguridad sa Nutrisyon ng Kabataan",
    summary: "Pagsusuri sa childhood stunting, First 1,000 Days Law, at epekto ng kakulangan sa masustansyang pagkain sa talino ng bata.",
    content_markdown: `## Ang Tahimik na Krisis ng Malnutrisyon

Ayon sa Food and Nutrition Research Institute (FNRI), halos isa sa bawat tatlong batang Pilipinong may edad 5 pababa ay bansot (stunted). Ang stunting ay hindi lamang usapin ng tangkad; ito ay permanenteng pinsala sa pag-unlad ng utak.

### Ang Kritikal na First 1,000 Days

* **Kalusugan ng Ina:** Sapat na nutrisyon habang nagdadalang-tao upang maiwasan ang low birth weight sa mga sanggol.
* **Eksklusibong Pagpapasuso:** Pagpapalakas sa suporta sa exclusive breastfeeding sa unang 6 na buwan.
* **School Feeding Programs:** Palakihin ang saklaw ng DepEd at DSWD feeding programs gamit ang sariwang ani mula sa mga lokal na magsasaka.`,
    read_time_minutes: 6,
    is_published: true,
  },
  {
    id: "10000000-0000-0000-0000-000000000072",
    topic_id: "00000000-0000-0000-0000-000000000007",
    slug: "luntiang-enerhiya",
    title: "Luntiang Enerhiya, Malinis na Hangin, at Pangmatagalang Kalusugan",
    summary: "Ang ugnayan ng kalidad ng hangin sa pampublikong kalusugan, renewable energy, at likas-kayang pag-unlad sa mga komunidad.",
    content_markdown: `## Malinis na Hangin at Likas-kayang Enerhiya

Ang polusyon sa hangin dulot ng fossil fuels at lumang transportasyon ay nagdudulot ng libu-libong maagang pagkamatay taon-taon dahil sa sakit sa puso, baga, at hika.

### Ang Solusyon sa Malinis na Enerhiya

1. **Transisyon sa Solar at Geothermal:** Paggamit sa natural na yaman ng Pilipinas bilang lider sa geothermal energy sa Asya.
2. **Modernisasyon ng Pampublikong Transportasyon:** Paglipat sa mga electric jeepneys at pagtatayo ng ligtas na protected bike lanes sa mga kalunsuran.
3. **Pangangalaga sa Kalidad ng Hangin:** Mahigpit na monitoring sa emissions ng mga pabrika at power plants alinsunod sa Clean Air Act.`,
    read_time_minutes: 6,
    is_published: true,
  },
];

// -----------------------------------------------------------------------------
// CITATIONS / SOURCES PARA SA BAWAT ARALIN
// -----------------------------------------------------------------------------
export const CLEAN_SOURCES = [
  // Kapaligiran
  {
    subtopic_slug: "mga-suliraning-pangkapaligiran",
    title: "Philippine Environment Monitor & Solid Waste Management Statistics",
    author: "Department of Environment and Natural Resources (DENR)",
    publication: "Environmental Management Bureau",
    url: "https://emb.gov.ph",
    published_date: "2023-08-15",
    order_index: 1,
  },
  {
    subtopic_slug: "climate-change-sa-pilipinas",
    title: "Climate Change 2023: Synthesis Report (AR6)",
    author: "Intergovernmental Panel on Climate Change (IPCC)",
    publication: "IPCC Secretariat, Geneva",
    url: "https://www.ipcc.ch/report/ar6/syr/",
    published_date: "2023-03-20",
    order_index: 1,
  },
  {
    subtopic_slug: "climate-change-sa-pilipinas",
    title: "National Climate Change Action Plan Assessment",
    author: "Climate Change Commission (CCC)",
    publication: "Office of the President, Malacañang",
    url: "https://climate.gov.ph",
    published_date: "2022-11-15",
    order_index: 2,
  },
  {
    subtopic_slug: "mga-hakbang-tungo-sa-sustainability",
    title: "Philippine Development Plan 2023–2028: Chapter 15 — Accelerating Climate Action",
    author: "National Economic and Development Authority (NEDA)",
    publication: "NEDA Pasig City",
    url: "https://pdp.neda.gov.ph",
    published_date: "2023-01-10",
    order_index: 1,
  },

  // Ekonomiya
  {
    subtopic_slug: "implasyon-at-presyo",
    title: "Consumer Price Index and Inflation Rate Reports",
    author: "Philippine Statistics Authority (PSA)",
    publication: "PSA Official Statistics",
    url: "https://psa.gov.ph",
    published_date: "2024-02-06",
    order_index: 1,
  },
  {
    subtopic_slug: "kalagayan-ng-manggagawa",
    title: "Labor Force Survey & Decent Work Country Diagnostic",
    author: "International Labour Organization (ILO)",
    publication: "ILO Country Office for the Philippines",
    url: "https://www.ilo.org/manila",
    published_date: "2023-09-12",
    order_index: 1,
  },
  {
    subtopic_slug: "agrikultura-at-repormang-agraryo",
    title: "Agrarian Reform Impact Assessment and Agricultural Performance",
    author: "Department of Agrarian Reform (DAR)",
    publication: "DAR Policy and Planning Bureau",
    url: "https://www.dar.gov.ph",
    published_date: "2023-05-18",
    order_index: 1,
  },

  // Pamahalaan
  {
    subtopic_slug: "demokrasya-at-partisipasyon",
    title: "1987 Philippine Constitution: Article II and Article III",
    author: "Constitutional Commission",
    publication: "Official Gazette of the Republic of the Philippines",
    url: "https://www.officialgazette.gov.ph/constitutions/1987-constitution/",
    published_date: "1987-02-02",
    order_index: 1,
  },
  {
    subtopic_slug: "korapsiyon-at-pananagutan",
    title: "Annual Financial Reports & Citizen's Participatory Audit Manual",
    author: "Commission on Audit (COA)",
    publication: "COA Central Office, Quezon City",
    url: "https://www.coa.gov.ph",
    published_date: "2023-11-20",
    order_index: 1,
  },
  {
    subtopic_slug: "desentralisasyon-at-lokal",
    title: "Mandanas-Garcia Ruling Implementation: Executive Order No. 138 Framework",
    author: "Department of the Interior and Local Government (DILG)",
    publication: "DILG Bureau of Local Government Development",
    url: "https://www.dilg.gov.ph",
    published_date: "2022-06-30",
    order_index: 1,
  },

  // Karapatang Pantao
  {
    subtopic_slug: "batayang-karapatan",
    title: "Universal Declaration of Human Rights and the Philippine Bill of Rights",
    author: "Commission on Human Rights (CHR)",
    publication: "CHR Human Rights Education Bureau",
    url: "https://chr.gov.ph",
    published_date: "2023-12-10",
    order_index: 1,
  },
  {
    subtopic_slug: "katarungan-at-katutubo",
    title: "Republic Act No. 8371 (IPRA) and Ancestral Domains Review",
    author: "National Commission on Indigenous Peoples (NCIP)",
    publication: "NCIP Official Portal",
    url: "https://ncip.gov.ph",
    published_date: "2023-10-29",
    order_index: 1,
  },
  {
    subtopic_slug: "kalayaan-sa-pagpapahayag",
    title: "State of Free Expression and Media Safety Report",
    author: "National Union of Journalists of the Philippines (NUJP)",
    publication: "NUJP Secretariat",
    url: "https://nujp.org",
    published_date: "2024-05-03",
    order_index: 1,
  },

  // Edukasyon
  {
    subtopic_slug: "krisis-sa-edukasyon",
    title: "Basic Education Report (BER) 2024",
    author: "Department of Education (DepEd)",
    publication: "DepEd Public Affairs Service",
    url: "https://www.deped.gov.ph",
    published_date: "2024-01-25",
    order_index: 1,
  },
  {
    subtopic_slug: "aksesibilidad-sa-edukasyon",
    title: "The State of the 21st Century Last Mile Schools in the Philippines",
    author: "Philippine Institute for Development Studies (PIDS)",
    publication: "PIDS Policy Notes",
    url: "https://www.pids.gov.ph",
    published_date: "2023-04-14",
    order_index: 1,
  },
  {
    subtopic_slug: "krisis-sa-literasiya-at-pisa-results",
    title: "PISA 2022 Results: Factsheets Philippines",
    author: "OECD",
    publication: "Organisation for Economic Co-operation and Development",
    url: "https://www.oecd.org/publication/pisa-2022-results/",
    published_date: "2023-12-05",
    order_index: 1,
  },

  // Teknolohiya
  {
    subtopic_slug: "digital-divide-pilipinas",
    title: "National ICT Household Survey & Connectivity Assessment",
    author: "Department of Information and Communications Technology (DICT)",
    publication: "DICT ICT Planning Bureau",
    url: "https://dict.gov.ph",
    published_date: "2023-07-22",
    order_index: 1,
  },
  {
    subtopic_slug: "ai-at-paggawa",
    title: "Artificial Intelligence Roadmap for the Philippines & BPO Evolution",
    author: "Department of Trade and Industry (DTI)",
    publication: "DTI Board of Investments",
    url: "https://innovate.dti.gov.ph",
    published_date: "2023-11-08",
    order_index: 1,
  },
  {
    subtopic_slug: "disimpormasyon-at-social-media",
    title: "Tracking Digital Disinformation and Algorithmic Manipulation in the Philippines",
    author: "UP College of Mass Communication & VERA Files",
    publication: "Philippine Journalism Review",
    url: "https://verafiles.org",
    published_date: "2024-02-19",
    order_index: 1,
  },

  // Kalusugan
  {
    subtopic_slug: "kalusugang-pangkalahatan",
    title: "Universal Health Care Act (RA 11223) Progress Report",
    author: "Department of Health (DOH)",
    publication: "DOH Health Policy Development and Planning Bureau",
    url: "https://doh.gov.ph",
    published_date: "2023-10-12",
    order_index: 1,
  },
  {
    subtopic_slug: "seguridad-sa-pagkain",
    title: "National Nutrition Survey: Stunting and Malnutrition in Filipino Children",
    author: "Food and Nutrition Research Institute (DOST-FNRI)",
    publication: "DOST Taguig",
    url: "https://www.fnri.dost.gov.ph",
    published_date: "2023-06-30",
    order_index: 1,
  },
  {
    subtopic_slug: "luntiang-enerhiya",
    title: "Philippine Energy Plan 2023–2050: Clean Energy Scenario",
    author: "Department of Energy (DOE)",
    publication: "DOE Energy Policy and Planning Bureau",
    url: "https://www.doe.gov.ph",
    published_date: "2023-09-25",
    order_index: 1,
  },
];

// -----------------------------------------------------------------------------
// POSTGREST SEED EXECUTION FUNCTION
// -----------------------------------------------------------------------------
async function runSeed() {
  console.log("=== Diwang Panlipunan: Seeding Clean Database ===");
  console.log("Supabase URL:", SUPABASE_URL);

  const baseHeaders = {
    "Content-Type": "application/json",
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
  };

  // 1. Get or Create 7 Topics
  console.log(`\n[1/3] Synchronizing ${CLEAN_TOPICS.length} Pangkalahatang Paksa (Topics)...`);
  const existingTopicsRes = await fetch(`${SUPABASE_URL}/rest/v1/topics?select=id,slug`, {
    headers: baseHeaders,
  });
  const existingTopics = await existingTopicsRes.json();
  const topicSlugToId = new Map(existingTopics.map((t) => [t.slug, t.id]));

  for (const topic of CLEAN_TOPICS) {
    if (topicSlugToId.has(topic.slug)) {
      const existingId = topicSlugToId.get(topic.slug);
      // Update existing topic
      await fetch(`${SUPABASE_URL}/rest/v1/topics?id=eq.${existingId}`, {
        method: "PATCH",
        headers: baseHeaders,
        body: JSON.stringify({
          name_fil: topic.name_fil,
          name_en: topic.name_en,
          description_fil: topic.description_fil,
          description_en: topic.description_en,
          icon_name: topic.icon_name,
          color_token: topic.color_token,
          order_index: topic.order_index,
          is_published: true,
          updated_at: new Date().toISOString(),
        }),
      });
    } else {
      // Insert new topic
      const res = await fetch(`${SUPABASE_URL}/rest/v1/topics`, {
        method: "POST",
        headers: { ...baseHeaders, Prefer: "return=representation" },
        body: JSON.stringify(topic),
      });
      const inserted = await res.json();
      if (inserted?.[0]?.id) {
        topicSlugToId.set(topic.slug, inserted[0].id);
      }
    }
  }
  console.log("✓ Matagumpay na na-synchronize ang 7 Paksa!");

  // 2. Synchronize 21 Aralin (Subtopics)
  console.log(`\n[2/3] Synchronizing ${CLEAN_SUBTOPICS.length} Aralin (Subtopics)...`);
  const existingSubsRes = await fetch(`${SUPABASE_URL}/rest/v1/subtopics?select=id,slug`, {
    headers: baseHeaders,
  });
  const existingSubs = await existingSubsRes.json();
  const subSlugToId = new Map(existingSubs.map((s) => [s.slug, s.id]));

  for (const sub of CLEAN_SUBTOPICS) {
    // Find parent topic slug from the clean list
    const parentTopic = CLEAN_TOPICS.find((t) => t.id === sub.topic_id);
    const resolvedTopicId = topicSlugToId.get(parentTopic?.slug || "kapaligiran");

    const payload = {
      topic_id: resolvedTopicId,
      slug: sub.slug,
      title: sub.title,
      summary: sub.summary,
      content_markdown: sub.content_markdown,
      read_time_minutes: sub.read_time_minutes,
      is_published: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (subSlugToId.has(sub.slug)) {
      const existingId = subSlugToId.get(sub.slug);
      await fetch(`${SUPABASE_URL}/rest/v1/subtopics?id=eq.${existingId}`, {
        method: "PATCH",
        headers: baseHeaders,
        body: JSON.stringify(payload),
      });
    } else {
      const insertPayload = {
        ...payload,
        id: sub.id,
      };
      const res = await fetch(`${SUPABASE_URL}/rest/v1/subtopics`, {
        method: "POST",
        headers: { ...baseHeaders, Prefer: "return=representation" },
        body: JSON.stringify(insertPayload),
      });
      const inserted = await res.json();
      if (inserted?.[0]?.id) {
        subSlugToId.set(sub.slug, inserted[0].id);
      }
    }
  }
  console.log("✓ Matagumpay na na-synchronize ang 21 Aralin!");

  // 3. Synchronize Citations (Sources)
  console.log(`\n[3/3] Synchronizing Sanggunian / Citations (Sources)...`);
  // Re-fetch all subtopic IDs
  const allSubsRes = await fetch(`${SUPABASE_URL}/rest/v1/subtopics?select=id,slug`, {
    headers: baseHeaders,
  });
  const allSubs = await allSubsRes.json();
  const freshSlugToId = new Map(allSubs.map((s) => [s.slug, s.id]));

  let insertedSourcesCount = 0;
  for (let i = 0; i < CLEAN_SOURCES.length; i++) {
    const src = CLEAN_SOURCES[i];
    const subtopicId = freshSlugToId.get(src.subtopic_slug);
    if (!subtopicId) continue;

    const sourceId = `20000000-0000-0000-0000-${String(i + 1).padStart(12, "0")}`;
    const sourcePayload = {
      id: sourceId,
      subtopic_id: subtopicId,
      title: src.title,
      author: src.author,
      publication: src.publication,
      url: src.url,
      published_date: src.published_date,
      order_index: src.order_index,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/sources?on_conflict=id`, {
      method: "POST",
      headers: { ...baseHeaders, Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify(sourcePayload),
    });
    if (res.ok) insertedSourcesCount++;
  }

  console.log(`✓ Matagumpay na na-seed ang ${insertedSourcesCount} Sanggunian / Citations!`);
  console.log("\n=== Clean Database Seeding Complete! ===");
}

runSeed().catch(console.error);
