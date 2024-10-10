'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useAnime } from '@/hooks/use-anime'
import { cn } from '@/lib/utils'

interface Props {
  id: string
  slug: string
  currentEpisode?: string
  className?: string
}

export const EpisodeList: React.FC<Props> = ({ id, slug, currentEpisode, className }) => {
  const { data, isLoading } = useAnime(id)

  if (isLoading || !data)
    return (
      <section className="mt-4">
        <Typography level="h2">Episodes</Typography>

        <ul className={cn('mt-4 gap-4', className)}>
          {Array.from({ length: 12 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-10 w-full" />
            </li>
          ))}
        </ul>
      </section>
    )

  return (
    <section className="mt-4 flex-1">
      <Typography level="h2">Episodes</Typography>

      <ul className={cn('mt-4 gap-4', className)}>
        {data.episodes.map((episode) => (
          <li key={episode.id}>
            <Button
              variant="outline"
              className={cn('w-full', {
                'bg-accent text-accent-foreground': currentEpisode === episode.id,
              })}
              asChild
            >
              <Link href={`/anime/${slug}/${episode.id}`}>{episode.title ?? episode.number}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
