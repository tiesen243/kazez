import type { NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { seo } from '@/lib/seo'
import { db } from '@/server/db'

interface Props {
  params: { id: string }
}

const Page: NextPage<Props> = ({ params }) => {
  return <main className="container py-4">Page</main>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  const user = await db.user.findUnique({ where: { id: params.id } })
  if (!user) return notFound()

  const previousImages = (await parent).openGraph?.images ?? []

  return seo({
    title: user.name ?? user.username,
    description: `Profile of ${user.name ?? user.username}`,
    images: [user.avatar, ...previousImages],
    url: `/u/${params.id}`,
  })
}

export default Page
