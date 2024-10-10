import Image from 'next/image'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Auth } from './auth'

export const Header: React.FC = () => (
  <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} className="dark:invert" />
        <span className="text-lg font-bold">Kazez</span>
      </Link>

      <form className="flex flex-1 gap-2" action="/anime">
        <Input placeholder="Search..." type="search" name="q" />
        <Button variant="outline" size="icon" className="aspect-square">
          <SearchIcon />
        </Button>
      </form>

      <Auth />
    </div>
  </header>
)
