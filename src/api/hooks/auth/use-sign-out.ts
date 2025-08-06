import { useMutation } from '@tanstack/react-query'
import { authFetch } from '@/api/fetches/auth-fetch'

export function useSignOut() {
  const { mutate } = useMutation({
    mutationFn: () => authFetch.signOut(),
  })

  const signOut = () => {
    mutate()
  }

  return { signOut }
}
