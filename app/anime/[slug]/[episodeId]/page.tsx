import type { NextPage } from 'next'

import type { Props } from '@/app/anime/[slug]/_components/anime-watch'
import { AnimeComment } from '@/app/anime/[slug]/_components/anime-comment'
import { AnimeRecommendations } from '@/app/anime/[slug]/_components/anime-recommendations'
import { AnimeWatch } from '@/app/anime/[slug]/_components/anime-watch'
import { getIdFromSlug } from '@/lib/utils'

const Page: NextPage<Props> = ({ params }) => (
  <main className="container my-4">
    <AnimeWatch params={params} />
    <AnimeComment id={getIdFromSlug(params.slug)} />
    <AnimeRecommendations id={getIdFromSlug(params.slug)} />
  </main>
)

export default Page
