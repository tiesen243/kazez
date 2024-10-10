import { XIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'

import { Button } from '@/components/ui/button'
import { deleteComment } from '@/server/actions'

export const RemoveComment: React.FC<{ id: string; refetch: () => Promise<unknown> }> = ({
  id,
  refetch,
}) => {
  const { executeAsync, isPending } = useAction(deleteComment)

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={async () => {
        await executeAsync({ id })
        await refetch()
      }}
      disabled={isPending}
      className="absolute right-2 top-2 z-10"
    >
      <XIcon />
    </Button>
  )
}
