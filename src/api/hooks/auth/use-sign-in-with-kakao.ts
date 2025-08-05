import { useMutation } from '@tanstack/react-query'
import { authFetch } from '@/api/fetches/auth-fetch'

export function useSignInWithKakao() {
  const { mutate } = useMutation({
    mutationFn: () => authFetch.signIn('kakao'),
  })

  const signIn = () => {
    mutate()
  }

  return { signIn }
}
