import { redirect } from 'next/navigation'

import type { SearchAnimesProps } from '@/app/anime/_components/search-animes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Format, Genre, Season, Status } from '@/hooks/anime.enum'
import { getCurrentSeason } from '@/hooks/use-animes'

export const AdvancedSearchForm: React.FC<SearchAnimesProps> = (def) => {
  const action = async (formData: FormData) => {
    'use server'
    const search = Object.fromEntries(formData)

    Object.keys(search).forEach((key) => {
      if (search[key] === ' ' || search[key] === '') delete search[key]
      if (key === 'genres' || key === 'sort') search[key] = JSON.stringify([search[key]])
    })

    // @ts-expect-error URLSearchParams is not defined
    redirect(`/anime?${new URLSearchParams(search).toString()}`)
  }

  return (
    <form action={action} className="my-4 grid grid-cols-2 gap-4">
      <fieldset className="space-y-2">
        <Label htmlFor="q">Search</Label>
        <Input name="q" defaultValue={def.q} type="search" placeholder="Search..." />
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="genres">Genres</Label>
        <Select name="genres">
          <SelectTrigger>
            <SelectValue placeholder="Select genres" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            {Object.values(Genre).map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="format">Format</Label>
        <Select name="format" defaultValue={def.format}>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            {Object.values(Format).map((format) => (
              <SelectItem key={format} value={format}>
                {format}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={def.status}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            {Object.values(Status).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input name="year" defaultValue={def.year} type="number" placeholder="Year" />
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="season">Season</Label>
        <Select name="season" defaultValue={def.season}>
          <SelectTrigger>
            <SelectValue placeholder="Select season" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            {Object.values(Season).map((season) => (
              <SelectItem key={season} value={season}>
                {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>

      <span className="col-span-2">
        Current season: {getCurrentSeason()} - {new Date().getFullYear()}
      </span>

      <Button className="col-span-2">Search</Button>
    </form>
  )
}
