import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Pagination: React.FC<{ page: string; className?: string }> = ({
  page = '1',
  className = '',
}) => {
  const prevPage = Number(page) <= 1 ? 1 : Number(page) - 1
  const nextPage = Number(page) + 1

  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <Button variant="outline" size="icon" asChild>
        <Link href={{ query: { page: prevPage } }}>
          <ChevronLeftIcon />
        </Link>
      </Button>

      <span>Page {page}</span>

      <Button variant="outline" size="icon" asChild>
        <Link href={{ query: { page: nextPage } }}>
          <ChevronRightIcon />
        </Link>
      </Button>
    </div>
  )
}
