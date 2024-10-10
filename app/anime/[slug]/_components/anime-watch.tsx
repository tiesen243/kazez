'use client'

import Link from 'next/link'
import ReactPlayer from 'react-player'

import { EpisodeList } from '@/app/anime/[slug]/_components/episode-list'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useAnime } from '@/hooks/use-anime'
import { useEpisode } from '@/hooks/use-episode'
import { getIdFromSlug } from '@/lib/utils'

export interface Props {
  params: { slug: string; episodeId: string }
}

export const AnimeWatch: React.FC<Props> = ({ params }) => {
  const episode = useEpisode(params.episodeId)
  const animeDetails = useAnime(getIdFromSlug(params.slug))

  const isEpisodeLoading = episode.isLoading || !episode.data
  const isAnimeLoading = animeDetails.isLoading || !animeDetails.data

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {isEpisodeLoading || isAnimeLoading ? (
        <Skeleton className="aspect-video w-full" />
      ) : (
        <div className="aspect-video w-full">
          <ReactPlayer
            url={
              episode.data.sources.find((source) => source.quality === '1080p')?.url ??
              episode.data.sources.find((source) => source.quality === '720p')?.url ??
              episode.data.sources.find((source) => source.quality === '480p')?.url ??
              episode.data.sources.find((source) => source.quality === '360p')?.url ??
              episode.data.sources.at(-1)?.url
            }
            light={animeDetails.data.cover}
            width="100%"
            controls
            playing
            pip
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {isAnimeLoading ? (
          <Skeleton className="h-10 w-1/2" />
        ) : (
          <Link href={`/anime/${params.slug}`} passHref>
            <Typography level="h1">{animeDetails.data.title.english}</Typography>
          </Link>
        )}

        <EpisodeList
          id={getIdFromSlug(params.slug)}
          slug={params.slug}
          currentEpisode={params.episodeId}
          className="grid max-h-[400px] grid-cols-4 overflow-y-auto md:max-h-[150px] lg:grid-cols-6"
        />
      </div>
    </section>
  )
}
