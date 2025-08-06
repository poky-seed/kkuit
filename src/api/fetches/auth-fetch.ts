import { supabase } from '@/lib/supabase'
import { paths } from '@/routes'

export const authFetch = {
  signIn: async (provider: 'google' | 'kakao') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: paths.root,
      },
    })
  },

  signOut: async () => {
    await supabase.auth.signOut()
  },
}
