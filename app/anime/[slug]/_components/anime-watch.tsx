'use client'

import Image from 'next/image'
import Link from 'next/link'
import NextVideo from 'next-video'

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
        <NextVideo src={episode.data.sources.at(-1)?.url} className="rounded-lg" controls>
          <Image
            src={animeDetails.data.cover}
            alt={animeDetails.data.title.english}
            slot="poster"
            className="h-full w-full object-cover"
            fill
          />
        </NextVideo>
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
