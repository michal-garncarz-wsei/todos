-- Create the todos table

create table public.todos (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  task text check (char_length(task) > 3),
  is_complete boolean default false,
  color bpchar(255) NOT NULL,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table todos enable row level security;
create policy "Individuals can create todos." on todos for
    insert with check (auth.uid() = user_id);
create policy "Individuals can view their own todos. " on todos for
    select using ((select auth.uid()) = user_id);
create policy "Individuals can update their own todos." on todos for
    update using ((select auth.uid()) = user_id);
create policy "Individuals can delete their own todos." on todos for
    delete using ((select auth.uid()) = user_id);

-- Create the profiles table

create table public.profiles (
    id bigint primary key generated always as identity,
    user_id uuid references auth.users(id) on delete cascade,
    username text unique,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);
