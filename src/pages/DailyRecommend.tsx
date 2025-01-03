import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MusicCard from '../components/MusicCard';
import { useSongs } from '../context/SongContext';

export default function DailyRecommend() {
  const navigate = useNavigate();
  const date = new Date().toISOString().split('T')[0];
  const { songs, loading, error } = useSongs();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Music</h1>
      </div>

      <div className="mb-8">
        <p className="text-gray-400">{date}</p>
        <p className="text-sm text-gray-400">From all songs</p>
      </div>

      <div className="space-y-4">
        {songs.map((song, index) => (
          <MusicCard key={song.id} song={song} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}