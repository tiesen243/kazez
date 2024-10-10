'use client'

import { useAction } from 'next-safe-action/hooks'

import { Button } from '@/components/ui/button'
import { signOut } from '@/server/actions'

export const SignOutBtn: React.FC = () => {
  const { execute, isPending } = useAction(signOut)

  return (
    <Button onClick={() => execute()} disabled={isPending}>
      Sign Out
    </Button>
  )
}
