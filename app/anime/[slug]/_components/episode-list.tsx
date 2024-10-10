'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useAnime } from '@/hooks/use-anime'

interface Props {
  id: string
  slug: string
  currentEpisode?: string
}

export const EpisodeList: React.FC<Props> = ({ id, slug, currentEpisode }) => {
  const { data, isLoading } = useAnime(id)

  if (isLoading || !data)
    return (
      <section className="mt-4">
        <Typography level="h2">Episodes</Typography>

        <ul className="mt-4 flex flex-wrap gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-10 w-24" />
            </li>
          ))}
        </ul>
      </section>
    )

  return (
    <section className="mt-4 flex-1">
      <Typography level="h2">Episodes</Typography>

      <ul className="mt-4 flex h-full max-h-[200px] flex-wrap gap-4 overflow-y-auto">
        {data.episodes.map((episode) => (
          <li key={episode.id}>
            <Button
              variant="outline"
              className={currentEpisode === episode.id ? 'bg-accent text-accent-foreground' : ''}
              asChild
            >
              <Link href={`/anime/${slug}/${episode.id}`}>{episode.title}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
