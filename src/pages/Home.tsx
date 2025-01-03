import React from 'react';
import Layout from '../components/Layout';
import MusicCard from '../components/MusicCard';
import { useSongs } from '../context/SongContext';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();

  const { songs, loading, error } = useSongs();


  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <Layout>
      <div className="p-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hello, Bryce</h1>
          </div>
          <img src="bell.svg" alt="" />
        </div>

        <div 
          className="relative mb-8 w-full cursor-pointer flex justify-center items-center"
          onClick={() => navigate('/search')}
        >
          <img src="search-box.png" alt="search box" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Daily button */}
          <button
            onClick={() => navigate('/daily')}
            className="group relative overflow-hidden rounded-2xl"
            style={{ height: '250px' }}
          >
            <div className="absolute inset-0 bg-[#454545] group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 p-4 flex flex-col justify-start text-left">
              <img src="d1.png" alt="" className="mb-2" />
              <h3 className="font-semibold text-white mb-1 text-sm">A new song to your taste</h3>
              <p className="text-sm text-white/80">{formattedDate}</p>
            </div>
          </button>

          {/* Likes button */}
          <button
            onClick={() => navigate('/likes')}
            className="group relative overflow-hidden rounded-2xl"
            style={{ height: '250px' }}
          >
            <div className="absolute inset-0 bg-[#454545] group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 p-4 flex flex-col justify-start text-left">
              <img src="d3.png" alt="" className="mb-2" />
              <h3 className="font-semibold text-white mb-1 text-sm">From your liking</h3>
            </div>
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Top 10 songs</h2>
        <div className="space-y-4">
          {songs.sort((a, b) => b.likes - a.likes).slice(0, 10).map((song, index) => (
            <MusicCard key={song.id} song={song} rank={index + 1} />
          ))}
        </div>
      </div>
    </Layout>
  );
}