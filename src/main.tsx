import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoginForm } from '@/components/login-form'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          KKUIT
        </a>
        <LoginForm />
      </div>
    </div>
  </StrictMode>
)
