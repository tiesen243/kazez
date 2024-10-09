'use client'

import Link from 'next/link'
import ReactPlayer from 'react-player'

import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useAnime } from '@/hooks/use-anime'
import { useEpisode } from '@/hooks/use-episode'
import { getIdFromSlug } from '@/lib/utils'
import { EpisodeList } from './episode-list'

export interface Props {
  params: { slug: string; episodeId: string }
}

export const AnimeWatch: React.FC<Props> = ({ params }) => {
  const episode = useEpisode(params.episodeId)
  const animeDetails = useAnime(getIdFromSlug(params.slug))

  const isEpisodeLoading = episode.isLoading || !episode.data
  const isAnimeLoading = animeDetails.isLoading || !animeDetails.data

  return (
    <section className="grid grid-cols-2 gap-4">
      {isEpisodeLoading || isAnimeLoading ? (
        <Skeleton className="aspect-video w-full" />
      ) : (
        <div className="aspect-video">
          <ReactPlayer
            url={episode.data.sources.at(-1)?.url}
            light={animeDetails.data.cover}
            playing
            controls
            pip
          />
        </div>
      )}

      <div>
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
        />
      </div>
    </section>
  )
}
