import Image from 'next/image'
import Link from 'next/link'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { slugify } from '@/lib/utils'

export const AnimeCard: React.FC<{
  anime: { id: string; title: string; image: string }
}> = ({ anime }) => {
  return (
    <Link href={`/anime/${slugify(anime.title, anime.id)}`} passHref>
      <Card className="transition-colors ease-linear hover:bg-secondary">
        <Image
          src={anime.image}
          alt={slugify(anime.title)}
          width={300}
          height={400}
          className="aspect-[3/4] w-full rounded-t-lg object-cover"
        />
        <CardHeader>
          <CardTitle className="line-clamp-1">{anime.title}</CardTitle>
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
