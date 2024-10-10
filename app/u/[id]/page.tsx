import type { NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { AnimeCard } from '@/components/anime-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'
import { seo } from '@/lib/seo'
import { getUser } from '@/server/actions'

interface Props {
  params: { id: string }
}

const Page: NextPage<Props> = async ({ params }) => {
  const res = await getUser({ id: params.id })
  const data = res?.data
  if (!data?.user) return notFound()

  return (
    <main className="container py-4">
      <article className="flex flex-col items-center gap-4">
        <Avatar className="size-40">
          <AvatarImage src={data.user.avatar} alt={data.user.name} />
          <AvatarFallback>{data.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <Typography level="h1">{data.user.name}</Typography>
      </article>

      <section className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Typography level="h2" className="col-span-full">
          Saved Anime
        </Typography>
        {data.savedAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  const res = await getUser({ id: params.id })
  const data = res?.data
  if (!data?.user) return notFound()

  const previousImages = (await parent).openGraph?.images ?? []

  return seo({
    title: data.user.name,
    description: `Profile of ${data.user.name}`,
    images: [data.user.avatar, ...previousImages],
    url: `/u/${params.id}`,
  })
}

export default Page
