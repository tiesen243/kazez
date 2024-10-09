import { useQuery } from '@tanstack/react-query'

export const useEpisode = (id: string) =>
  useQuery({
    queryKey: ['episode', id],
    queryFn: async () => {
      const res = await fetch(
        `https://consumet-api-production-9bed.up.railway.app/meta/anilist/watch/${id}`,
      )
      const json = (await res.json()) as Episode
      return json
    },
  })

export interface Episode {
  download: string
  headers: { Referer: string }
  sources: { url: string; isM3U8: boolean; quality: string }[]
}
