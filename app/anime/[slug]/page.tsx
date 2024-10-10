import type { NextPage } from 'next'

import { getIdFromSlug } from '@/lib/utils'
import { auth } from '@/server/auth'
import { AnimeDetails } from './_components/anime-details'
import { AnimeRecommendations } from './_components/anime-recommendations'
import { EpisodeList } from './_components/episode-list'

interface Props {
  params: { slug: string }
}

const Page: NextPage<Props> = async ({ params }) => {
  const session = await auth()

  return (
    <main className="container py-4">
      <AnimeDetails id={getIdFromSlug(params.slug)} isAuth={!!session} />
      <EpisodeList
        id={getIdFromSlug(params.slug)}
        slug={params.slug}
        className="grid h-full max-h-[400px] grid-cols-4 overflow-y-auto md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12"
      />
      <AnimeRecommendations id={getIdFromSlug(params.slug)} />
    </main>
  )
}

export default Page
