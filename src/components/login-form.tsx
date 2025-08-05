import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">로그인</CardTitle>
          <CardDescription>소셜 계정으로 쉽고 빠르게 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </CardContent>
      </Card>
    </div>
  )
}

function GoogleLoginButton() {
  return (
    <Button variant="outline" className="w-full">
      Google로 로그인
    </Button>
  )
}

function KakaoLoginButton() {
  return (
    <Button variant="outline" className="w-full">
      Kakao로 로그인
    </Button>
  )
}
