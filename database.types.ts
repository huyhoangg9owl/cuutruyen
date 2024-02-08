export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      avatar: {
        Row: {
          created_at: string
          profile_id: number
          updated_at: string
          uri: string
        }
        Insert: {
          created_at?: string
          profile_id: number
          updated_at?: string
          uri?: string
        }
        Update: {
          created_at?: string
          profile_id?: number
          updated_at?: string
          uri?: string
        }
        Relationships: [
          {
            foreignKeyName: "avatar_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          }
        ]
      }
      badge: {
        Row: {
          badge_id: number
          created_at: string
          profile_id: number
        }
        Insert: {
          badge_id: number
          created_at?: string
          profile_id: number
        }
        Update: {
          badge_id?: number
          created_at?: string
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "badge_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: true
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "badge_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          }
        ]
      }
      badges: {
        Row: {
          id: number
          name: string
          path_dir: string
        }
        Insert: {
          id?: number
          name: string
          path_dir?: string
        }
        Update: {
          id?: number
          name?: string
          path_dir?: string
        }
        Relationships: []
      }
      history: {
        Row: {
          _id: number
          chapter_id: number
          created_at: string
          manga_id: number
        }
        Insert: {
          _id?: number
          chapter_id: number
          created_at?: string
          manga_id: number
        }
        Update: {
          _id?: number
          chapter_id?: number
          created_at?: string
          manga_id?: number
        }
        Relationships: []
      }
      profile: {
        Row: {
          _id: number
          created_at: string
          name: string
          updated_at: string
        }
        Insert: {
          _id?: number
          created_at?: string
          name?: string
          updated_at?: string
        }
        Update: {
          _id?: number
          created_at?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      rank: {
        Row: {
          created_at: string
          profile_id: number
          rank_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          profile_id: number
          rank_id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          profile_id?: number
          rank_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rank_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          }
        ]
      }
      setting: {
        Row: {
          created_at: string
          profile_id: number
          settings: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          profile_id?: number
          settings?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          profile_id?: number
          settings?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "setting_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
