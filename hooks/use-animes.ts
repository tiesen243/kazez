import { useQuery } from '@tanstack/react-query'

import type { Format, Genre, Sort, Status } from './anime.enum'
import { Season } from './anime.enum'

interface UseAnimesOptions {
  page?: number
  query?: string
  genres?: Genre[]
  format?: Format | ''
  season?: Season | ''
  year?: number
  status?: Status | ''
  sort?: Sort[]
  perPage?: number
}

export const useAnimes = ({
  page = 1,
  query = '',
  genres = [],
  format = '',
  status = '',
  season = getSeason(),
  year = new Date().getFullYear(),
  sort = [],
  perPage = 10,
}: UseAnimesOptions) =>
  useQuery({
    queryKey: ['animes', page, query, genres, format, status, season, year, sort],
    queryFn: async () => {
      // @ts-expect-error URLSearchParams is not defined
      const sp = new URLSearchParams({
        ...(query && { query }),
        page,
        season,
        year,
        perPage,
      }).toString()

      const res = await fetch(
        `https://consumet-api-production-9bed.up.railway.app/meta/anilist/advanced-search?${sp}`,
      )

      const json = (await res.json()) as {
        currentPage: number
        hasNextPage: boolean
        totalPages: number
        results: Anime[]
      }

      return json
    },
  })

export interface Anime {
  id: string
  malId: number
  title: {
    userPreferred: string
    english: string
    romaji: string
  }
  image: string
  cover: string
  description: string
  genres: Genre[]
  currentEpisode: number
  totalEpisodes: number
  status: string
  releaseDate: number
  rating: number
  popularity: number
}

const getSeason = () => {
  const month = new Date().getMonth()
  if (month >= 1 && month <= 3) return Season.Winter
  if (month >= 4 && month <= 6) return Season.Spring
  if (month >= 7 && month <= 9) return Season.Summer
  return Season.Fall
}
