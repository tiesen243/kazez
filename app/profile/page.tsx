import type { NextPage } from 'next'
import { redirect } from 'next/navigation'

import { AnimeCard } from '@/components/anime-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'
import { getSavedAnime } from '@/server/actions'
import { auth } from '@/server/auth'
import { SignOutBtn } from './_components/sign-out-btn'

const Page: NextPage = async () => {
  const session = await auth()
  if (!session) redirect('/')

  const savedAnime = await getSavedAnime()

  return (
    <main className="container py-4">
      <article className="flex flex-col items-center gap-4">
        <Avatar className="size-40">
          <AvatarImage src={session.user.avatar} alt={session.user.username} />
          <AvatarFallback>{session.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <Typography level="h1">{session.user.name}</Typography>

        <SignOutBtn />
      </article>

      <section className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Typography level="h2" className="col-span-full">
          Saved Anime
        </Typography>

        {savedAnime?.data?.map((anime) => <AnimeCard key={anime.id} anime={anime} />)}
      </section>
    </main>
  )
}

export default Page
