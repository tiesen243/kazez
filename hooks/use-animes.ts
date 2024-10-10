import { useQuery } from '@tanstack/react-query'

import { Format, Genre, Season, Sort, Status } from './anime.enum'

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
  isRecent?: boolean
}

export const useAnimes = ({
  query,
  genres,
  format,
  status,
  season,
  year,
  sort,
  page = 1,
  perPage = 10,
  isRecent = false,
}: UseAnimesOptions) =>
  useQuery({
    queryKey: [
      'animes',
      page,
      query,
      genres,
      format,
      status,
      season,
      year,
      sort,
      perPage,
      isRecent,
    ],
    queryFn: async () => {
      // @ts-expect-error URLSearchParams is not defined
      const sp = new URLSearchParams({
        ...(query && { query }),
        ...(genres && { genres }),
        ...(format && { format }),
        ...(status && { status }),
        ...(season && { season }),
        ...(year && { year }),
        ...(sort && { sort }),

        page,
        perPage,
      }).toString()

      const url = isRecent
        ? `recent-episodes?page=${page}&perPage=${perPage}`
        : `advanced-search?${sp}`

      const res = await fetch(
        `https://consumet-api-production-9bed.up.railway.app/meta/anilist/${url}`,
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

export const getCurrentSeason = () => {
  const month = new Date().getMonth()
  if (month >= 1 && month <= 3) return Season.Winter
  if (month >= 4 && month <= 6) return Season.Spring
  if (month >= 7 && month <= 9) return Season.Summer
  return Season.Fall
}
