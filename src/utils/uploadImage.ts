import supabase from './client';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const imageFileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('covers')
      .upload(imageFileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('covers')
      .getPublicUrl(imageFileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};