export interface DrawerSubtopicItem {
  id: string;
  code: string;
  title: string;
  slug: string;
}

export interface DrawerTopicItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  description: string;
  themeColor: string;
  subtopics: DrawerSubtopicItem[];
}

export interface DrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  activeTopicSlug: string | null;
  setActiveTopicSlug: (slug: string | null) => void;
}
