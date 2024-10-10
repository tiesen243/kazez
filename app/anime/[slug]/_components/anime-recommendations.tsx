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
        {data.recommendations.slice(0, 4).map((recommendation) => (
          <AnimeCard key={recommendation.id} anime={recommendation} />
        ))}
      </div>
    </section>
  )
}
