import { getRanksWithRouteCounts } from '@/lib/data'
import { RankCard } from '@/components/RankCard'

export default async function RanksPage() {
  let ranks: Awaited<ReturnType<typeof getRanksWithRouteCounts>> = []
  let error = false

  try {
    ranks = await getRanksWithRouteCounts()
  } catch {
    error = true
  }

  const grouped = ranks.reduce<Record<string, typeof ranks>>((acc, rank) => {
    const province = (rank.city as { province: { name: string } }).province.name
    if (!acc[province]) acc[province] = []
    acc[province].push(rank)
    return acc
  }, {})

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Taxi Rank Directory</h1>
      <p className="text-gray-500 mb-8 text-sm">
        Find taxi ranks near you and see which routes depart from each one.
        Gauteng pilot — more provinces being added.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          Could not load ranks right now. Please try again later.
        </div>
      )}

      {Object.entries(grouped).map(([province, provinceRanks]) => (
        <div key={province} className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            {province}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {provinceRanks.map((rank) => (
              <RankCard
                key={rank.id}
                rank={rank as Parameters<typeof RankCard>[0]['rank']}
              />
            ))}
          </div>
        </div>
      ))}

      {!error && ranks.length === 0 && (
        <p className="text-gray-400 text-center py-20">No ranks listed yet.</p>
      )}
    </div>
  )
}
