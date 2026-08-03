create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  body_type text not null check (body_type in ('Sedan', 'SUV', 'Normal')),
  seats int not null,
  transmission text not null check (transmission in ('Manual', 'Automatic')),
  fuel text not null check (fuel in ('Petrol', 'Diesel', 'Electric', 'CNG')),
  price_per_day int not null,
  drive_options text[] not null default '{}',
  description text not null default '',
  images text[] not null default '{}',
  image_alt text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists commercial_vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  body_type text not null check (body_type in ('14 Seater', '12 Seater', '7 Seater')),
  capacity text not null,
  ideal_for text[] not null default '{}',
  description text not null default '',
  images text[] not null default '{}',
  image_alt text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists stays (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text not null,
  price_per_night int not null,
  max_guests int not null,
  bedrooms int not null,
  beds int not null,
  baths int not null,
  amenities text[] not null default '{}',
  description text not null default '',
  check_in_time text not null,
  check_out_time text not null,
  images text[] not null default '{}',
  image_alt text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  vehicle_name text not null,
  stay_name text not null,
  duration text not null,
  price int not null,
  description text not null default '',
  highlights text[] not null default '{}',
  images text[] not null default '{}',
  image_alt text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One row per homepage service card (Self Drive, Commercial Vehicles, Stays,
-- Packages) holding the photo shown on the landing page - a fixed set of 4
-- rows, not admin-creatable/deletable, so there's no slug/id needed, just a
-- stable key.
create table if not exists category_thumbnails (
  key text primary key,
  image text,
  image_alt text,
  updated_at timestamptz not null default now()
);

insert into category_thumbnails (key) values
  ('self-drive'), ('commercial-vehicles'), ('stays'), ('packages')
on conflict (key) do nothing;

-- Single-row table for sitewide branding (the logo shown in the header and
-- footer on every page). `check (id = 1)` enforces the singleton - there is
-- and only ever will be one row.
create table if not exists site_settings (
  id int primary key default 1,
  logo text,
  logo_alt text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into site_settings (id) values (1) on conflict (id) do nothing;

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  context text not null,
  rating int not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed with the 3 testimonials that used to be hardcoded, so the homepage
-- doesn't go blank on cutover. Safe to re-run - only inserts if the table is
-- still empty.
insert into testimonials (quote, name, context, rating)
select * from (values
  (
    'Booked a self-drive SUV for a family trip with a single WhatsApp message. No forms, no waiting on hold - just a quick chat and the car was ready.',
    'Ankita R.',
    'Self Drive, Guwahati',
    5
  ),
  (
    'We''ve used their tempo fleet for three months of inter-city deliveries. GST invoicing was sorted from day one and the vehicles are always on time.',
    'Debojit Deals Pvt. Ltd.',
    'Commercial rental, ongoing contract',
    5
  ),
  (
    'The Lakeview Bungalow was exactly as described. Check-in was simple and the team was reachable the whole stay in case we needed anything.',
    'Priya M.',
    'Stays, Lakeview Bungalow',
    4
  )
) as seed(quote, name, context, rating)
where not exists (select 1 from testimonials);

-- ---------------------------------------------------------------------------
-- Migration: commercial_vehicles.body_type changed from goods-vehicle types
-- (Mini-Truck/Tempo/Van/Bus) to passenger seater counts. The table already
-- exists in deployed projects, so "create table if not exists" above won't
-- pick up the new check constraint - run this once to apply it.
-- ---------------------------------------------------------------------------

alter table commercial_vehicles drop constraint if exists commercial_vehicles_body_type_check;
alter table commercial_vehicles add constraint commercial_vehicles_body_type_check
  check (body_type in ('14 Seater', '12 Seater', '7 Seater'));

-- ---------------------------------------------------------------------------
-- Migration: vehicles.body_type narrowed from (Hatchback, Sedan, SUV, Luxury)
-- to (Sedan, SUV, Normal) - remap existing rows before tightening the check
-- constraint, or the alter below will fail on any deployed Hatchback/Luxury
-- rows.
-- ---------------------------------------------------------------------------

update vehicles set body_type = 'Normal' where body_type in ('Hatchback', 'Luxury');

alter table vehicles drop constraint if exists vehicles_body_type_check;
alter table vehicles add constraint vehicles_body_type_check
  check (body_type in ('Sedan', 'SUV', 'Normal'));

-- ---------------------------------------------------------------------------
-- updated_at auto-touch
-- ---------------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists vehicles_set_updated_at on vehicles;
create trigger vehicles_set_updated_at before update on vehicles
  for each row execute function set_updated_at();

drop trigger if exists commercial_vehicles_set_updated_at on commercial_vehicles;
create trigger commercial_vehicles_set_updated_at before update on commercial_vehicles
  for each row execute function set_updated_at();

drop trigger if exists stays_set_updated_at on stays;
create trigger stays_set_updated_at before update on stays
  for each row execute function set_updated_at();

drop trigger if exists packages_set_updated_at on packages;
create trigger packages_set_updated_at before update on packages
  for each row execute function set_updated_at();

drop trigger if exists category_thumbnails_set_updated_at on category_thumbnails;
create trigger category_thumbnails_set_updated_at before update on category_thumbnails
  for each row execute function set_updated_at();

drop trigger if exists site_settings_set_updated_at on site_settings;
create trigger site_settings_set_updated_at before update on site_settings
  for each row execute function set_updated_at();

drop trigger if exists testimonials_set_updated_at on testimonials;
create trigger testimonials_set_updated_at before update on testimonials
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security: public read, authenticated (the one admin) write.
-- There is no public signup - create the single admin user directly in
-- Dashboard -> Authentication -> Users, so "authenticated" effectively means
-- "you, logged into /admin".
-- ---------------------------------------------------------------------------

alter table vehicles enable row level security;
alter table commercial_vehicles enable row level security;
alter table stays enable row level security;
alter table packages enable row level security;

drop policy if exists "public read vehicles" on vehicles;
create policy "public read vehicles" on vehicles for select using (true);
drop policy if exists "admin write vehicles" on vehicles;
create policy "admin write vehicles" on vehicles for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read commercial_vehicles" on commercial_vehicles;
create policy "public read commercial_vehicles" on commercial_vehicles for select using (true);
drop policy if exists "admin write commercial_vehicles" on commercial_vehicles;
create policy "admin write commercial_vehicles" on commercial_vehicles for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read stays" on stays;
create policy "public read stays" on stays for select using (true);
drop policy if exists "admin write stays" on stays;
create policy "admin write stays" on stays for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read packages" on packages;
create policy "public read packages" on packages for select using (true);
drop policy if exists "admin write packages" on packages;
create policy "admin write packages" on packages for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table category_thumbnails enable row level security;
drop policy if exists "public read category_thumbnails" on category_thumbnails;
create policy "public read category_thumbnails" on category_thumbnails for select using (true);
drop policy if exists "admin write category_thumbnails" on category_thumbnails;
create policy "admin write category_thumbnails" on category_thumbnails for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table site_settings enable row level security;
drop policy if exists "public read site_settings" on site_settings;
create policy "public read site_settings" on site_settings for select using (true);
drop policy if exists "admin write site_settings" on site_settings;
create policy "admin write site_settings" on site_settings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table testimonials enable row level security;
drop policy if exists "public read testimonials" on testimonials;
create policy "public read testimonials" on testimonials for select using (true);
drop policy if exists "admin write testimonials" on testimonials;
create policy "admin write testimonials" on testimonials for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Storage: one public bucket for listing photos.
-- Bucket-level size/type limits set here too (not just client-side accept=,
-- which is trivially bypassed) - 8MB per file, images only.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-photos',
  'listing-photos',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public read listing photos" on storage.objects;
create policy "public read listing photos" on storage.objects for select
  using (bucket_id = 'listing-photos');

drop policy if exists "admin write listing photos" on storage.objects;
create policy "admin write listing photos" on storage.objects for all
  using (bucket_id = 'listing-photos' and auth.role() = 'authenticated')
  with check (bucket_id = 'listing-photos' and auth.role() = 'authenticated');
