import React, { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { songs } from '../data/songs';
import MusicCard from '../components/MusicCard';

export default function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory] = useState(['Love', 'Sweet', 'Home', 'Story', 'Pure', 'Sunshine']);

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArtists = Array.from(new Set(
    songs.filter(song => 
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(song => song.artist)
  ));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full bg-gray-800 text-white pl-4 pr-4 py-2 rounded-full"
            autoFocus
          />
        </div>
      </div>

      {!searchTerm ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Search history</h2>
            <button>
              <Trash2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(term)}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm"
              >
                {term}
              </button>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm">
            A maximum of 9 records can be displayed
          </p>
        </>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Search results</h2>
            <p className="text-sm text-gray-400 mb-4">
              There are {filteredSongs.length} results in total
            </p>
            <div className="space-y-4">
              {filteredSongs.map((song, index) => (
                <MusicCard key={song.id} song={song} rank={index + 1} />
              ))}
            </div>
          </div>

          {filteredArtists.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Related singer</h2>
              <p className="text-sm text-gray-400 mb-4">
                There are {filteredArtists.length} results in total
              </p>
              <div className="grid grid-cols-3 gap-4">
                {filteredArtists.map((artist, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-2">
                      <img
                        src={songs.find(s => s.artist === artist)?.cover}
                        alt={artist}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Link 
                        to={`/artist/${artist}`} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                      {artist}
                    </Link>
                    {/* <p className="text-sm">{artist}</p> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}