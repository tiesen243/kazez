import { useQuery } from '@tanstack/react-query'

import type { Genre, Status } from './anime.enum'
import type { Anime } from './use-animes'

export const useAnime = (id: string) =>
  useQuery({
    queryKey: ['anime', id],
    queryFn: async () => {
      const res = await fetch(
        `https://consumet-api-production-9bed.up.railway.app/meta/anilist/info/${id}`,
      )

      const json = (await res.json()) as AnimeDetails

      return json
    },
  })

export interface AnimeDetails {
  id: string
  malId: number
  title: {
    romaji?: string
    english?: string
    native?: string
  }
  synonyms: string[]
  image: string
  cover: string
  description: string
  genres: Genre[]
  popularity: number
  rating: number
  status: Status
  season: string
  studios: string[]
  releaseDate: number
  startDate: {
    year: number
    month: number
    day: number
  }
  endDate: {
    year: number
    month: number
    day: number
  }
  totalEpisodes: number
  currentEpisode: number
  isLicensed: boolean
  isAdult: boolean
  trailer?: {
    id: string
    site: string
    thumbnail: string
  }
  recommendations: Anime[]
  episodes: Episode[]
}

export interface Episode {
  id: string
  title: string
  number: number
  image: string
}
