'use client'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/use-session'

export const Auth: React.FC = () => {
  const session = useSession()

  if (!session)
    return (
      <form action="/api/auth/discord" method="GET">
        <Button variant="outline">Login</Button>
      </form>
    )

  return (
    <Link href="/profile">
      <Avatar>
        <AvatarImage src={session.user.avatar} alt={session.user.username} />
        <AvatarFallback>{session.user.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </Link>
  )
}
