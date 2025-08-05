import type { ReactNode } from 'react'
import { useAuth } from '@/auth/context'
import { LoaderCircle } from 'lucide-react'
import { Navigate } from 'react-router'
import { paths } from '@/routes'

export function OnlyPublicGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />
  }

  if (user) {
    return <Navigate to={paths.root} />
  }

  return children
}
