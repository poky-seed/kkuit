import { useEffect, useState, type ReactNode } from 'react'
import { AuthContext } from './auth-context'
import type { User } from '@/entities'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const processSession = async (session: Session | null) => {
      setIsLoading(true)
      if (session) {
        setUser({ ...session.user })
      }
      if (!session) {
        setUser(null)
      }
      setIsLoading(false)
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      processSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      processSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>
}
