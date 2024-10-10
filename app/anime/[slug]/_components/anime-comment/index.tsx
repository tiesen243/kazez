'use client'

import { useQuery } from '@tanstack/react-query'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useSession } from '@/hooks/use-session'
import { getComments } from '@/server/actions'
import { CreateComment } from './create-comment'
import { RemoveComment } from './remove-comment'

export const AnimeComment: React.FC<{ id: string }> = ({ id }) => {
  const session = useSession()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => getComments({ id }),
  })

  if (isLoading)
    return (
      <section className="mt-4 flex flex-col gap-4">
        <Typography level="h2">Comments</Typography>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </section>
    )

  return (
    <section className="mt-4 flex flex-col gap-4">
      <Typography level="h2">Comments</Typography>
      {!data?.data ? (
        <p>No comments yet</p>
      ) : (
        data.data.map((comment) => (
          <Card key={comment.id}>
            {session?.userId === comment.userId && (
              <RemoveComment id={comment.id} refetch={refetch} />
            )}
            <CardHeader className="p-4">
              <CardDescription>{comment.user.name}</CardDescription>
              <CardTitle>{comment.content}</CardTitle>
            </CardHeader>
          </Card>
        ))
      )}

      {session && <CreateComment id={id} refetch={refetch} />}
    </section>
  )
}
