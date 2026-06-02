# Supabase Setup Guide

This portfolio uses **Supabase** for authentication, database, and file storage.

## Prerequisites

1. Create a Supabase project at https://supabase.com
2. Get your API credentials from **Project Settings > API**

## Environment Variables

Add these to your `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Database Schema

Create these tables in Supabase:

### 1. `settings` (Portfolio Info)
```sql
create table settings (
  id text primary key,
  hero_title text,
  hero_subtitle text,
  about_text text,
  cv_url text,
  cv_path text,
  cv_updated_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Insert default portfolio
insert into settings (id, hero_title, hero_subtitle, about_text) 
values ('portfolio', 'Mohamed Esam', 'Data Analyst', 'Passionate Data Analyst...');
```

### 2. `projects` (Portfolio Projects)
```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text[] default '{}',
  github_url text,
  live_url text,
  cover_image text,
  screenshots text[] default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### 3. `skills` (Skills & Expertise)
```sql
create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level integer default 80,
  category text default 'Analysis',
  created_at timestamp with time zone default now()
);
```

### 4. `experience` (Work Experience)
```sql
create table experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  duration text,
  points text[] default '{}',
  created_at timestamp with time zone default now()
);
```

### 5. `education` (Education Background)
```sql
create table education (
  id uuid primary key default gen_random_uuid(),
  school text not null,
  degree text not null,
  year text,
  tags text[] default '{}',
  created_at timestamp with time zone default now()
);
```

## Authentication Setup

1. Go to **Authentication > Providers**
2. Enable **Email**
3. Go to **Authentication > Users** and create admin user
4. Use admin email in login modal

## Row Level Security (RLS)

Apply these policies in Supabase:

### settings table
```sql
-- Public read
create policy "Enable read access for all users"
on settings
for select
using (true);

-- Admin write
create policy "Enable admin write"
on settings
for all
using (auth.role() = 'authenticated');
```

### projects, skills, experience, education tables
```sql
-- Public read
create policy "Enable read access for all users"
on projects
for select
using (true);

-- Admin write (INSERT, UPDATE, DELETE)
create policy "Enable admin operations"
on projects
for all
using (auth.role() = 'authenticated');
```

## Storage Setup

1. Create a storage bucket called **portfolio**
2. Set public access for read (unauthenticated)
3. Restrict write to authenticated users

**Storage rules:**
```
match /portfolio/cv/* {
  allow read;
  allow write if request.auth != null;
}

match /portfolio/* {
  allow read;
  allow write if request.auth != null;
}
```

## File Locations

- **CV Path**: `portfolio/cv/Mohamed_Esam_CV.pdf`
- **Project Images**: `portfolio/projects/{projectId}/*`

## Verification

Run these queries to verify setup:

```sql
-- Check tables
select * from information_schema.tables where table_schema = 'public';

-- Check settings
select * from settings where id = 'portfolio';

-- Check RLS enabled
select schemaname, tablename, rowsecurity from pg_tables where schemaname = 'public';
```

## Troubleshooting

**Authentication errors:**
- Verify VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are correct
- Check if user exists in Authentication > Users

**No data showing:**
- Verify RLS policies are configured
- Check if tables have data (run queries in Supabase SQL Editor)

**File upload fails:**
- Verify storage bucket exists and is public for reads
- Check authentication status

## Production Deployment

Before deploying:

1. Set strong RLS policies
2. Enable 2FA for admin account
3. Configure domain restrictions in Authentication
4. Enable request logging in PostgreSQL settings

---

For more help: https://supabase.com/docs
