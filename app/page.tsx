import type { NextPage } from 'next'
import Image from 'next/image'

import { RecentEpisodes } from '@/components/home/recent-episodes'

interface Props {
  searchParams: { page: string }
}

const Page: NextPage<Props> = ({ searchParams }) => (
  <main className="container space-y-4 py-4">
    <Image
      src={`/api/og?title=Welcome%20to%20Kazez&description=The%20best%20place%20to%20watch%20anime%20online%20for%20free`}
      alt="Kazez"
      className="aspect-[4/1] w-full rounded-lg object-cover"
      width={1200}
      height={630}
    />

    <hr />

    <RecentEpisodes page={searchParams.page} />
  </main>
)

export default Page
