-- ============================================================
-- SEED DATA — Gauteng pilot routes (MVP)
-- All fares are approximate 2024/2025 figures from community
-- reports. Verify with associations before public launch.
-- ============================================================

-- Provinces
insert into provinces (id, name, slug) values
  ('11111111-0000-0000-0000-000000000001', 'Gauteng', 'gauteng'),
  ('11111111-0000-0000-0000-000000000002', 'Western Cape', 'western-cape'),
  ('11111111-0000-0000-0000-000000000003', 'KwaZulu-Natal', 'kwazulu-natal')
on conflict (slug) do nothing;

-- Cities — Gauteng
insert into cities (id, province_id, name, slug) values
  ('22222222-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'Johannesburg', 'johannesburg'),
  ('22222222-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000001', 'Soweto', 'soweto'),
  ('22222222-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000001', 'Pretoria', 'pretoria'),
  ('22222222-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000001', 'Sandton', 'sandton'),
  ('22222222-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000001', 'Alexandra', 'alexandra'),
  ('22222222-0000-0000-0000-000000000006', '11111111-0000-0000-0000-000000000001', 'Tembisa', 'tembisa'),
  ('22222222-0000-0000-0000-000000000007', '11111111-0000-0000-0000-000000000001', 'Midrand', 'midrand'),
  ('22222222-0000-0000-0000-000000000008', '11111111-0000-0000-0000-000000000001', 'Ekurhuleni', 'ekurhuleni'),
  ('22222222-0000-0000-0000-000000000009', '11111111-0000-0000-0000-000000000001', 'Centurion', 'centurion'),
  -- Western Cape
  ('22222222-0000-0000-0000-000000000010', '11111111-0000-0000-0000-000000000002', 'Cape Town', 'cape-town'),
  ('22222222-0000-0000-0000-000000000011', '11111111-0000-0000-0000-000000000002', 'Khayelitsha', 'khayelitsha'),
  ('22222222-0000-0000-0000-000000000012', '11111111-0000-0000-0000-000000000002', 'Mitchell''s Plain', 'mitchells-plain'),
  -- KZN
  ('22222222-0000-0000-0000-000000000013', '11111111-0000-0000-0000-000000000003', 'Durban', 'durban'),
  ('22222222-0000-0000-0000-000000000014', '11111111-0000-0000-0000-000000000003', 'Umlazi', 'umlazi')
on conflict (slug) do nothing;

-- Ranks
insert into ranks (id, city_id, name, slug, address, latitude, longitude, operating_hours, notes) values
  -- Johannesburg CBD ranks
  ('33333333-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001',
    'Bree Street Taxi Rank', 'bree-street',
    'Bree St & Jeppe St, Johannesburg CBD', -26.2041, 28.0473,
    '04:30 - 22:00',
    'One of the largest ranks in Joburg CBD. Serves routes to Soweto, West Rand, and surrounding townships. Look for the route number boards at each bay.'),

  ('33333333-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000001',
    'Noord Street Taxi Rank', 'noord-street',
    'Noord St, Johannesburg CBD', -26.1983, 28.0453,
    '04:30 - 21:30',
    'Largest rank in the Joburg CBD. Primarily serves East Rand and northern routes including Alexandra, Tembisa, and Pretoria.'),

  ('33333333-0000-0000-0000-000000000003', '22222222-0000-0000-0000-000000000001',
    'Park Station Rank', 'park-station',
    'Wolmarans St, Braamfontein, Johannesburg', -26.1952, 28.0436,
    '05:00 - 22:00',
    'Located adjacent to Park Station. Major interchange for long-distance routes. Multiple bays — check the destination boards above each bay.'),

  ('33333333-0000-0000-0000-000000000004', '22222222-0000-0000-0000-000000000001',
    'MTN Taxi Rank', 'mtn-rank',
    'Commissioner St & Ntemi Piliso St, Johannesburg CBD', -26.2064, 28.0507,
    '05:00 - 21:00',
    'Serves mainly East Rand routes. Named after the MTN building nearby.'),

  -- Soweto ranks
  ('33333333-0000-0000-0000-000000000005', '22222222-0000-0000-0000-000000000002',
    'Bara Taxi Rank', 'bara-rank',
    'Chris Hani Rd, Soweto (near Baragwanath Hospital)', -26.2647, 27.9399,
    '05:00 - 21:00',
    'Largest rank in Soweto, next to Chris Hani Baragwanath Hospital. Main hub for routes into Joburg CBD and surrounding areas.'),

  ('33333333-0000-0000-0000-000000000006', '22222222-0000-0000-0000-000000000002',
    'Protea Glen Rank', 'protea-glen',
    'Immink Dr, Protea Glen, Soweto', -26.2944, 27.8622,
    '05:00 - 20:00',
    'Serves western Soweto. Connects to Bara Rank and Johannesburg CBD.'),

  -- Pretoria ranks
  ('33333333-0000-0000-0000-000000000007', '22222222-0000-0000-0000-000000000003',
    'Church Square Rank', 'church-square',
    'Church Square, Pretoria CBD', -25.7461, 28.1881,
    '05:00 - 21:00',
    'Main rank in Pretoria CBD. Serves routes to Johannesburg, Midrand, Centurion, and surrounding townships.'),

  ('33333333-0000-0000-0000-000000000008', '22222222-0000-0000-0000-000000000003',
    'Bosman Taxi Rank', 'bosman-rank',
    'Bosman St, Pretoria CBD', -25.7502, 28.1831,
    '04:30 - 22:00',
    'Busiest rank in Pretoria. Focus on Mamelodi, Soshanguve, and eastern township routes.'),

  -- Sandton
  ('33333333-0000-0000-0000-000000000009', '22222222-0000-0000-0000-000000000004',
    'Sandton Taxi Rank', 'sandton-rank',
    'Sandton Dr, Sandton (near Sandton City)', -26.1076, 28.0567,
    '05:30 - 21:00',
    'Located near Sandton City mall. Connects to Alexandra, Joburg CBD, and Midrand.'),

  -- Alexandra
  ('33333333-0000-0000-0000-000000000010', '22222222-0000-0000-0000-000000000005',
    'Alex Taxi Rank', 'alex-rank',
    '1st Ave, Alexandra', -26.1056, 28.0992,
    '05:00 - 21:30',
    'Main rank serving Alexandra township. Routes to Sandton, Joburg CBD, and East Rand.'),

  -- Cape Town
  ('33333333-0000-0000-0000-000000000011', '22222222-0000-0000-0000-000000000010',
    'Cape Town Taxi Rank (Adderley St)', 'adderley-street',
    'Adderley St, Cape Town CBD', -33.9258, 18.4232,
    '05:00 - 21:00',
    'Main CBD rank serving Khayelitsha, Mitchell''s Plain, Bellville, and surrounding areas.'),

  -- Durban
  ('33333333-0000-0000-0000-000000000012', '22222222-0000-0000-0000-000000000013',
    'Warwick Junction Taxi Rank', 'warwick-junction',
    'Warwick Ave, Durban CBD', -29.8587, 31.0218,
    '04:30 - 22:00',
    'Largest taxi interchange in Durban. Serves Umlazi, KwaMashu, Pinetown, and surrounding areas. Multiple sub-ranks.')
on conflict (slug) do nothing;

-- Routes from Bree Street (Johannesburg CBD → west/south)
insert into routes (origin_rank_id, destination_name, destination_city_id, fare_min, fare_max, duration_min, duration_max, operating_hours, notes) values
  ('33333333-0000-0000-0000-000000000001', 'Soweto (Bara)', '22222222-0000-0000-0000-000000000002',
    14, 18, 35, 55, '04:30 - 21:30',
    'Board at Bay 3-7. Taxis leave when full (typically 15-seat). Journey via N1/N12 highway or through Diepkloof depending on driver. Alight at Bara Rank.'),

  ('33333333-0000-0000-0000-000000000001', 'Protea Glen', '22222222-0000-0000-0000-000000000002',
    18, 22, 45, 70, '05:00 - 20:00',
    'Western Soweto route via Kliptown. Less frequent — expect longer waits during off-peak.'),

  -- Routes from Noord Street (Johannesburg CBD → north/east)
  ('33333333-0000-0000-0000-000000000002', 'Alexandra', '22222222-0000-0000-0000-000000000005',
    10, 12, 20, 35, '04:30 - 21:30',
    'Short frequent route via Louis Botha Ave. Taxis fill quickly. Alight at Alex main rank on 1st Ave.'),

  ('33333333-0000-0000-0000-000000000002', 'Tembisa', '22222222-0000-0000-0000-000000000006',
    18, 22, 40, 60, '05:00 - 21:00',
    'Via N3 highway toward East Rand. Departs Noord St frequently during morning rush.'),

  ('33333333-0000-0000-0000-000000000002', 'Sandton', '22222222-0000-0000-0000-000000000004',
    12, 16, 25, 45, '05:30 - 21:00',
    'Via Louis Botha or M1 highway. Very frequent during peak hours. Drops near Sandton City.'),

  -- Routes from Park Station (long-distance / Pretoria)
  ('33333333-0000-0000-0000-000000000003', 'Pretoria', '22222222-0000-0000-0000-000000000003',
    28, 35, 50, 90, '05:00 - 21:00',
    'Via N1 highway. Drops at Church Square or Bosman rank in Pretoria CBD. Journey time varies with traffic — rush hour can add 30+ minutes. Sit window seat for easier alighting if going to Centurion.'),

  ('33333333-0000-0000-0000-000000000003', 'Midrand', '22222222-0000-0000-0000-000000000007',
    18, 22, 30, 50, '05:30 - 21:00',
    'Via N1. Frequent, drops at Midrand taxi rank near the Gautrain station. Can connect to Centurion or Pretoria from here.'),

  -- Routes from Bara Rank (Soweto → various)
  ('33333333-0000-0000-0000-000000000005', 'Johannesburg CBD (Bree)', '22222222-0000-0000-0000-000000000001',
    14, 18, 35, 55, '04:30 - 21:30',
    'Return route to Bree St rank. Departs regularly — taxis fill fast during morning rush 06:00-08:30.'),

  ('33333333-0000-0000-0000-000000000005', 'Sandton', '22222222-0000-0000-0000-000000000004',
    20, 26, 40, 65, '05:30 - 20:30',
    'Via M1/N1 highway. Less frequent than CBD route — typically 20-30 min wait off-peak.'),

  -- Routes from Church Square (Pretoria CBD → various)
  ('33333333-0000-0000-0000-000000000007', 'Johannesburg CBD', '22222222-0000-0000-0000-000000000001',
    28, 35, 50, 90, '05:00 - 21:00',
    'Via N1 highway. Departs to Park Station or Bree St rank. Very busy during peak hours — arrive early for a seat.'),

  ('33333333-0000-0000-0000-000000000007', 'Centurion', '22222222-0000-0000-0000-000000000009',
    12, 15, 20, 35, '05:00 - 21:00',
    'Short route via N1. Very frequent. Drops at Centurion taxi rank near the Gautrain station.'),

  ('33333333-0000-0000-0000-000000000007', 'Midrand', '22222222-0000-0000-0000-000000000007',
    20, 25, 30, 50, '05:30 - 20:30',
    'Via N1 toward Joburg. Alight at Midrand — does not go all the way to Joburg CBD.'),

  -- Routes from Sandton Rank
  ('33333333-0000-0000-0000-000000000009', 'Alexandra', '22222222-0000-0000-0000-000000000005',
    8, 10, 10, 20, '05:30 - 21:00',
    'Very short frequent route. Most common commute for domestic workers and construction workers. Departs constantly.'),

  ('33333333-0000-0000-0000-000000000009', 'Johannesburg CBD', '22222222-0000-0000-0000-000000000001',
    12, 16, 25, 45, '05:30 - 21:00',
    'Via M1 southbound. Drops at Noord St or Bree St. Frequent throughout the day.'),

  -- Cape Town routes
  ('33333333-0000-0000-0000-000000000011', 'Khayelitsha', '22222222-0000-0000-0000-000000000011',
    14, 17, 30, 50, '05:00 - 21:00',
    'Via N2. Very frequent. Drops at Khayelitsha rank on Steve Biko Drive.'),

  ('33333333-0000-0000-0000-000000000011', 'Mitchell''s Plain', '22222222-0000-0000-0000-000000000012',
    14, 17, 30, 50, '05:00 - 21:00',
    'Via N2 toward Somerset West. Drops at Town Centre rank.'),

  -- Durban routes
  ('33333333-0000-0000-0000-000000000012', 'Umlazi', '22222222-0000-0000-0000-000000000014',
    12, 15, 25, 45, '05:00 - 21:00',
    'Via South Coast Rd. Very busy commuter route. Drops at Umlazi V-Section rank.');
