import { DrawerTopicItem } from "@/types/navigation";

export const CANONICAL_TOPICS: DrawerTopicItem[] = [
  {
    id: "topic-01",
    number: "01",
    slug: "kapaligiran",
    title: "Kapaligiran at Krisis sa Klima",
    description: "Susing pagsusuri sa krisis pangklima, konserbasyon ng kalikasan, at pantay na pangangalaga sa likas-yaman.",
    themeColor: "var(--topic-kapaligiran)",
    subtopics: [
      {
        id: "subtopic-01-a",
        code: "a.",
        title: "Aralin 1: Mga Suliraning Pangkapaligiran sa Bansa",
        slug: "mga-suliraning-pangkapaligiran",
      },
      {
        id: "subtopic-01-b",
        code: "b.",
        title: "Aralin 2: Climate Change sa Pilipinas",
        slug: "climate-change-sa-pilipinas",
      },
      {
        id: "subtopic-01-c",
        code: "c.",
        title: "Aralin 3: Mga Hakbang Tungo sa Sustainability",
        slug: "mga-hakbang-tungo-sa-sustainability",
      },
    ],
  },
  {
    id: "topic-02",
    number: "02",
    slug: "ekonomiya",
    title: "Ekonomiya at Kabuhayan",
    description: "Pagsipat sa implasyon, karapatan ng manggagawa, agrikultura, at makatarungang pag-unlad ng kabuhayan.",
    themeColor: "var(--topic-ekonomiya)",
    subtopics: [
      {
        id: "subtopic-02-a",
        code: "a.",
        title: "Aralin 1: Implasyon at Presyo ng mga Bilihin",
        slug: "implasyon-at-presyo",
      },
      {
        id: "subtopic-02-b",
        code: "b.",
        title: "Aralin 2: Kalagayan ng mga Manggagawa",
        slug: "kalagayan-ng-manggagawa",
      },
      {
        id: "subtopic-02-c",
        code: "c.",
        title: "Aralin 3: Agrikultura at Repormang Agraryo",
        slug: "agrikultura-at-repormang-agraryo",
      },
    ],
  },
  {
    id: "topic-03",
    number: "03",
    slug: "pamahalaan",
    title: "Pamahalaan at Demokrasya",
    description: "Mapanuring pagtingin sa mga pampublikong institusyon, pananagutan, at pamamahalang demokratiko.",
    themeColor: "var(--topic-pamahalaan)",
    subtopics: [
      {
        id: "subtopic-03-a",
        code: "a.",
        title: "Aralin 1: Demokrasya at Partisipasyong Pampolitika",
        slug: "demokrasya-at-partisipasyon",
      },
      {
        id: "subtopic-03-b",
        code: "b.",
        title: "Aralin 2: Korapsiyon at Pananagutan sa Pamahalaan",
        slug: "korapsiyon-at-pananagutan",
      },
      {
        id: "subtopic-03-c",
        code: "c.",
        title: "Aralin 3: Desentralisasyon at Pamamahalang Lokal",
        slug: "desentralisasyon-at-lokal",
      },
    ],
  },
  {
    id: "topic-04",
    number: "04",
    slug: "karapatang-pantao",
    title: "Karapatang Pantao at Katarungan",
    description: "Pagtataguyod sa karapatang pantao, katarungang panlipunan, at dignidad ng bawat sektor.",
    themeColor: "var(--topic-karapatan)",
    subtopics: [
      {
        id: "subtopic-04-a",
        code: "a.",
        title: "Aralin 1: Mga Batayang Karapatang Pantao",
        slug: "batayang-karapatan",
      },
      {
        id: "subtopic-04-b",
        code: "b.",
        title: "Aralin 2: Katarungang Panlipunan at Katutubong Pamayanan",
        slug: "katarungan-at-katutubo",
      },
      {
        id: "subtopic-04-c",
        code: "c.",
        title: "Aralin 3: Kalayaan sa Pagpapahayag at Pamamahayag",
        slug: "kalayaan-sa-pagpapahayag",
      },
    ],
  },
  {
    id: "topic-05",
    number: "05",
    slug: "edukasyon",
    title: "Edukasyon at Pagkatuto",
    description: "Pagsusuri sa kalidad, kakayahan, at pantay na oportunidad sa edukasyon ng kabataang Pilipino.",
    themeColor: "var(--topic-edukasyon)",
    subtopics: [
      {
        id: "subtopic-05-a",
        code: "a.",
        title: "Aralin 1: Krisis sa Edukasyon at Pagkatuto sa Pilipinas",
        slug: "krisis-sa-edukasyon",
      },
      {
        id: "subtopic-05-b",
        code: "b.",
        title: "Aralin 2: Aksesibilidad at Pagkakapantay-pantay",
        slug: "aksesibilidad-sa-edukasyon",
      },
      {
        id: "subtopic-05-c",
        code: "c.",
        title: "Aralin 3: Ang Krisis sa Literasiya at PISA Results",
        slug: "krisis-sa-literasiya-at-pisa-results",
      },
    ],
  },
  {
    id: "topic-06",
    number: "06",
    slug: "teknolohiya",
    title: "Teknolohiya at Lipunan",
    description: "Epekto ng artificial intelligence, digital divide, social media, at cyber-soberanya sa mamamayan.",
    themeColor: "var(--topic-teknolohiya)",
    subtopics: [
      {
        id: "subtopic-06-a",
        code: "a.",
        title: "Aralin 1: Digital Divide at Internet Connectivity sa Pilipinas",
        slug: "digital-divide-pilipinas",
      },
      {
        id: "subtopic-06-b",
        code: "b.",
        title: "Aralin 2: Artificial Intelligence at Hinaharap ng Paggawa",
        slug: "ai-at-paggawa",
      },
      {
        id: "subtopic-06-c",
        code: "c.",
        title: "Aralin 3: Disimpormasyon at Social Media Literacy",
        slug: "disimpormasyon-at-social-media",
      },
    ],
  },
  {
    id: "topic-07",
    number: "07",
    slug: "kalusugan",
    title: "Kalusugan at Likas-kayang Pag-unlad",
    description: "Pagtutugma ng pangkalahatang kalusugan ng pamayanan, nutrisyon, at pambansang healthcare system.",
    themeColor: "var(--topic-kalusugan)",
    subtopics: [
      {
        id: "subtopic-07-a",
        code: "a.",
        title: "Aralin 1: Kalusugang Pangkalahatan at Universal Health Care",
        slug: "kalusugang-pangkalahatan",
      },
      {
        id: "subtopic-07-b",
        code: "b.",
        title: "Aralin 2: Seguridad sa Pagkain at Wastong Nutrisyon",
        slug: "seguridad-sa-pagkain",
      },
      {
        id: "subtopic-07-c",
        code: "c.",
        title: "Aralin 3: Luntiang Enerhiya at Pangmatagalang Pag-unlad",
        slug: "luntiang-enerhiya",
      },
    ],
  },
];

export function getNavigationTopics(): DrawerTopicItem[] {
  return CANONICAL_TOPICS;
}
