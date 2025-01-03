import supabase from './client';

export const uploadSong = async (
  file: File,
  title: string,
  artist: string,
  coverUrl: string,
  userId: string
) => {
  try {
    // Upload audio file to storage
    const audioFileName = `${Date.now()}-${file.name}`;
    const { data: audioData, error: audioError } = await supabase.storage
      .from('songs')
      .upload(audioFileName, file);

    if (audioError) throw audioError;

    // Get the public URL for the uploaded audio
    const { data: { publicUrl: audioUrl } } = supabase.storage
      .from('songs')
      .getPublicUrl(audioFileName);

    // Insert song record into the database
    const { data, error } = await supabase
      .from('songs')
      .insert([
        {
          title,
          artist,
          cover: coverUrl,
          audioUrl,
          user_id: userId,
          likes: 3,
          isLiked: false,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    alert("Song updated successfully!")

    return data;
  } catch (error) {
    console.error('Error uploading song:', error);
    throw error;
  }
};