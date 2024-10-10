import { useState } from 'react'
import { SendHorizonal } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addComment } from '@/server/actions'

export const CreateComment: React.FC<{ id: string; refetch: () => Promise<unknown> }> = ({
  id,
  refetch,
}) => {
  const [content, setContent] = useState<string>('')
  const { executeAsync, isPending } = useAction(addComment)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!content) return
        await executeAsync({ id, content })
        await refetch()
        setContent('')
      }}
      className="flex items-center gap-2"
    >
      <Input
        name="content"
        placeholder="Write a comment"
        disabled={isPending}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="outline" size="icon" disabled={isPending}>
        <SendHorizonal />
      </Button>
    </form>
  )
}
