import { Search } from "lucide-react"

interface SearchBarProps {
  search: string
  setSearch: (value: string) => void
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-8">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          placeholder="Buscar produto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 outline-none rounded-2xl px-5 py-4 pl-12 text-white placeholder:text-zinc-500 transition"
        />
      </div>
    </div>
  )
}
