'use client'

import { AnimeCard, AnimeCardSkeleton } from '@/components/anime-card'
import { Typography } from '@/components/ui/typography'
import { useAnime } from '@/hooks/use-anime'

export const AnimeRecommendations: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useAnime(id)

  if (isLoading || !data)
    return (
      <section className="mt-4">
        <Typography level="h2">Recommendations</Typography>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <AnimeCardSkeleton key={index} />
          ))}
        </div>
      </section>
    )

  return (
    <section className="mt-4">
      <Typography level="h2">Recommendations</Typography>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.recommendations.slice(0, 4).map((r) => (
          <AnimeCard
            key={r.id}
            anime={{
              id: r.id,
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              title: r.title?.userPreferred ?? r.title?.romaji ?? r.title?.english ?? ' ',
              image: r.image,
            }}
          />
        ))}
      </div>
    </section>
  )
}
