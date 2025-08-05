import { createBrowserRouter } from 'react-router'
import { RootLayout } from './layouts/root-layout'
import { paths } from './paths'
import { LoginView } from '@/views/login'
import { OnlyPublicGuard } from '@/auth/guard'
import { AppLayout } from './layouts/app-layout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: paths.root,
            element: <div>Home</div>,
          },
        ],
      },
      {
        path: paths.login,
        element: (
          <OnlyPublicGuard>
            <LoginView />
          </OnlyPublicGuard>
        ),
      },
    ],
  },
])
