import type { ResolvingMetadata } from 'next'

import type { AnimeDetails } from '@/hooks/use-anime'
import { seo } from '@/lib/seo'
import { getIdFromSlug } from '@/lib/utils'

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

const AnimeLayout: React.FC<Props> = ({ children }) => {
  return children
}

export default AnimeLayout

export const generateMetadata = async ({ params }: Props, parent: ResolvingMetadata) => {
  const res = await fetch(
    `https://consumet-api-production-9bed.up.railway.app/meta/anilist/info/${getIdFromSlug(params.slug)}`,
  )

  const json = (await res.json()) as AnimeDetails
  const previousImages = (await parent).openGraph?.images ?? []

  return seo({
    title: json.title.romaji ?? json.title.english ?? json.title.native ?? ' ',
    description: json.description,
    images: [json.cover, json.image, ...previousImages],
    url: `/anime/${params.slug}`,
  })
}
