import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// Get a single social link
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('social_links')
      .select('*')
      .eq('id', params.id)
      .single();
      
    if (error) throw error;
    
    if (!data) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching social link:', error);
    return NextResponse.json({ error: 'Failed to fetch social link' }, { status: 500 });
  }
}

// Update a social link
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    const { data: updatedLink, error } = await supabaseAdmin
      .from('social_links')
      .update({
        platform: data.platform,
        url: data.url,
        icon: data.icon,
        is_active: data.is_active,
        display_order: data.display_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();
      
    if (error) throw error;
    
    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Error updating social link:', error);
    return NextResponse.json({ error: 'Failed to update social link' }, { status: 500 });
  }
}

// Delete a social link
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { error } = await supabaseAdmin
      .from('social_links')
      .delete()
      .eq('id', params.id);
      
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting social link:', error);
    return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 });
  }
}
