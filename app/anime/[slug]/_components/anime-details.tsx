'use client'

import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useAnime } from '@/hooks/use-anime'

export const AnimeDetails: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useAnime(id)

  if (isLoading || !data)
    return (
      <section className="grid grid-cols-3 gap-4 p-6">
        <article className="col-span-2 rounded-lg bg-background/70 p-4 shadow-lg backdrop-blur-sm">
          <Skeleton className="mb-2 h-10 w-1/2" />
          <Skeleton className="h-8 w-1/3" />

          <hr className="my-4" />

          <ul className="mt-4 flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </ul>

          <Skeleton className="mt-7 h-20" />

          <div className="mt-7 flex items-center justify-between gap-16">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        </article>

        <Skeleton className="aspect-[3/4] w-full rounded-lg object-cover shadow-lg" />
      </section>
    )

  return (
    <section className="grid grid-cols-3 gap-4 p-6">
      <Image src={data.cover} alt={data.title.romaji} className="rounded-md object-cover" fill />
      <article className="col-span-2 rounded-lg bg-background/70 p-4 shadow-lg backdrop-blur-sm">
        <Typography level="h1" className="mb-2">
          {data.title.romaji}
        </Typography>
        <Typography level="h2">{data.title.english}</Typography>

        <ul className="mt-4 flex items-center gap-2">
          {data.genres.map((genre) => (
            <Badge key={genre}>{genre}</Badge>
          ))}
        </ul>

        <Typography dangerouslySetInnerHTML={{ __html: data.description }} />

        <div className="flex items-center justify-between">
          <Typography>Studio: {data.studios.join(', ')}</Typography>
          <Typography>Status: {data.status}</Typography>
          <Typography>
            Episodes: {data.currentEpisode}/{data.totalEpisodes}
          </Typography>
          <Typography>Rating: {data.rating}</Typography>
          <Typography>Popularity: {data.popularity}</Typography>
        </div>
      </article>

      <Image
        src={data.image}
        alt={data.title.romaji}
        width={200}
        height={300}
        className="aspect-[3/4] w-full rounded-lg object-cover shadow-lg"
      />
    </section>
  )
}
