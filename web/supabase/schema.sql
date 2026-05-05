-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Provinces
create table if not exists provinces (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

-- Cities
create table if not exists cities (
  id uuid primary key default uuid_generate_v4(),
  province_id uuid not null references provinces(id) on delete cascade,
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

-- Ranks (taxi ranks/stops)
create table if not exists ranks (
  id uuid primary key default uuid_generate_v4(),
  city_id uuid not null references cities(id) on delete cascade,
  name text not null,
  slug text not null unique,
  address text not null,
  latitude numeric(9,6),
  longitude numeric(9,6),
  operating_hours text not null default '05:00 - 22:00',
  notes text,
  created_at timestamptz default now()
);

-- Routes
create table if not exists routes (
  id uuid primary key default uuid_generate_v4(),
  origin_rank_id uuid not null references ranks(id) on delete cascade,
  destination_name text not null,
  destination_city_id uuid not null references cities(id) on delete cascade,
  fare_min integer not null,
  fare_max integer not null,
  duration_min integer not null,
  duration_max integer not null,
  operating_hours text not null default '05:00 - 21:00',
  notes text,
  created_at timestamptz default now()
);

-- Indexes for search performance
create index if not exists routes_destination_name_idx on routes using gin(to_tsvector('english', destination_name));
create index if not exists ranks_name_idx on ranks(name);
create index if not exists cities_name_idx on cities(name);

-- Row level security (read-only for anon users)
alter table provinces enable row level security;
alter table cities enable row level security;
alter table ranks enable row level security;
alter table routes enable row level security;

create policy "Public read" on provinces for select using (true);
create policy "Public read" on cities for select using (true);
create policy "Public read" on ranks for select using (true);
create policy "Public read" on routes for select using (true);
