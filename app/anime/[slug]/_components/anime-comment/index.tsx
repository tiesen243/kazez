'use client'

import { useQuery } from '@tanstack/react-query'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
          <div key={index} className="pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="z-10 size-8 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            <div className="absolute left-4 top-1 h-full w-[1px] animate-pulse bg-secondary" />

            <Skeleton className="ml-10 mr-16 mt-2 h-6 w-4/5" />
          </div>
        ))}
      </section>
    )

  return (
    <section className="mt-4 flex flex-col">
      <Typography level="h2" className="mb-4">
        Comments
      </Typography>
      {!data?.data ? (
        <p>No comments yet</p>
      ) : (
        data.data.map((comment) => (
          <div key={comment.id} className="pb-4">
            {session?.userId === comment.userId && (
              <RemoveComment id={comment.id} refetch={refetch} />
            )}

            <div className="flex items-center gap-2">
              <Avatar className="z-10 size-8">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-sm">{comment.user.name}</p>
                <span className="text-xs text-muted-foreground">
                  {comment.createdAt.toDateString()}
                </span>
              </div>
            </div>

            <div className="absolute left-4 top-1 h-full w-[1px] bg-muted-foreground" />

            <p className="break-all pl-10 pr-16 pt-2">{comment.content}</p>
          </div>
        ))
      )}

      {session && <CreateComment id={id} refetch={refetch} />}
    </section>
  )
}
