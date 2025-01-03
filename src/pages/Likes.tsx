
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MusicCard from '../components/MusicCard';
import ArtistCard from '../components/ArtistCard';
import { Heart } from 'lucide-react';

import { getSongs } from '../utils/getSongs';
import { getFavoriteArtists } from '../utils/getFavoriteArtists';

type TabType = 'song' | 'singer';

export default function Likes() {
  const [activeTab, setActiveTab] = useState<TabType>('song');
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([
    {
      id: '1',
      name: 'G-DRAGON',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      songCount: 3,
      isFollowed: true
    },
    {
      id: '2',
      name: 'Taylor Swift',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      songCount: 2,
      isFollowed: true
    },
    {
      id: '3',
      name: 'The Weeknd',
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=300&fit=crop',
      songCount: 4,
      isFollowed: true
    }
  ]);

  useEffect(() => {
    const loadSongs = async () => {
      const songsData = await getSongs();
      const likedSongs = songsData.filter((song) => song.isLiked);
      setSongs(likedSongs);
    };

    loadSongs();
  }, []);

  const toggleFollow = (artistId: string) => {
    setArtists(artists.map(artist => 
      artist.id === artistId 
        ? { ...artist, isFollowed: !artist.isFollowed }
        : artist
    ));
  };

  return (
    <Layout>
      <img src="/from-your-liking.png" alt="From Your Liking" className='absolute w-40 right-4 top-20' />
      <img src="quanzhilong.png" alt="" className='w-[100%]' />
      <div className="p-6 pb-32">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-bold">Favorite</h1>
        </div>

        <div className="flex gap-4 mb-6">
          <button 
            className={`px-4 py-1 rounded-full transition-colors ${
              activeTab === 'song' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-800 text-gray-400'
            }`}
            onClick={() => setActiveTab('song')}
          >
            song
          </button>
          <button 
            className={`px-4 py-1 rounded-full transition-colors ${
              activeTab === 'singer' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-800 text-gray-400'
            }`}
            onClick={() => setActiveTab('singer')}
          >
            singer
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'song' ? (
            songs.map((song, index) => (
              <MusicCard key={song.id} song={song} rank={index + 1} />
            ))
          ) : (
            artists.map(artist => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                imageUrl={artist.imageUrl}
                songCount={artist.songCount}
                isFollowed={artist.isFollowed}
                onToggleFollow={() => toggleFollow(artist.id)}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}