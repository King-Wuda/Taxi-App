import Link from 'next/link'
import { MapPin, Clock } from 'lucide-react'
import type { Rank } from '@/lib/types'

type Props = {
  rank: Rank & {
    city: { name: string; province: { name: string } }
    route_count?: number
  }
}

export function RankCard({ rank }: Props) {
  return (
    <Link
      href={`/ranks/${rank.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-green-400 hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="bg-green-50 rounded-lg p-2 shrink-0">
          <MapPin className="h-5 w-5 text-green-700" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{rank.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {rank.city.name}, {rank.city.province.name}
          </p>
          <p className="text-sm text-gray-400 mt-0.5 truncate">{rank.address}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {rank.operating_hours}
            </span>
            {rank.route_count !== undefined && (
              <span>{rank.route_count} route{rank.route_count !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
