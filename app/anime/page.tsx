import type { NextPage } from 'next'

import type { SearchAnimesProps } from './_components/search-animes'
import { SearchAnimes } from '@/app/anime/_components/search-animes'
import { Pagination } from '@/components/pagination'
import { Typography } from '@/components/ui/typography'
import { AdvancedSearchForm } from './_components/advanced-search-form'

const Page: NextPage<{ searchParams: SearchAnimesProps }> = ({ searchParams }) => (
  <main className="container py-4">
    <Typography level="h1">Search Animes</Typography>

    <AdvancedSearchForm {...searchParams} />

    <SearchAnimes {...searchParams} />

    <Pagination page={searchParams.page} others={searchParams} className="mt-4" />
  </main>
)

export default Page
