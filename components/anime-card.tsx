import Image from 'next/image'
import Link from 'next/link'

import type { Anime } from '@/hooks/anime'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { slugify } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'

export const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => (
  <Link href={`/anime/${slugify(anime.title.userPreferred, anime.id)}`} passHref>
    <Card className="transition-colors ease-linear hover:bg-secondary">
      <Image
        src={anime.image}
        alt={anime.title.userPreferred}
        width={300}
        height={400}
        className="aspect-[3/4] w-full rounded-t-lg object-cover"
      />
      <CardHeader>
        <CardTitle className="line-clamp-1">
          {anime.title.userPreferred || anime.title.romaji || anime.title.english}
        </CardTitle>
        <CardDescription>
          Rating: {anime.rating} - Popularity: {anime.popularity} <br />
          Current episode: {anime.currentEpisode}
        </CardDescription>
      </CardHeader>
    </Card>
  </Link>
)

export const AnimeCardSkeleton: React.FC = () => (
  <Card>
    <Skeleton className="aspect-[3/4] w-full rounded-t-lg" />
    <CardHeader>
      <CardTitle className="line-clamp-1">Loading...</CardTitle>
      <CardDescription>Loading...</CardDescription>
    </CardHeader>
  </Card>
)
