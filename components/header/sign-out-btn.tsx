import { LogOutIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { signOut } from '@/server/actions'

export const SignOutBtn: React.FC = () => {
  const { execute, isPending } = useAction(signOut)

  return (
    <DropdownMenuItem onClick={() => execute()} disabled={isPending}>
      <LogOutIcon className="mr-2 size-4" /> Sign Out
    </DropdownMenuItem>
  )
}
