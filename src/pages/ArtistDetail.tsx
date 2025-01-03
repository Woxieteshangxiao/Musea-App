import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { songs } from '../data/songs';
import MusicCard from '../components/MusicCard';

export default function ArtistDetail() {
  const { artist } = useParams();
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<'popular' | 'alphabetical'>('popular');
  const [isFollowing, setIsFollowing] = useState(false);

  // Filter songs by artist
  const artistSongs = songs.filter(song => song.artist === artist);

  // Sort songs based on sort type
  const sortedSongs = [...artistSongs].sort((a, b) => {
    if (sortType === 'popular') {
      return b.likes - a.likes;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const backgroundImage = artistSongs[0]?.cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=600&fit=crop';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with background image */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900">
          <div className="absolute top-6 left-6">
            <button onClick={() => navigate(-1)} className="p-2 bg-black/30 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Artist Info */}
      <div className="relative px-6 pb-32">
        <div className="-mt-20 text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{artist}</h1>
          <p className="text-gray-400 mb-4">From Taiwan, China</p>
          <button
            onClick={toggleFollow}
            className={`px-6 py-2 rounded-full ${
              isFollowing 
                ? 'bg-gray-700 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {isFollowing ? 'Followed' : '+ Follow'}
          </button>
        </div>

        {/* Music Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Music</h2>
            <p className="text-gray-400">{artistSongs.length} songs in total</p>
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSortType('popular')}
              className={`px-4 py-1 rounded-full ${
                sortType === 'popular' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              "Popular" sort
            </button>
            <button
              onClick={() => setSortType('alphabetical')}
              className={`px-4 py-1 rounded-full ${
                sortType === 'alphabetical' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              "Alphabetical" sort
            </button>
          </div>

          {/* Song List */}
          <div className="space-y-4">
            {sortedSongs.map((song, index) => (
              <MusicCard 
                key={song.id} 
                song={song} 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}