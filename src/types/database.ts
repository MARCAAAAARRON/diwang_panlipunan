export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "admin" | "editor" | "viewer" | "user";
export type SuggestionStatus = "pending" | "in_review" | "implemented" | "dismissed";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      topics: {
        Row: {
          id: string;
          slug: string;
          name_fil: string;
          name_en: string;
          description_fil: string;
          description_en: string | null;
          icon_name: string;
          color_token: string;
          order_index: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_fil: string;
          name_en: string;
          description_fil: string;
          description_en?: string | null;
          icon_name: string;
          color_token: string;
          order_index?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_fil?: string;
          name_en?: string;
          description_fil?: string;
          description_en?: string | null;
          icon_name?: string;
          color_token?: string;
          order_index?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      subtopics: {
        Row: {
          id: string;
          topic_id: string;
          slug: string;
          title: string;
          summary: string;
          content_markdown: string;
          read_time_minutes: number;
          cover_image_url?: string | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
          search_vector: unknown | null;
        };
        Insert: {
          id?: string;
          topic_id: string;
          slug: string;
          title: string;
          summary: string;
          content_markdown: string;
          read_time_minutes?: number;
          cover_image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
          search_vector?: unknown | null;
        };
        Update: {
          id?: string;
          topic_id?: string;
          slug?: string;
          title?: string;
          summary?: string;
          content_markdown?: string;
          read_time_minutes?: number;
          cover_image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
          search_vector?: unknown | null;
        };
      };
      sources: {
        Row: {
          id: string;
          subtopic_id: string;
          title: string;
          author: string | null;
          publication: string;
          url: string;
          published_date: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          subtopic_id: string;
          title: string;
          author?: string | null;
          publication: string;
          url: string;
          published_date?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          subtopic_id?: string;
          title?: string;
          author?: string | null;
          publication?: string;
          url?: string;
          published_date?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      feedback: {
        Row: {
          id: string;
          subtopic_id: string;
          is_helpful: boolean;
          comment: string | null;
          client_ip_hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subtopic_id: string;
          is_helpful: boolean;
          comment?: string | null;
          client_ip_hash?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subtopic_id?: string;
          is_helpful?: boolean;
          comment?: string | null;
          client_ip_hash?: string | null;
          created_at?: string;
        };
      };
      suggestions: {
        Row: {
          id: string;
          topic_title: string;
          description: string;
          rationale: string | null;
          contact_email: string | null;
          status: SuggestionStatus;
          client_ip_hash: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          topic_title: string;
          description: string;
          rationale?: string | null;
          contact_email?: string | null;
          status?: SuggestionStatus;
          client_ip_hash?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          topic_title?: string;
          description?: string;
          rationale?: string | null;
          contact_email?: string | null;
          status?: SuggestionStatus;
          client_ip_hash?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
  };
}
