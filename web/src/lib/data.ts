import { createClient } from '@/lib/supabase/server'

export async function searchRoutes(query: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('routes')
    .select(`
      *,
      origin_rank:ranks (
        id, name, slug, address, operating_hours,
        city:cities ( id, name, slug, province:provinces ( id, name, slug ) )
      ),
      destination_city:cities (
        id, name, slug,
        province:provinces ( id, name, slug )
      )
    `)
    .or(`destination_name.ilike.%${query}%,destination_city.cities.name.ilike.%${query}%`)
    .order('fare_min')

  if (error) throw error
  return data ?? []
}

export async function searchRoutesByDestinationName(query: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('routes')
    .select(`
      *,
      origin_rank:ranks (
        id, name, slug, address, operating_hours,
        city:cities ( id, name, slug, province:provinces ( id, name, slug ) )
      ),
      destination_city:cities (
        id, name, slug,
        province:provinces ( id, name, slug )
      )
    `)
    .ilike('destination_name', `%${query}%`)
    .order('fare_min')

  if (error) throw error
  return data ?? []
}

export async function getRouteById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('routes')
    .select(`
      *,
      origin_rank:ranks (
        id, name, slug, address, operating_hours, notes, latitude, longitude,
        city:cities ( id, name, slug, province:provinces ( id, name, slug ) )
      ),
      destination_city:cities (
        id, name, slug,
        province:provinces ( id, name, slug )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getAllRanks() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ranks')
    .select(`
      *,
      city:cities (
        id, name, slug,
        province:provinces ( id, name, slug )
      )
    `)
    .order('name')

  if (error) throw error
  return data ?? []
}

export async function getRankBySlug(slug: string) {
  const supabase = await createClient()
  const { data: rank, error } = await supabase
    .from('ranks')
    .select(`
      *,
      city:cities (
        id, name, slug,
        province:provinces ( id, name, slug )
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error

  const { data: routes } = await supabase
    .from('routes')
    .select(`
      *,
      destination_city:cities (
        id, name, slug,
        province:provinces ( id, name, slug )
      )
    `)
    .eq('origin_rank_id', rank.id)
    .order('fare_min')

  return { rank, routes: routes ?? [] }
}

export async function getRanksWithRouteCounts() {
  const supabase = await createClient()
  const { data: ranks, error } = await supabase
    .from('ranks')
    .select(`
      *,
      city:cities (
        id, name, slug,
        province:provinces ( id, name, slug )
      )
    `)
    .order('name')

  if (error) throw error

  const { data: counts } = await supabase
    .from('routes')
    .select('origin_rank_id')

  const countMap: Record<string, number> = {}
  for (const row of counts ?? []) {
    countMap[row.origin_rank_id] = (countMap[row.origin_rank_id] ?? 0) + 1
  }

  return (ranks ?? []).map((r) => ({ ...r, route_count: countMap[r.id] ?? 0 }))
}
