import supabase from "../utils/client.ts";

/**
 * Fetch all songs
 * @returns {Promise<Array>} Returns data of all songs
 */
export const getSongs = async () => {
  const { data, error } = await supabase
    .from("songs") // Fetch data from the 'songs' table
    .select("*"); // Retrieve all fields

  if (error) {
    console.error("Error fetching songs:", error);
    return []; // Return an empty array if an error occurs
  }

  return data; // Return the data
};
