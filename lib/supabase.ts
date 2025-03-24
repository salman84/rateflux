import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client with anonymous key for public data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client with service role key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
