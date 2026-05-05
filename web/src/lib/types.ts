export type Province = {
  id: string
  name: string
  slug: string
}

export type City = {
  id: string
  province_id: string
  name: string
  slug: string
  province?: Province
}

export type Rank = {
  id: string
  city_id: string
  name: string
  slug: string
  address: string
  latitude: number | null
  longitude: number | null
  operating_hours: string
  notes: string | null
  city?: City
}

export type Route = {
  id: string
  origin_rank_id: string
  destination_name: string
  destination_city_id: string
  fare_min: number
  fare_max: number
  duration_min: number
  duration_max: number
  operating_hours: string
  notes: string | null
  origin_rank?: Rank
  destination_city?: City
}

export type SearchResult = Route & {
  origin_rank: Rank & { city: City & { province: Province } }
  destination_city: City & { province: Province }
}
