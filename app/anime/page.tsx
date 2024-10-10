import type { NextPage } from 'next'

interface Props {
  searchParams: { q: string; page: string }
}

const Page: NextPage<Props> = ({ searchParams }) => {
  return <main className="container py-4">Page</main>
}

export default Page
