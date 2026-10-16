import { DrawerTopicItem } from "@/types/navigation";

export const CANONICAL_TOPICS: DrawerTopicItem[] = [
  {
    id: "topic-01",
    number: "01",
    slug: "kahalagahan-pag-aaral-kontemporaryong-isyu",
    title: "Kahalagahan ng Pag-aaral ng mga Kontemporaryong Isyu",
    description: "Paglinang sa kritikal na pag-iisip, pagiging mapanuri, at aktibong pakikilahok sa mga napapanahong usapin sa lipunan.",
    themeColor: "var(--topic-edukasyon)",
    subtopics: [
      {
        id: "subtopic-01-a",
        code: "a.",
        title: "Aralin 1: Konsepto at Katuturan ng Kontemporaryong Isyu",
        slug: "konsepto-at-katuturan-ng-kontemporaryong-isyu",
      },
      {
        id: "subtopic-01-b",
        code: "b.",
        title: "Aralin 2: Kasanayan sa Pagsusuri ng mga Isyung Panlipunan",
        slug: "kasanayan-sa-pagsusuri-ng-isyu",
      },
      {
        id: "subtopic-01-c",
        code: "c.",
        title: "Aralin 3: Kahalagahan ng Aktibong Pagkamamamayan",
        slug: "kahalagahan-ng-aktibong-pagkamamamayan",
      },
    ],
  },
  {
    id: "topic-02",
    number: "02",
    slug: "mga-suliraning-pangkapaligiran",
    title: "Mga Suliraning Pangkapaligiran",
    description: "Susing pagsusuri sa krisis pangklima, solid waste management, deforestation, at makatarungang pangangalaga sa kalikasan.",
    themeColor: "var(--topic-kapaligiran)",
    subtopics: [
      {
        id: "subtopic-02-a",
        code: "a.",
        title: "Aralin 1: Suliranin sa Solid Waste at Polusyon",
        slug: "suliranin-sa-solid-waste",
      },
      {
        id: "subtopic-02-b",
        code: "b.",
        title: "Aralin 2: Pagkasira ng Likas na Yaman at Deforestation",
        slug: "pagkasira-ng-likas-na-yaman",
      },
      {
        id: "subtopic-02-c",
        code: "c.",
        title: "Aralin 3: Climate Change at Disaster Risk Reduction Management",
        slug: "climate-change-at-cbdrrm",
      },
    ],
  },
  {
    id: "topic-03",
    number: "03",
    slug: "mga-isyung-pang-ekonomiya",
    title: "Mga Isyung Pang-ekonomiya",
    description: "Pagsusuri sa globalisasyon, kalagayan ng mga manggagawa, migrasyon, at makatarungang kabuhayan sa lipunan.",
    themeColor: "var(--topic-ekonomiya)",
    subtopics: [
      {
        id: "subtopic-03-a",
        code: "a.",
        title: "Aralin 1: Globalisasyon: Konsepto, Anyo, at Perspektibo",
        slug: "globalisasyon-anyo-at-perspektibo",
      },
      {
        id: "subtopic-03-b",
        code: "b.",
        title: "Aralin 2: Mga Isyu sa Paggawa at Karapatan ng Manggagawa",
        slug: "mga-isyu-sa-paggawa",
      },
      {
        id: "subtopic-03-c",
        code: "c.",
        title: "Aralin 3: Migrasyon at Epekto sa Pamilyang Pilipino",
        slug: "migrasyon-at-pamilya",
      },
    ],
  },
];
