import type { User } from '@/entities'
import { createContext } from 'react'

export type AuthContextType = {
  user: User | null
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
})
