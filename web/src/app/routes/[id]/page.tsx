import { getRouteById } from '@/lib/data'
import { notFound } from 'next/navigation'
import { MapPin, Clock, Banknote, ArrowRight, ChevronLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

export default async function RouteDetailPage({ params }: Props) {
  const { id } = await params

  let route: Awaited<ReturnType<typeof getRouteById>>
  try {
    route = await getRouteById(id)
  } catch {
    notFound()
  }

  const rank = route.origin_rank as {
    name: string; slug: string; address: string; operating_hours: string;
    notes: string | null; latitude: number | null; longitude: number | null;
    city: { name: string; province: { name: string } }
  }
  const dest = route.destination_city as { name: string; province: { name: string } }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/routes"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to search
      </Link>

      {/* Route header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 text-green-600 shrink-0" />
          <span>{rank.city.name}, {rank.city.province.name}</span>
          <ArrowRight className="h-3.5 w-3.5" />
          <span>{dest.name}, {dest.province.name}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {rank.name}
          <span className="text-gray-400 font-normal mx-2">→</span>
          {route.destination_name}
        </h1>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <Banknote className="h-5 w-5 text-green-700 mx-auto mb-1" />
            <p className="text-xl font-bold text-green-700">
              R{route.fare_min}–{route.fare_max}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Fare (approx.)</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-blue-600">
              {route.duration_min}–{route.duration_max}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Minutes</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <Clock className="h-5 w-5 text-gray-500 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-700 leading-tight">
              {route.operating_hours}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Hours</p>
          </div>
        </div>
      </div>

      {/* Where to board */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Where to board
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Rank</p>
            <Link
              href={`/ranks/${rank.slug}`}
              className="font-semibold text-green-700 hover:underline"
            >
              {rank.name}
            </Link>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Address</p>
            <p className="text-gray-700">{rank.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Operating hours</p>
            <p className="text-gray-700">{rank.operating_hours}</p>
          </div>
          {rank.latitude && rank.longitude && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${rank.latitude},${rank.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:underline mt-1"
            >
              <MapPin className="h-4 w-4" />
              Open in Google Maps
            </a>
          )}
        </div>
      </div>

      {/* Useful tips */}
      {route.notes && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          <h2 className="font-semibold text-gray-900 mb-3">Useful to know</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{route.notes}</p>
        </div>
      )}

      {/* Rank notes */}
      {rank.notes && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          <h2 className="font-semibold text-gray-900 mb-3">About {rank.name}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{rank.notes}</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-0.5">Fares are approximate</p>
          <p>
            Taxi fares in South Africa are set by associations and can change. Always
            confirm the fare with your driver before boarding. Do not overpay.
          </p>
        </div>
      </div>
    </div>
  )
}
