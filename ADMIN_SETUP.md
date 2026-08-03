# Admin panel setup

One-time setup so you can add/edit/delete vehicles, commercial vehicles,
stays, and packages yourself from `/admin`, with your own photo uploads.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com), sign up, and create a new
   project (free tier).
2. Once it's ready, go to **Settings -> API** and copy:
   - **Project URL**
   - **anon public** key

## 2. Set environment variables

1. Copy `.env.local.example` to `.env.local` in the project root.
2. Paste the Project URL and anon key into
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. For production, add the same two variables in your hosting provider's
   environment variable settings (e.g. Vercel -> Project -> Settings ->
   Environment Variables).

## 3. Run the database schema

1. In the Supabase dashboard, open **SQL Editor**.
2. Paste the contents of `supabase/schema.sql` and run it. This creates the
   4 content tables, sets up public-read/admin-write security rules, and
   creates the photo storage bucket. Safe to re-run if needed.

## 4. Create your admin login

1. In the Supabase dashboard, go to **Authentication -> Users -> Add user**.
2. Enter the email and password you want to sign in with at `/admin/login`.
   (There's no public sign-up page - this is the only way to create an
   account, and password recovery later is also done from this same
   Dashboard screen if you ever forget it.)

## 5. Load the starting content (optional)

The site currently ships with 4 example vehicles, 4 commercial vehicles, 4
stays, and 4 packages. To load them into your new database instead of
starting empty:

1. Also add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` (Settings -> API ->
   `service_role` key - keep this one secret, never put it in your hosting
   provider's env vars, and feel free to leave it out of `.env.local`
   entirely once you're done with this step).
2. Run:
   ```
   node --env-file=.env.local scripts/seed.mjs
   ```

If you'd rather start with a clean slate, skip this step and just add your
own listings from `/admin` directly.

## Using it day to day

- Sign in at `yoursite.com/admin/login`.
- Dashboard links to Vehicles, Commercial Vehicles, Stays, and Packages -
  each has Add/Edit/Delete with photo upload (JPEG/PNG/WebP, up to 8MB per
  photo).
- Changes go live on the public site immediately - no redeploy needed.
