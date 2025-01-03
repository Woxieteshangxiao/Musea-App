import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getSongs } from '../utils/getSongs'; // Import the function for fetching songs
import { Song } from '../types';

// Define the structure of the Context data
interface SongsContextType {
  songs: Song[];
  loading: boolean;
  error: string | null;
  refreshSongs: () => Promise<void>;
  updateSongs: (newSong: Song) => void;
}

// Create SongsContext with a default value of undefined
const SongsContext = createContext<SongsContextType | undefined>(undefined);

// Define the Props type
interface SongsProviderProps {
  children: ReactNode;
}

// Create the SongsProvider
export const SongProvider: React.FC<SongsProviderProps> = ({ children }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSongs = async () => {
      try {
        const data = await getSongs(); // Fetch song data
        setSongs(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error'); // Handle errors
        console.error("Error fetching songs:", err);
      } finally {
        setLoading(false); // Update loading state after request completes
      }
    };

    // Public method to refresh songs
    const refreshSongs = async () => {
      await fetchSongs();
    };

    useEffect(() => {
      fetchSongs(); // Call the function to fetch songs
    }, []); // Dependency array ensures this runs only on initial load

    // Function to update the song list
    const updateSongs = (newSong: Song) => {
      setSongs((prevSongs) => [...prevSongs, newSong]); // Add a newly uploaded song to the list
    };

    return (
      <SongsContext.Provider value={{ songs, loading, error, updateSongs, refreshSongs }}>
      {children}
      </SongsContext.Provider>
    );
};

// Custom hook for using the Context in components
export const useSongs = (): SongsContextType => {
  const context = useContext(SongsContext);
  if (!context) {
    throw new Error('useSongs must be used within a SongsProvider');
  }
  return context;
};
