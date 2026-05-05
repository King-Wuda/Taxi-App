import { getRankBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import { MapPin, Clock, ChevronLeft, Banknote, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function RankDetailPage({ params }: Props) {
  const { slug } = await params

  let rank: Awaited<ReturnType<typeof getRankBySlug>>['rank']
  let routes: Awaited<ReturnType<typeof getRankBySlug>>['routes']

  try {
    const result = await getRankBySlug(slug)
    rank = result.rank
    routes = result.routes
  } catch {
    notFound()
  }

  const city = rank.city as { name: string; province: { name: string } }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/ranks"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        All ranks
      </Link>

      {/* Rank header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <div className="flex items-start gap-4">
          <div className="bg-green-50 rounded-xl p-3 shrink-0">
            <MapPin className="h-7 w-7 text-green-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{rank.name}</h1>
            <p className="text-gray-500 mt-0.5">
              {city.name}, {city.province.name}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex gap-2 items-start text-sm">
            <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
            <span className="text-gray-700">{rank.address}</span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <Clock className="h-4 w-4 text-gray-400 shrink-0" />
            <span className="text-gray-700">{rank.operating_hours}</span>
          </div>
        </div>

        {rank.latitude && rank.longitude && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${rank.latitude},${rank.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:underline mt-4"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        )}
      </div>

      {/* Rank notes */}
      {rank.notes && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">About this rank</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{rank.notes}</p>
        </div>
      )}

      {/* Routes from this rank */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          Routes from {rank.name}
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({routes.length} route{routes.length !== 1 ? 's' : ''})
          </span>
        </h2>

        {routes.length === 0 && (
          <p className="text-gray-400 text-sm">No routes listed yet for this rank.</p>
        )}

        <div className="flex flex-col gap-3">
          {routes.map((route) => {
            const destCity = route.destination_city as { name: string; province: { name: string } }
            return (
              <Link
                key={route.id}
                href={`/routes/${route.id}`}
                className="flex items-center justify-between gap-4 p-3 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-green-500 shrink-0 transition-colors" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{route.destination_name}</p>
                    <p className="text-xs text-gray-400">{destCity.name}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-green-700 font-semibold text-sm flex items-center gap-1">
                    <Banknote className="h-3.5 w-3.5" />
                    R{route.fare_min}–{route.fare_max}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {route.duration_min}–{route.duration_max} min
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
