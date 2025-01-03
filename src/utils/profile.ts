import supabase from './client';
import { uploadImage } from './uploadImage';

export interface Profile {
  id: string;
  name: string;
  avatar_url: string;
  backdrop: string;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(
  userId: string,
  updates: Partial<Profile>,
  avatarFile?: File
): Promise<Profile> {
  try {
    let avatar_url = updates.avatar_url;

    // If avatar file is provided, upload it first
    if (avatarFile) {
      avatar_url = await uploadImage(avatarFile);
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, avatar_url, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}