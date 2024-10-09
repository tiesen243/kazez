import type { NextPage } from 'next'

import type { Props } from '@/app/anime/[slug]/_components/anime-watch'
import { AnimeRecommendations } from '@/app/anime/[slug]/_components/anime-recommendations'
import { AnimeWatch } from '@/app/anime/[slug]/_components/anime-watch'
import { getIdFromSlug } from '@/lib/utils'

const Page: NextPage<Props> = ({ params }) => (
  <main className="container my-4">
    <AnimeWatch params={params} />
    <AnimeRecommendations id={getIdFromSlug(params.slug)} />
  </main>
)

export default Page
