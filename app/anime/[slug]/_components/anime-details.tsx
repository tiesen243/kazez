'use client'

import Image from 'next/image'
import { useAction } from 'next-safe-action/hooks'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useAnime } from '@/hooks/use-anime'
import { slugify } from '@/lib/utils'
import { toggleSaveAnime } from '@/server/actions'

export const AnimeDetails: React.FC<{ id: string; isAuth?: boolean }> = ({
  id,
  isAuth = false,
}) => {
  const { data, isLoading } = useAnime(id)

  const { execute, isPending, result } = useAction(toggleSaveAnime)

  if (isLoading || !data)
    return (
      <section className="grid gap-4 p-6 md:grid-cols-3">
        <article className="rounded-lg bg-background/70 p-4 shadow-lg backdrop-blur-sm md:col-span-2">
          <Skeleton className="mb-2 h-10 w-1/2" />
          <Skeleton className="h-8 w-1/3" />

          <hr className="my-4" />

          <ul className="mt-4 flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </ul>

          <Skeleton className="mt-7 h-20" />

          <div className="mt-7 flex items-center justify-between gap-16">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        </article>

        <Skeleton className="aspect-[3/4] w-full rounded-lg object-cover shadow-lg" />
      </section>
    )

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const title = data.title?.romaji ?? data.title?.english ?? data.title?.native ?? 'Unknown'

  return (
    <section className="grid gap-4 p-6 md:grid-cols-3">
      <Image
        src={data.cover}
        alt={`${slugify(title)}-cover`}
        className="rounded-md object-cover"
        fill
      />

      <article className="flex flex-col rounded-lg bg-background/70 p-4 shadow-lg backdrop-blur-sm md:col-span-2">
        <Typography level="h1" className="mb-2">
          {title}
        </Typography>

        <ul className="mt-4 flex items-center gap-2">
          {data.genres.map((genre) => (
            <Badge key={genre}>{genre}</Badge>
          ))}
        </ul>

        <Typography dangerouslySetInnerHTML={{ __html: data.description }} />

        <div className="flex flex-1 items-center justify-between">
          <Typography>Studio: {data.studios.join(', ')}</Typography>
          <Typography>Status: {data.status}</Typography>
          <Typography>
            Episodes: {data.currentEpisode}/{data.totalEpisodes}
          </Typography>
          <Typography>Rating: {data.rating}</Typography>
          <Typography>Popularity: {data.popularity}</Typography>
        </div>

        {isAuth && (
          <Button
            onClick={() => execute({ id: data.id, title, image: data.image })}
            disabled={isPending}
          >
            {data.isInList || result.data?.saved ? 'Remove from list' : 'Add to list'}
          </Button>
        )}
      </article>

      <Image
        src={data.image}
        alt={`${slugify(title)}-image`}
        width={200}
        height={300}
        className="hidden aspect-[3/4] w-full rounded-lg object-cover shadow-lg md:block"
      />
    </section>
  )
}
