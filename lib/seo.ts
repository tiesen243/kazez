import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { type Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

interface Prams {
  title?: string
  description?: string
  url?: string
  images?: OpenGraph['images']
}

export const seo = (params: Prams): Metadata => {
  const title = params.title ? `${params.title} | Kazez` : 'Kazez'
  const description =
    params.description ??
    'Watch anime online for free. Kazez is the best place to watch anime online.'
  const images = params.images ?? ['/api/og']
  const url = params.url ? `${getBaseUrl()}${params.url}` : getBaseUrl()

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    applicationName: 'Kazez',
    alternates: { canonical: url },
    openGraph: { url, images, type: 'website' },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/favicon.ico' },
  }
}
