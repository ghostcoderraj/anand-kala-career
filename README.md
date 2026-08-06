# आनंद संगीत महाविद्यालय — Anand Sangeet Mahavidyalaya

Official website for Anand Sangeet Mahavidyalaya — a government-recognized college offering degrees in Music, Dance, Fine Arts & Yoga in Haspura, Bihar.

Built with **React + Vite + Tailwind CSS + Supabase**.

## Local Development

```bash
npm install
cp .env.example .env   # add your Supabase keys
npm run dev
```

Open **http://localhost:8080**

| Route | Purpose |
|-------|---------|
| `/` | Public website |
| `/auth` | Admin login |
| `/admin` | Admin dashboard (content management) |

## Admin Panel

The admin panel at `/admin` lets authorized users manage:

- Announcements & notices
- Leadership & faculty
- Gallery, awards, news & magazines

### First-time admin setup

1. Go to `/auth` and create an account (Sign Up).
2. In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**, run:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_UUID_FROM_AUTH', 'admin');
```

Find your user UUID under **Authentication → Users** in Supabase.

## Deploy to GitHub + Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Anand Sangeet Mahavidyalaya website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anand-kala-career.git
git push -u origin main
```

### 2. Connect Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Framework preset: **Vite** (auto-detected)
4. Add these **Environment Variables**:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://cezombbdvdbmjebcqgll.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon key |
| `VITE_SITE_URL` | `https://your-project.vercel.app` (your live URL) |

5. Click **Deploy**

### 3. Configure Supabase for production

In Supabase → **Authentication → URL Configuration**, add:

- **Site URL:** `https://your-project.vercel.app`
- **Redirect URLs:**
  - `https://your-project.vercel.app/admin`
  - `http://localhost:8080/admin` (for local dev)

This enables admin login and email confirmation on Vercel.

### 4. Admin on Vercel

After deploy, visit:

- **Login:** `https://your-project.vercel.app/auth`
- **Dashboard:** `https://your-project.vercel.app/admin`

SPA routing is handled by `vercel.json` so `/admin` and `/auth` work correctly.

## SEO

The site includes:

- Meta tags (title, description, keywords, Open Graph, Twitter Card)
- JSON-LD structured data (`EducationalOrganization`)
- Auto-generated `sitemap.xml` and `robots.txt` at build time
- `noindex` on `/admin`, `/auth`, and 404 pages
- Canonical URLs via `VITE_SITE_URL`

After deploying, submit your sitemap in [Google Search Console](https://search.google.com/search-console):

```
https://your-project.vercel.app/sitemap.xml
```

## Build

```bash
npm run build    # generates sitemap + production bundle
npm run preview  # preview production build locally
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Supabase (auth, database, storage)
- TanStack Query
- React Router
