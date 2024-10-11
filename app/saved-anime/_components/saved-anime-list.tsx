'use client'

import { useQuery } from '@tanstack/react-query'

import { AnimeCard, AnimeCardSkeleton } from '@/components/anime-card'
import { getSavedAnime } from '@/server/actions'

export const SavedAnimeList: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['saved-anime-list'],
    queryFn: () => getSavedAnime(),
  })

  if (isLoading) return Array.from({ length: 8 }).map((_, i) => <AnimeCardSkeleton key={i} />)

  if (!data?.data || data.data.length === 0)
    return <p className="col-span-full text-center text-muted-foreground">No saved anime</p>

  return data.data.map((anime) => <AnimeCard key={anime.id} anime={anime} />)
}
