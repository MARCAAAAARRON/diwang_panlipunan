import { DrawerTopicItem } from "@/types/navigation";

export const CANONICAL_TOPICS: DrawerTopicItem[] = [
  {
    id: "topic-01",
    number: "01",
    slug: "kapaligiran",
    title: "Environment and Climate Change",
    description: "Susing pagsusuri sa krisis pangkolima, konserbasyon ng kalikasan, at pantay na pangangalaga sa likas-yaman.",
    themeColor: "var(--topic-kapaligiran)",
    subtopics: [
      {
        id: "subtopic-01-a",
        code: "a.",
        title: "Mga Suliraning Pangkapaligiran",
        slug: "mga-suliraning-pangkapaligiran",
      },
      {
        id: "subtopic-01-b",
        code: "b.",
        title: "Climate Change sa Pilipinas",
        slug: "climate-change-sa-pilipinas",
      },
      {
        id: "subtopic-01-c",
        code: "c.",
        title: "Mga Hakbang Tungo sa Sustainability",
        slug: "mga-hakbang-tungo-sa-sustainability",
      },
    ],
  },
  {
    id: "topic-02",
    number: "02",
    slug: "ekonomiya",
    title: "Economy and Livelihood",
    description: "Pagsipat sa implasyon, karapatan ng manggagawa, agrikultura, at makatarungang pag-unlad ng kabuhayan.",
    themeColor: "var(--topic-ekonomiya)",
    subtopics: [
      {
        id: "subtopic-02-a",
        code: "a.",
        title: "Implasyon at Presyo ng mga Bilihin",
        slug: "implasyon-at-presyo",
      },
      {
        id: "subtopic-02-b",
        code: "b.",
        title: "Kalagayan ng mga Manggagawa",
        slug: "kalagayan-ng-manggagawa",
      },
      {
        id: "subtopic-02-c",
        code: "c.",
        title: "Agrikultura at Repormang Agraryo",
        slug: "agrikultura-at-repormang-agraryo",
      },
    ],
  },
  {
    id: "topic-03",
    number: "03",
    slug: "pamahalaan",
    title: "Politics and Governance",
    description: "Mapanuring pagtingin sa mga pampublikong institusyon, pananagutan, at pamamahalang demokratiko.",
    themeColor: "var(--topic-pamahalaan)",
    subtopics: [
      {
        id: "subtopic-03-a",
        code: "a.",
        title: "Demokrasya at Partisipasyong Pampolitika",
        slug: "demokrasya-at-partisipasyon",
      },
      {
        id: "subtopic-03-b",
        code: "b.",
        title: "Korapsiyon at Pananagutan sa Pamahalaan",
        slug: "korapsiyon-at-pananagutan",
      },
      {
        id: "subtopic-03-c",
        code: "c.",
        title: "Desentralisasyon at Pamamahalang Lokal",
        slug: "desentralisasyon-at-lokal",
      },
    ],
  },
  {
    id: "topic-04",
    number: "04",
    slug: "karapatang-pantao",
    title: "Human Rights and Social Justice",
    description: "Pagtataguyod sa karapatang pantao, katarungang panlipunan, at dignidad ng bawat sektor.",
    themeColor: "var(--topic-karapatan)",
    subtopics: [
      {
        id: "subtopic-04-a",
        code: "a.",
        title: "Mga Batayang Karapatang Pantao",
        slug: "batayang-karapatan",
      },
      {
        id: "subtopic-04-b",
        code: "b.",
        title: "Katarungang Panlipunan at Karapatan ng Katutubo",
        slug: "katarungan-at-katutubo",
      },
      {
        id: "subtopic-04-c",
        code: "c.",
        title: "Kalayaan sa Pagpapahayag at Pamamahayag",
        slug: "kalayaan-sa-pagpapahayag",
      },
    ],
  },
  {
    id: "topic-05",
    number: "05",
    slug: "edukasyon",
    title: "Education and Society",
    description: "Pagsusuri sa kalidad, kakayahan, at pantay na oportunidad sa edukasyon ng kabataang Pilipino.",
    themeColor: "var(--topic-edukasyon)",
    subtopics: [
      {
        id: "subtopic-05-a",
        code: "a.",
        title: "Krisis sa Edukasyon at Pagkatuto",
        slug: "krisis-sa-edukasyon",
      },
      {
        id: "subtopic-05-b",
        code: "b.",
        title: "Aksesibilidad at Pagkakapantay-pantay",
        slug: "aksesibilidad-sa-edukasyon",
      },
      {
        id: "subtopic-05-c",
        code: "c.",
        title: "Digital Literacy at Makabagong Teknolohiya",
        slug: "digital-literacy-sa-paaralan",
      },
    ],
  },
  {
    id: "topic-06",
    number: "06",
    slug: "teknolohiya",
    title: "Globalization and Global Issues",
    description: "Ugnayang panlabas, migrasyon, soberanya, at ang pwesto ng Pilipinas sa pandaigdigang kaayusan.",
    themeColor: "var(--topic-teknolohiya)",
    subtopics: [
      {
        id: "subtopic-06-a",
        code: "a.",
        title: "Migrasyon at ang Karanasan ng mga OFW",
        slug: "migrasyon-at-ofw",
      },
      {
        id: "subtopic-06-b",
        code: "b.",
        title: "Ugnayang Panlabas at Soberanya sa Karagatan",
        slug: "ugnayang-panlabas-at-soberanya",
      },
      {
        id: "subtopic-06-c",
        code: "c.",
        title: "Pandaigdigang Kalakalan at Lokal na Industriya",
        slug: "pandaigdigang-kalakalan",
      },
    ],
  },
  {
    id: "topic-07",
    number: "07",
    slug: "kalusugan",
    title: "Sustainable Development",
    description: "Pagtutugma ng pag-unlad ng ekonomiya sa pangmatagalang kalusugan ng pamayanan at kalikasan.",
    themeColor: "var(--topic-kalusugan)",
    subtopics: [
      {
        id: "subtopic-07-a",
        code: "a.",
        title: "Kalusugang Pangkalahatan at Universal Health Care",
        slug: "kalusugang-pangkalahatan",
      },
      {
        id: "subtopic-07-b",
        code: "b.",
        title: "Seguridad sa Pagkain at Wastong Nutrisyon",
        slug: "seguridad-sa-pagkain",
      },
      {
        id: "subtopic-07-c",
        code: "c.",
        title: "Luntiang Enerhiya at Likas-kayang Pag-unlad",
        slug: "luntiang-enerhiya",
      },
    ],
  },
];

export function getNavigationTopics(): DrawerTopicItem[] {
  return CANONICAL_TOPICS;
}
