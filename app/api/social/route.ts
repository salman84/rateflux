import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Get all social links
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('social_links')
      .select('*')
      .order('display_order', { ascending: true });
      
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching social links:', error);
    return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
  }
}

// Create a new social link
export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    const { data: newLink, error } = await supabaseAdmin
      .from('social_links')
      .insert([
        {
          platform: data.platform,
          url: data.url,
          icon: data.icon,
          is_active: data.is_active,
          display_order: data.display_order || 0
        }
      ])
      .select()
      .single();
      
    if (error) throw error;
    
    return NextResponse.json(newLink);
  } catch (error) {
    console.error('Error creating social link:', error);
    return NextResponse.json({ error: 'Failed to create social link' }, { status: 500 });
  }
}
