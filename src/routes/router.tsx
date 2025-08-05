import { createBrowserRouter } from 'react-router'
import { RootLayout } from './layouts/root-layout'
import { paths } from './paths'
import { LoginView } from '@/views/login'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: paths.root,
        element: <div>ROOT</div>,
      },
      {
        path: paths.login,
        element: <LoginView />,
      },
    ],
  },
])
