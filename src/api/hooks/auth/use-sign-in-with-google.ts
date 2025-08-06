import { useMutation } from '@tanstack/react-query'
import { authFetch } from '@/api/fetches/auth-fetch'

export function useSignInWithGoogle() {
  const { mutate } = useMutation({
    mutationFn: () => authFetch.signIn('google'),
  })

  const signIn = () => {
    mutate()
  }

  return { signIn }
}
