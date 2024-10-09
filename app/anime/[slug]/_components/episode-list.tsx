'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useAnime } from '@/hooks/use-anime'

export const EpisodeList: React.FC<{ id: string }> = ({ id }) => {
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
    <section className="mt-4">
      <Typography level="h2">Episodes</Typography>

      <ul className="mt-4 flex flex-wrap gap-4">
        {data.episodes.map((episode) => (
          <li key={episode.id}>
            <Button variant="outline">
              {episode.number} - {episode.title}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
