import Link from 'next/link'
import { Clock, MapPin, Banknote, ArrowRight } from 'lucide-react'
import type { Route } from '@/lib/types'

type Props = {
  route: Route & {
    origin_rank: { name: string; city: { name: string } }
    destination_city: { name: string; province: { name: string } }
  }
}

export function RouteCard({ route }: Props) {
  return (
    <Link
      href={`/routes/${route.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-green-400 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <MapPin className="h-3.5 w-3.5 text-green-600 shrink-0" />
            <span className="truncate">{route.origin_rank.name}</span>
            <span className="text-gray-300">·</span>
            <span>{route.origin_rank.city.name}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <h3 className="font-semibold text-gray-900 text-base">
              {route.destination_name}
            </h3>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            {route.destination_city.name},{' '}
            {route.destination_city.province.name}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 text-green-700 font-semibold text-lg">
            <Banknote className="h-4 w-4" />
            R{route.fare_min}–R{route.fare_max}
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <Clock className="h-3.5 w-3.5" />
            {route.duration_min}–{route.duration_max} min
          </div>
        </div>
      </div>
    </Link>
  )
}
