import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { auth } from '@/server/auth'

export const Auth: React.FC = async () => {
  const session = await auth()

  if (!session)
    return (
      <form action="/api/auth/discord" method="GET">
        <Button variant="outline">Login</Button>
      </form>
    )

  return (
    <Link href={`/u/${session.user.id}`}>
      <Avatar>
        <AvatarImage src={session.user.avatar} alt={session.user.username} />
        <AvatarFallback>{session.user.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </Link>
  )
}
