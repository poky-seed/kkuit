import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Link, Outlet } from 'react-router'
import { paths } from '@/routes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/auth/context'
import type { User } from '@/entities'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSignOut } from '@/api/hooks/auth'
import { LogOut } from 'lucide-react'

export function AppLayout() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <AppNavigation />
      <Outlet />
    </div>
  )
}

function AppNavigation() {
  const { user } = useAuth()

  return (
    <div className="flex justify-between items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <AppNavigationHome />
        </NavigationMenuList>
      </NavigationMenu>
      {user ? <AppNavigationProfile user={user} /> : <AppNavigationLogin />}
    </div>
  )
}

function AppNavigationHome() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link to={paths.root}>Home</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function AppNavigationProfile({ user }: { user: User }) {
  const { signOut } = useSignOut()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-2 h-fit">
          <Avatar>
            <AvatarImage src={user.user_metadata['avatar_url']} />
            <AvatarFallback>{user.user_metadata['name'].charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.user_metadata['avatar_url']} />
            <AvatarFallback>{user.user_metadata['name'].charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium">{user.user_metadata['name']}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="size-4" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AppNavigationLogin() {
  return (
    <Button asChild>
      <Link to={paths.login}>로그인</Link>
    </Button>
  )
}
