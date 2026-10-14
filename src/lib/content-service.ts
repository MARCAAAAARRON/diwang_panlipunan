import { createClient } from "@/lib/supabase/server";
import { Topic, Subtopic, Source, SubtopicWithSources } from "@/types/content";

export interface TopicCatalogItem extends Topic {
  subtopic_count: number;
  subtopics: Subtopic[];
}

// Embedded Seed Data for Resilient Offline / Pre-DB Rendering
const SEED_TOPICS: TopicCatalogItem[] = [
  {
    id: "00000000-0000-0000-0000-000000000005",
    slug: "kapaligiran",
    name_fil: "Kapaligiran",
    name_en: "Environment and Climate Change",
    description_fil: "Krisis sa klima, likas na yaman, pagbawas ng pinsala sa sakuna, at likas-kayang pag-unlad.",
    description_en: "Examining the local and global ecological crisis, climate resilience, and equitable resource stewardship.",
    icon_name: "Leaf",
    color_token: "--topic-kapaligiran",
    order_index: 1,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    subtopic_count: 3,
    subtopics: [
      {
        id: "10000000-0000-0000-0000-000000000010",
        topic_id: "00000000-0000-0000-0000-000000000005",
        slug: "mga-suliraning-pangkapaligiran",
        title: "Mga Suliraning Pangkapaligiran sa Pilipinas",
        summary: "Pangkalahatang pagsipat sa polusyon sa hangin at tubig, deforestation, at pagkasira ng mga marine habitats sa kapuluan.",
        content_markdown: "## Ang Hamon ng Kalikasan sa Arkipelago\n\nBilang isang bansang mayaman sa biodiversity...",
        read_time_minutes: 5,
        is_published: true,
        published_at: "2026-01-10T00:00:00Z",
        created_at: "2026-01-10T00:00:00Z",
        updated_at: "2026-01-10T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000011",
        topic_id: "00000000-0000-0000-0000-000000000005",
        slug: "climate-change-sa-pilipinas",
        title: "Climate Change sa Pilipinas: Vulnerabilities, Impacts, and the Imperative for Ecological Justice",
        summary: "Susing pagsusuri sa krisis pangkolima, konserbasyon ng kalikasan, at pantay na pangangalaga sa likas-yaman ng kapuluan para sa kasalukuyan at susunod na salinlahi.",
        content_markdown: `The Philippine archipelago occupies one of the planet's most geophysically perilous locations. Situated along the Western Pacific typhoon belt and the Pacific Ring of Fire, the nation faces compounding existential pressures driven by anthropogenic global warming. With over 7,640 islands and a coastline extending beyond 36,000 kilometers, the country exhibits an exceptionally high exposure coefficient to sea surface temperature anomalies, hydro-meteorological extremes, and accelerating marine thermal expansion [^1].

Over the preceding three decades, the intensification and frequency of Category 4 and 5 supertyphoons traversing the Philippine Area of Responsibility (PAR) have disrupted generational ecological balances. These meteorological events no longer represent episodic shocks; rather, they function as chronic structural destabilizers. While rural subsistence farmers contend with unpredictable rainfall distributions and prolonged El Niño-Southern Oscillation (ENSO) drought cycles, low-lying coastal fisherfolk face irreversible loss of intertidal mangrove systems and catastrophic coastal recession [^2].

> "The Philippine archipelago experiences climate injustice at its sharpest edge: contributing less than half a percent of global carbon emissions while absorbing catastrophic frontline losses."

This structural asymmetry underscores the core geopolitical dimension of climate vulnerability in Southeast Asia. While high-income industrialized economies generated the historical cumulative greenhouse emissions driving contemporary climatic disruptions, localized archipelagic regions bear the overwhelming brunt of infrastructure degradation, macroeconomic output losses, and human displaced populations.

> **TALA NG DATOS: ANTAS NG DAGAT**  
> **3x** Pandaigdigang Karaniwang Bilis ng Pagtaas ng Dagat  
> Local relative sea level rise across vulnerable sections of the Philippine Sea and Manila Bay basin is occurring at more than three times the global planetary baseline, accelerated by groundwater extraction and localized subduction.  
> *Pinagmulan: Philippine Atmospheric, Geophysical and Astronomical Services Administration (PAGASA) / Climate Change Commission Report* [^2]

## Systemic Impacts on Agriculture, Fisheries, and Food Sovereignty

The disruption of historical precipitation regimes directly challenges domestic agrarian stability. In the central plains of Luzon and the agricultural valleys of Mindanao, rice and corn production systems depend acutely upon seasonal predictability. The increasing volatility of southwest monsoonal patterns ("Habagat"), coupled with high thermal stress during ripening windows, has demonstrably compressed yields. Concurrently, topsoil degradation resulting from repeated high-volume precipitation events strips vital micronutrients from cultivated land surfaces, increasing input dependencies among marginalized smallholders [^3].

Marine ecosystems, which furnish approximately forty percent of animal protein consumption across Filipino communities, face equivalent peril. Thermal-induced mass coral bleaching throughout the Coral Triangle has decimated critical nursery grounds for demersal fish species. Ocean acidification inhibits shell calcification in mollusks and crustacean populations, dismantling coastal trophic networks. Community adaptation efforts, while vital, remain chronically constrained by structural credit shortfalls and limited access to resilient civic infrastructure, rendering comprehensive policy overhaul and ecological reparations imperative.`,
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-03-24T00:00:00Z",
        created_at: "2026-03-24T00:00:00Z",
        updated_at: "2026-03-24T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000012",
        topic_id: "00000000-0000-0000-0000-000000000005",
        slug: "mga-hakbang-tungo-sa-sustainability",
        title: "Mga Hakbang Tungo sa Sustainability at Hustisyang Pangklima",
        summary: "Pagsusuri sa Renewable Energy Act, community-led reforestation, at mga polisiya para sa climate adaptation sa Pilipinas.",
        content_markdown: "## Pagpapatupad ng Hustisyang Pangklima\n\nHindi sapat ang reaktibong pagtugon sa sakuna...",
        read_time_minutes: 7,
        is_published: true,
        published_at: "2026-03-25T00:00:00Z",
        created_at: "2026-03-25T00:00:00Z",
        updated_at: "2026-03-25T00:00:00Z",
        search_vector: null,
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "ekonomiya",
    name_fil: "Ekonomiya",
    name_en: "Economy and Livelihood",
    description_fil: "Kabuhayan, implasyon, agrikultura, trabaho, at mga polisiya para sa pantay na kaunlarang pang-ekonomiya.",
    description_en: "Understanding inflation, labor rights, agrarian realities, and structural economic development in the Philippines.",
    icon_name: "TrendingUp",
    color_token: "--topic-ekonomiya",
    order_index: 2,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    subtopic_count: 3,
    subtopics: [
      {
        id: "10000000-0000-0000-0000-000000000020",
        topic_id: "00000000-0000-0000-0000-000000000003",
        slug: "implasyon-at-presyo",
        title: "Implasyon at Presyo ng mga Pangunahing Bilihin",
        summary: "Pagsusuri sa mga sanhi ng pagtaas ng presyo ng pagkain at enerhiya, at epekto nito sa kapangyarihang bumili ng mga karaniwang pamilya.",
        content_markdown: "## Ang Epekto ng Implasyon sa Mamamayan\n\nAng patuloy na pagtaas ng presyo ng bigas, langis, at kuryente...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-02-01T00:00:00Z",
        created_at: "2026-02-01T00:00:00Z",
        updated_at: "2026-02-01T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000021",
        topic_id: "00000000-0000-0000-0000-000000000003",
        slug: "kalagayan-ng-manggagawa",
        title: "Kalagayan ng mga Manggagawa at Sahod",
        summary: "Pagsipat sa contractualization, living wage, at kaligtasan sa paggawa sa pormal at impormal na sektor.",
        content_markdown: "## Ang Hamon sa Sahod at Karapatan\n\nNananatiling malaking hamon ang pagkamit ng family living wage...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-02-05T00:00:00Z",
        created_at: "2026-02-05T00:00:00Z",
        updated_at: "2026-02-05T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000022",
        topic_id: "00000000-0000-0000-0000-000000000003",
        slug: "agrikultura-at-repormang-agraryo",
        title: "Agrikultura at Repormang Agraryo sa Bagong Milenyo",
        summary: "Pagsusuri sa seguridad sa pagkain, subsidiya sa magsasaka, at hamon ng land ownership.",
        content_markdown: "## Katayuan ng Sektor ng Pagsasaka\n\nKabila ng pagiging agrikultural na bansa, marami pa ring magsasaka...",
        read_time_minutes: 7,
        is_published: true,
        published_at: "2026-02-10T00:00:00Z",
        created_at: "2026-02-10T00:00:00Z",
        updated_at: "2026-02-10T00:00:00Z",
        search_vector: null,
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000007",
    slug: "pamahalaan",
    name_fil: "Pamahalaan",
    name_en: "Politics and Governance",
    description_fil: "Pananagutan ng mga pinuno, reporma sa institusyon, desentralisasyon, at pakikilahok ng mamamayan.",
    description_en: "Scrutinizing public institutions, democratic engagement, accountability, and the rule of law.",
    icon_name: "Landmark",
    color_token: "--topic-pamahalaan",
    order_index: 3,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    subtopic_count: 3,
    subtopics: [
      {
        id: "10000000-0000-0000-0000-000000000030",
        topic_id: "00000000-0000-0000-0000-000000000007",
        slug: "demokrasya-at-partisipasyon",
        title: "Demokrasya at Partisipasyong Pampolitika",
        summary: "Pagsusuri sa papel ng civil society organizations, halalan, at mamamayan sa paghubog ng pampublikong polisiya.",
        content_markdown: "## Ang Kapangyarihan ng Boto at Sibikong Pakikilahok\n\nAng demokrasya ay hindi nagtatapos sa araw ng botohan...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-02-15T00:00:00Z",
        created_at: "2026-02-15T00:00:00Z",
        updated_at: "2026-02-15T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000031",
        topic_id: "00000000-0000-0000-0000-000000000007",
        slug: "korapsiyon-at-pananagutan",
        title: "Korapsiyon at Pananagutan sa Pamahalaan",
        summary: "Pagsisiyasat sa mga mekanismo ng auditing, transparency sa badyet, at institutional integrity.",
        content_markdown: "## Transparensiya at Pananagutan\n\nAng paglaban sa katiwalian ay nangangailangan ng matatag na mga institusyon...",
        read_time_minutes: 7,
        is_published: true,
        published_at: "2026-02-20T00:00:00Z",
        created_at: "2026-02-20T00:00:00Z",
        updated_at: "2026-02-20T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000032",
        topic_id: "00000000-0000-0000-0000-000000000007",
        slug: "desentralisasyon-at-lokal",
        title: "Desentralisasyon at Pamamahalang Lokal",
        summary: "Ang epekto ng Mandanas-Garcia ruling at pagpapalakas sa kakayahan ng mga lokal na pamahalaan.",
        content_markdown: "## Kapangyarihan sa mga Komunidad\n\nSa pagpapatupad ng devolution...",
        read_time_minutes: 5,
        is_published: true,
        published_at: "2026-02-25T00:00:00Z",
        created_at: "2026-02-25T00:00:00Z",
        updated_at: "2026-02-25T00:00:00Z",
        search_vector: null,
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    slug: "karapatang-pantao",
    name_fil: "Karapatang Pantao",
    name_en: "Human Rights and Social Justice",
    description_fil: "Katarungang panlipunan, kalayaang sibil, at pangangalaga sa mga marhinalisadong sektor ng lipunan.",
    description_en: "Defending civil liberties, indigenous rights, restorative justice, and community empowerment.",
    icon_name: "Scale",
    color_token: "--topic-karapatan",
    order_index: 4,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    subtopic_count: 3,
    subtopics: [
      {
        id: "10000000-0000-0000-0000-000000000040",
        topic_id: "00000000-0000-0000-0000-000000000004",
        slug: "batayang-karapatan",
        title: "Mga Batayang Karapatang Pantao sa Saligang Batas",
        summary: "Pagsusuri sa Bill of Rights at proteksyon sa buhay, kalayaan, at ari-arian.",
        content_markdown: "## Ang Batayan ng Ating Kalayaan\n\nNakatadhana sa Artikulo III ng 1987 Saligang Batas...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-03-01T00:00:00Z",
        created_at: "2026-03-01T00:00:00Z",
        updated_at: "2026-03-01T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000041",
        topic_id: "00000000-0000-0000-0000-000000000004",
        slug: "katarungan-at-katutubo",
        title: "Katarungang Panlipunan at Karapatan ng Katutubo",
        summary: "Pagkilala sa ancestral domain at proteksyon sa kultura at kalikasan ng mga Katutubong Pilipino.",
        content_markdown: "## Ang Laban para sa Lupaing Ninuno\n\nAng Indigenous Peoples' Rights Act (IPRA)...",
        read_time_minutes: 7,
        is_published: true,
        published_at: "2026-03-05T00:00:00Z",
        created_at: "2026-03-05T00:00:00Z",
        updated_at: "2026-03-05T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000042",
        topic_id: "00000000-0000-0000-0000-000000000004",
        slug: "kalayaan-sa-pagpapahayag",
        title: "Kalayaan sa Pagpapahayag at Pamamahayag",
        summary: "Ang mahalagang papel ng malayang pamamahayag sa isang malusog na lipunan.",
        content_markdown: "## Malayang Pamamahayag Bilang Haligi ng Katotohanan\n\nAng kalayaan sa pananalita at pamamahayag...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-03-10T00:00:00Z",
        created_at: "2026-03-10T00:00:00Z",
        updated_at: "2026-03-10T00:00:00Z",
        search_vector: null,
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "edukasyon",
    name_fil: "Edukasyon",
    name_en: "Education and Society",
    description_fil: "Kalinangan sa kalidad ng edukasyon, krisis sa literasiya, at pagbabagong-anyo ng kurikulum sa Pilipinas.",
    description_en: "Bridging systemic gaps in civic literacy, public school resources, and equitable learning access.",
    icon_name: "GraduationCap",
    color_token: "--topic-edukasyon",
    order_index: 5,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    subtopic_count: 3,
    subtopics: [
      {
        id: "10000000-0000-0000-0000-000000000001",
        topic_id: "00000000-0000-0000-0000-000000000001",
        slug: "krisis-sa-edukasyon",
        title: "Krisis sa Edukasyon at Pagkatuto sa Pilipinas",
        summary: "Isang malalimang pagsusuri sa estado ng pangunahing edukasyon, mga sanhi ng mababang marka sa pandaigdigang pagsusulit, at mga kinakailangang reporma.",
        content_markdown: `## Kalagayan ng Pangunahing Edukasyon sa Bansa\n\nIpinakita sa pinakahuling resulta ng Programme for International Student Assessment (PISA) na patuloy na nahihirapan ang mga mag-aaral na Pilipino sa larangan ng pagbasa, matematika, at agham [^1].\n\n### Mga Pangunahing Salik\n\n1. **Kakapusan sa Pasilidad:** Maraming pampublikong paaralan ang patuloy na nakakaranas ng kakulangan sa mga silid-aralan at aklat.\n2. **Nutrisyon at Kalusugan:** Ang malnutrisyon ay may direktang epekto sa kakayahang mag-isip nang kritikal.\n3. **Pagsasanay sa mga Guro:** Kailangan ng higit na suporta sa makabagong pedagogical methods.\n\n> "Ang tunay na reporma sa edukasyon ay nagsisimula sa pagtiyak na bawat bata ay may malusog na pangangatawan, ligtas na silid-aralan, at mapagkalingang komunidad."`,
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-03-12T00:00:00Z",
        created_at: "2026-03-12T00:00:00Z",
        updated_at: "2026-03-12T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000002",
        topic_id: "00000000-0000-0000-0000-000000000001",
        slug: "aksesibilidad-sa-edukasyon",
        title: "Aksesibilidad at Pagkakapantay-pantay sa Paaralan",
        summary: "Pagsusuri sa kalagayan ng mga mag-aaral sa malalayong isla at kabundukan (Last Mile Schools).",
        content_markdown: "## Edukasyon para sa Lahat\n\nHindi dapat maging hadlang ang distansya o heograpiya...",
        read_time_minutes: 5,
        is_published: true,
        published_at: "2026-03-15T00:00:00Z",
        created_at: "2026-03-15T00:00:00Z",
        updated_at: "2026-03-15T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000003",
        topic_id: "00000000-0000-0000-0000-000000000001",
        slug: "digital-literacy-sa-paaralan",
        title: "Digital Literacy at Makabagong Teknolohiya sa Pagtuturo",
        summary: "Ang pagsasama ng digital tools sa kurikulum at pagharap sa artificial intelligence sa silid-aralan.",
        content_markdown: "## Ang Papel ng Teknolohiya sa Pagkatuto\n\nSa mabilis na pag-unlad ng digital tools...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-03-18T00:00:00Z",
        created_at: "2026-03-18T00:00:00Z",
        updated_at: "2026-03-18T00:00:00Z",
        search_vector: null,
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    slug: "teknolohiya",
    name_fil: "Teknolohiya",
    name_en: "Globalization and Global Issues",
    description_fil: "Karapatang digital, disimpormasyon, pamamahala sa artificial intelligence, at modernong inobasyon.",
    description_en: "Analyzing international relations, migrant labor, sovereignty, and regional cooperation in Southeast Asia.",
    icon_name: "Cpu",
    color_token: "--topic-teknolohiya",
    order_index: 6,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    subtopic_count: 3,
    subtopics: [
      {
        id: "10000000-0000-0000-0000-000000000060",
        topic_id: "00000000-0000-0000-0000-000000000006",
        slug: "migrasyon-at-ofw",
        title: "Migrasyon at ang Karanasan ng mga OFW",
        summary: "Ang panlipunang kapalit ng remittances at mga hamong kinakaharap ng mga migranteng manggagawang Pilipino.",
        content_markdown: "## Ang Makabagong Bayani sa Gitna ng Hamon\n\nMahigit dalawang milyong Pilipino ang nagtatrabaho sa ibayong dagat...",
        read_time_minutes: 7,
        is_published: true,
        published_at: "2026-03-20T00:00:00Z",
        created_at: "2026-03-20T00:00:00Z",
        updated_at: "2026-03-20T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000061",
        topic_id: "00000000-0000-0000-0000-000000000006",
        slug: "ugnayang-panlabas-at-soberanya",
        title: "Ugnayang Panlabas at Soberanya sa Karagatan",
        summary: "Pagsusuri sa UNCLOS, ang 2016 Arbitral Award, at estratehiya ng Pilipinas sa West Philippine Sea.",
        content_markdown: "## Pagtatanggol sa Karapatang pandagat\n\nAng West Philippine Sea ay hindi lamang usapin ng teritoryo kundi ng kabuhayan...",
        read_time_minutes: 8,
        is_published: true,
        published_at: "2026-03-22T00:00:00Z",
        created_at: "2026-03-22T00:00:00Z",
        updated_at: "2026-03-22T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000062",
        topic_id: "00000000-0000-0000-0000-000000000006",
        slug: "pandaigdigang-kalakalan",
        title: "Pandaigdigang Kalakalan at Lokal na Industriya",
        summary: "Ang epekto ng global supply chains at regional trade agreements sa micro, small, and medium enterprises (MSMEs).",
        content_markdown: "## Ang Pilipinas sa Pandaigdigang Merkado\n\nSa panahon ng globalisasyon...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-03-23T00:00:00Z",
        created_at: "2026-03-23T00:00:00Z",
        updated_at: "2026-03-23T00:00:00Z",
        search_vector: null,
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "kalusugan",
    name_fil: "Kalusugan",
    name_en: "Sustainable Development",
    description_fil: "Pangkalahatang kalusugan, sistemang medikal, at mga hamon sa pampublikong kalusugan at kapakanan.",
    description_en: "Balancing economic expansion with intergenerational environmental protection and community welfare.",
    icon_name: "HeartPulse",
    color_token: "--topic-kalusugan",
    order_index: 7,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    subtopic_count: 3,
    subtopics: [
      {
        id: "10000000-0000-0000-0000-000000000070",
        topic_id: "00000000-0000-0000-0000-000000000002",
        slug: "kalusugang-pangkalahatan",
        title: "Kalusugang Pangkalahatan at Universal Health Care",
        summary: "Pagsusuri sa pagpapatupad ng UHC Act at ang accessibility ng pangunahing serbisyong medikal sa mga baryo.",
        content_markdown: "## Kalusugan Bilang Pangunahing Karapatan\n\nAng Universal Health Care Act ay naglalayong tiyakin...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-03-24T00:00:00Z",
        created_at: "2026-03-24T00:00:00Z",
        updated_at: "2026-03-24T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000071",
        topic_id: "00000000-0000-0000-0000-000000000002",
        slug: "seguridad-sa-pagkain",
        title: "Seguridad sa Pagkain at Wastong Nutrisyon",
        summary: "Pagsusuri sa stunting at malnutrition sa mga kabataan at ang mga polisiyang tutugon sa food accessibility.",
        content_markdown: "## Ang Hamon ng Malnutrisyon\n\nNananatiling mataas ang bilang ng mga batang stunted sa bansa...",
        read_time_minutes: 6,
        is_published: true,
        published_at: "2026-03-26T00:00:00Z",
        created_at: "2026-03-26T00:00:00Z",
        updated_at: "2026-03-26T00:00:00Z",
        search_vector: null,
      },
      {
        id: "10000000-0000-0000-0000-000000000072",
        topic_id: "00000000-0000-0000-0000-000000000002",
        slug: "luntiang-enerhiya",
        title: "Luntiang Enerhiya at Likas-kayang Pag-unlad",
        summary: "Ang paglipat mula sa coal tungo sa solar, hydro, at geothermal energy sa pambansang power grid.",
        content_markdown: "## Makabagong Enerhiya para sa Hinaharap\n\nAng transisyon tungo sa malinis na enerhiya...",
        read_time_minutes: 7,
        is_published: true,
        published_at: "2026-03-28T00:00:00Z",
        created_at: "2026-03-28T00:00:00Z",
        updated_at: "2026-03-28T00:00:00Z",
        search_vector: null,
      },
    ],
  },
];

// Seed Sources / Citations
const SEED_SOURCES: Record<string, Source[]> = {
  "climate-change-sa-pilipinas": [
    {
      id: "src-01",
      subtopic_id: "10000000-0000-0000-0000-000000000011",
      title: "Climate Change 2023: Synthesis Report. Contribution of Working Groups I, II and III to the Sixth Assessment Report",
      author: "Intergovernmental Panel on Climate Change (IPCC)",
      publication: "IPCC Secretariat, Geneva",
      url: "https://www.ipcc.ch/report/ar6/syr/",
      published_date: "2023-03-20",
      order_index: 1,
      created_at: "2026-01-01T00:00:00Z",
    },
    {
      id: "src-02",
      subtopic_id: "10000000-0000-0000-0000-000000000011",
      title: "National Climate Change Action Plan: Assessment and Updated Strategic Priorities 2022–2030",
      author: "Philippine Climate Change Commission (CCC)",
      publication: "Office of the President, Malacañang, Manila",
      url: "https://climate.gov.ph",
      published_date: "2022-11-15",
      order_index: 2,
      created_at: "2026-01-01T00:00:00Z",
    },
    {
      id: "src-03",
      subtopic_id: "10000000-0000-0000-0000-000000000011",
      title: "Philippine Development Plan 2023–2028: Chapter 15 — Accelerating Climate Action and Strengthening Disaster Resilience",
      author: "National Economic and Development Authority (NEDA)",
      publication: "NEDA Pasig City",
      url: "https://pdp.neda.gov.ph",
      published_date: "2023-01-10",
      order_index: 3,
      created_at: "2026-01-01T00:00:00Z",
    },
  ],
  "krisis-sa-edukasyon": [
    {
      id: "src-edu-01",
      subtopic_id: "10000000-0000-0000-0000-000000000001",
      title: "PISA 2022 Results: Factsheets Philippines",
      author: "OECD",
      publication: "Organisation for Economic Co-operation and Development",
      url: "https://www.oecd.org/publication/pisa-2022-results/",
      published_date: "2023-12-05",
      order_index: 1,
      created_at: "2026-01-01T00:00:00Z",
    },
    {
      id: "src-edu-02",
      subtopic_id: "10000000-0000-0000-0000-000000000001",
      title: "Basic Education Report 2024",
      author: "Department of Education",
      publication: "DepEd Official Gazette",
      url: "https://www.deped.gov.ph",
      published_date: "2024-01-25",
      order_index: 2,
      created_at: "2026-01-01T00:00:00Z",
    },
  ],
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
