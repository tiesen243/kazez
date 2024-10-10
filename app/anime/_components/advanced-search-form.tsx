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

export const AdvancedSearchForm: React.FC<SearchAnimesProps> = (def) => (
  <form className="my-4 grid grid-cols-2 gap-4">
    <fieldset className="space-y-2">
      <Label htmlFor="q">Search</Label>
      <Input name="q" defaultValue={def.q} type="search" placeholder="Search..." />
    </fieldset>

    <fieldset className="space-y-2">
      <Label htmlFor="genre">Genre</Label>
      <Select name="genre" defaultValue={def.genre}>
        <SelectTrigger>
          <SelectValue placeholder="Select genre" />
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

    <Button className="col-span-2">Search</Button>
  </form>
)
