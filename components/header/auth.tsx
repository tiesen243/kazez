'use client'

import Link from 'next/link'
import { BookMarkedIcon } from 'lucide-react'

import { SignOutBtn } from '@/components/header/sign-out-btn'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8 ring-ring hover:ring-2">
          <AvatarImage src={session.user.avatar} alt={session.user.username} />
          <AvatarFallback>{session.user.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-4" align="end">
        <DropdownMenuLabel>{session.user.name ?? session.user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/saved-anime">
            <BookMarkedIcon className="mr-2 size-4" /> Your saved anime
          </Link>
        </DropdownMenuItem>

        <SignOutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
