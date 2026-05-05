import { searchRoutesByDestinationName } from '@/lib/data'
import { RouteCard } from '@/components/RouteCard'
import { SearchBar } from '@/components/SearchBar'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function RoutesPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  let routes: Awaited<ReturnType<typeof searchRoutesByDestinationName>> = []
  let error = false

  if (query) {
    try {
      routes = await searchRoutesByDestinationName(query)
    } catch {
      error = true
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar initialValue={query} />
      </div>

      {/* Results header */}
      {query && (
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">
            {error
              ? 'Something went wrong'
              : routes.length === 0
              ? `No routes found for "${query}"`
              : `${routes.length} route${routes.length !== 1 ? 's' : ''} to "${query}"`}
          </h1>
          {!error && routes.length === 0 && (
            <p className="text-gray-500 mt-2 text-sm">
              We may not have this route yet. Try a nearby area, or{' '}
              <a href="mailto:hello@taxiroute.co.za" className="text-green-700 underline">
                let us know
              </a>{' '}
              and we will add it.
            </p>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-20 text-gray-400">
          <MapPin className="h-10 w-10 mx-auto mb-3 text-gray-300" />
          <p className="text-base">Enter a destination above to find routes.</p>
          <p className="text-sm mt-1">
            Or{' '}
            <Link href="/ranks" className="text-green-700 underline">
              browse all taxi ranks
            </Link>
          </p>
        </div>
      )}

      {/* Route list */}
      {routes.length > 0 && (
        <div className="flex flex-col gap-3">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route as Parameters<typeof RouteCard>[0]['route']}
            />
          ))}
        </div>
      )}

      {/* Data notice */}
      {routes.length > 0 && (
        <p className="text-xs text-gray-400 mt-8 text-center">
          Fares are approximate. Always confirm with your driver before boarding.
        </p>
      )}
    </div>
  )
}
