import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkpxwwzpfnkdsqgoubwk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcHh3d3pwZm5rZHNxZ291YndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDUwOTcsImV4cCI6MjA3MTk4MTA5N30.7FNsSftgWoW0mDiwnwXL78J53I5hZsvw2oxsXjk7NeU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch both hackathons and internships in parallel
export async function fetchHackathonsAndInternships() {
  const [hackathonsRes, internshipsRes] = await Promise.all([
    supabase.from("hackathons").select("*").order("id", { ascending: false }),
    supabase.from("internships").select("*").order("id", { ascending: false }),
  ]);
  return {
    hackathons: hackathonsRes.data || [],
    internships: internshipsRes.data || [],
    hackathonsError: hackathonsRes.error,
    internshipsError: internshipsRes.error,
  };
}
