import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// Get a setting by key
export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('id', params.key)
      .single();
      
    if (error) {
      // If the setting doesn't exist, return a default empty object
      if (error.code === 'PGRST116') {
        return NextResponse.json({ id: params.key, value: {} });
      }
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching setting ${params.key}:`, error);
    return NextResponse.json({ error: 'Failed to fetch setting' }, { status: 500 });
  }
}

// Update a setting
export async function PUT(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Check if the setting exists
    const { data: existingSetting } = await supabaseAdmin
      .from('settings')
      .select('id')
      .eq('id', params.key)
      .single();
    
    let result;
    
    if (existingSetting) {
      // Update existing setting
      const { data: updatedSetting, error } = await supabaseAdmin
        .from('settings')
        .update({
          value: data.value,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.key)
        .select()
        .single();
        
      if (error) throw error;
      result = updatedSetting;
    } else {
      // Create new setting
      const { data: newSetting, error } = await supabaseAdmin
        .from('settings')
        .insert([
          {
            id: params.key,
            value: data.value
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      result = newSetting;
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error updating setting ${params.key}:`, error);
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
  }
}
