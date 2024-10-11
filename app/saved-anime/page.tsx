import type { NextPage } from 'next'
import { redirect } from 'next/navigation'

import { SavedAnimeList } from '@/app/saved-anime/_components/saved-anime-list'
import { Typography } from '@/components/ui/typography'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const session = await auth()
  if (!session) redirect('/')

  return (
    <main className="container grid grid-cols-2 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4">
      <Typography level="h2" className="col-span-full">
        Your saved anime
      </Typography>

      <SavedAnimeList />
    </main>
  )
}

export default Page
