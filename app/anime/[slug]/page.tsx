import type { NextPage } from 'next'

import { getIdFromSlug } from '@/lib/utils'
import { AnimeDetails } from './_components/anime-details'
import { AnimeRecommendations } from './_components/anime-recommendations'
import { EpisodeList } from './_components/episode-list'

interface Props {
  params: { slug: string }
}

const Page: NextPage<Props> = ({ params }) => (
  <main className="container py-4">
    <AnimeDetails id={getIdFromSlug(params.slug)} />
    <EpisodeList id={getIdFromSlug(params.slug)} />
    <AnimeRecommendations id={getIdFromSlug(params.slug)} />
  </main>
)

export default Page
