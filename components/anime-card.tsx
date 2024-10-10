import Image from 'next/image'
import Link from 'next/link'

import type { Anime } from '@/hooks/use-animes'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { slugify } from '@/lib/utils'

export const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
  const title = anime.title.userPreferred ?? anime.title.romaji ?? anime.title.english ?? ''

  return (
    <Link href={`/anime/${slugify(title, anime.id)}`} passHref>
      <Card className="transition-colors ease-linear hover:bg-secondary">
        <Image
          src={anime.image}
          alt={slugify(title)}
          width={300}
          height={400}
          className="aspect-[3/4] w-full rounded-t-lg object-cover"
        />
        <CardHeader>
          <CardTitle className="line-clamp-1">{title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}

export const AnimeCardSkeleton: React.FC = () => (
  <Card>
    <Skeleton className="aspect-[3/4] w-full rounded-t-lg" />
    <CardHeader>
      <CardTitle className="line-clamp-1">Loading...</CardTitle>
    </CardHeader>
  </Card>
)
