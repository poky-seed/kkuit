export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.12 (cd3cf9e)'
  }
  public: {
    Tables: {
      choice_quiz: {
        Row: {
          is_multiple_choice: boolean
          quiz_id: string
        }
        Insert: {
          is_multiple_choice?: boolean
          quiz_id: string
        }
        Update: {
          is_multiple_choice?: boolean
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'choice_quiz_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: true
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          }
        ]
      }
      choice_quiz_answers: {
        Row: {
          option_id: string
          quiz_id: string
        }
        Insert: {
          option_id: string
          quiz_id: string
        }
        Update: {
          option_id?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'choice_quiz_answers_option_id_fkey'
            columns: ['option_id']
            isOneToOne: false
            referencedRelation: 'choice_quiz_options'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'choice_quiz_answers_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'choice_quiz'
            referencedColumns: ['quiz_id']
          }
        ]
      }
      choice_quiz_options: {
        Row: {
          id: string
          option_order: number
          option_text: string
          quiz_id: string
        }
        Insert: {
          id?: string
          option_order?: number
          option_text: string
          quiz_id: string
        }
        Update: {
          id?: string
          option_order?: number
          option_text?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'choice_quiz_options_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'choice_quiz'
            referencedColumns: ['quiz_id']
          }
        ]
      }
      long_answer_quiz: {
        Row: {
          answer: string
          grading_criteria: string | null
          quiz_id: string
        }
        Insert: {
          answer: string
          grading_criteria?: string | null
          quiz_id: string
        }
        Update: {
          answer?: string
          grading_criteria?: string | null
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'long_answer_quiz_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: true
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          }
        ]
      }
      ordering_quiz: {
        Row: {
          quiz_id: string
        }
        Insert: {
          quiz_id: string
        }
        Update: {
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'ordering_quiz_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: true
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          }
        ]
      }
      ordering_quiz_options: {
        Row: {
          answer_order: number
          id: string
          option_order: number
          option_text: string
          quiz_id: string
        }
        Insert: {
          answer_order: number
          id?: string
          option_order: number
          option_text: string
          quiz_id: string
        }
        Update: {
          answer_order?: number
          id?: string
          option_order?: number
          option_text?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'ordering_quiz_options_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'ordering_quiz'
            referencedColumns: ['quiz_id']
          }
        ]
      }
      ox_quiz: {
        Row: {
          answer: boolean
          quiz_id: string
        }
        Insert: {
          answer: boolean
          quiz_id: string
        }
        Update: {
          answer?: boolean
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'ox_quiz_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: true
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          }
        ]
      }
      quiz: {
        Row: {
          created_at: string | null
          creator_id: string | null
          explanation: string | null
          id: string
          is_public: boolean
          question: string
          quiz_type_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          explanation?: string | null
          id?: string
          is_public?: boolean
          question: string
          quiz_type_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          explanation?: string | null
          id?: string
          is_public?: boolean
          question?: string
          quiz_type_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_creator_id_fkey'
            columns: ['creator_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quiz_quiz_type_id_fkey'
            columns: ['quiz_type_id']
            isOneToOne: false
            referencedRelation: 'quiz_types'
            referencedColumns: ['id']
          }
        ]
      }
      quiz_queue_items: {
        Row: {
          last_solved_at: string | null
          quiz_id: string
          user_id: string
        }
        Insert: {
          last_solved_at?: string | null
          quiz_id: string
          user_id: string
        }
        Update: {
          last_solved_at?: string | null
          quiz_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_queue_items_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quiz_queue_items_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      quiz_set_items: {
        Row: {
          id: string
          item_order: number
          quiz_id: string
          quiz_set_id: string
        }
        Insert: {
          id?: string
          item_order: number
          quiz_id: string
          quiz_set_id: string
        }
        Update: {
          id?: string
          item_order?: number
          quiz_id?: string
          quiz_set_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_set_items_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quiz_set_items_quiz_set_id_fkey'
            columns: ['quiz_set_id']
            isOneToOne: false
            referencedRelation: 'quiz_sets'
            referencedColumns: ['id']
          }
        ]
      }
      quiz_sets: {
        Row: {
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          is_public: boolean
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          is_public?: boolean
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          is_public?: boolean
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_sets_creator_id_fkey'
            columns: ['creator_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      quiz_tags: {
        Row: {
          quiz_id: string
          tag_id: string
        }
        Insert: {
          quiz_id: string
          tag_id: string
        }
        Update: {
          quiz_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_tags_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quiz_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          }
        ]
      }
      quiz_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      short_answer_quiz: {
        Row: {
          quiz_id: string
        }
        Insert: {
          quiz_id: string
        }
        Update: {
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'short_answer_quiz_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: true
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          }
        ]
      }
      short_answer_quiz_answers: {
        Row: {
          answer: string
          id: string
          quiz_id: string
        }
        Insert: {
          answer: string
          id?: string
          quiz_id: string
        }
        Update: {
          answer?: string
          id?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'short_answer_quiz_answers_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'short_answer_quiz'
            referencedColumns: ['quiz_id']
          }
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_saved_quiz_sets: {
        Row: {
          created_at: string | null
          id: string
          quiz_set_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          quiz_set_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          quiz_set_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_saved_quiz_sets_quiz_set_id_fkey'
            columns: ['quiz_set_id']
            isOneToOne: false
            referencedRelation: 'quiz_sets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_saved_quiz_sets_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          email: string
          id: string
          nickname: string | null
        }
        Insert: {
          email: string
          id: string
          nickname?: string | null
        }
        Update: {
          email?: string
          id?: string
          nickname?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
