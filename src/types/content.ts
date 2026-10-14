import type { Database } from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Topic = Database["public"]["Tables"]["topics"]["Row"];
export type Subtopic = Database["public"]["Tables"]["subtopics"]["Row"];
export type Source = Database["public"]["Tables"]["sources"]["Row"];
export type Feedback = Database["public"]["Tables"]["feedback"]["Row"];
export type Suggestion = Database["public"]["Tables"]["suggestions"]["Row"];

export interface SubtopicWithSources extends Subtopic {
  sources: Source[];
  topic?: Topic;
}

export interface TopicWithSubtopics extends Topic {
  subtopics: Subtopic[];
}

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  iconName?: string;
}
