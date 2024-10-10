'use client'

import { AnimeCard, AnimeCardSkeleton } from '@/components/anime-card'
import { useAnimes } from '@/hooks/use-animes'

export const RecentEpisodes: React.FC<{ page: string }> = ({ page = '1' }) => {
  const { data, isLoading } = useAnimes({ isRecent: true, page: Number(page), perPage: 12 })

  if (isLoading || !data)
    return (
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <AnimeCardSkeleton key={index} />
        ))}
      </section>
    )

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data.results.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </section>
  )
}
