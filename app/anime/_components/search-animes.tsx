'use client'

import type { Format, Genre, Season, Status } from '@/hooks/anime.enum'
import { AnimeCard, AnimeCardSkeleton } from '@/components/anime-card'
import { useAnimes } from '@/hooks/use-animes'

export const SearchAnimes: React.FC<SearchAnimesProps> = (props) => {
  const { data, isLoading } = useAnimes({
    query: props.q,
    format: props.format,
    season: props.season,
    genres: props.genres,
    year: Number(props.year),
    status: props.status,
    page: Number(props.page ?? 1),
    perPage: 12,
  })

  if (isLoading || !data?.results)
    return (
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <AnimeCardSkeleton key={i} />
        ))}
      </section>
    )

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data.results.length === 0 ? (
        <p className="col-span-2 text-center text-xl text-muted-foreground md:col-span-3 lg:col-span-4">
          No results found
        </p>
      ) : (
        data.results.map((anime) => <AnimeCard key={anime.id} anime={anime} />)
      )}
    </section>
  )
}

export interface SearchAnimesProps {
  q?: string
  format?: Format
  genres?: Genre[]
  year?: string
  season?: Season
  status?: Status
  page?: string
}
