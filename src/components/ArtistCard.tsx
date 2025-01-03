import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArtistCardProps {
  name: string;
  imageUrl: string;
  songCount: number;
  isFollowed: boolean;
  onToggleFollow: () => void;
}

export default function ArtistCard({ name, imageUrl, songCount, isFollowed, onToggleFollow }: ArtistCardProps) {
  const navigate = useNavigate();

  const handleArtistClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking the follow button
    if (!(e.target as HTMLElement).closest('button')) {
      navigate(`/artist/${encodeURIComponent(name)}`);
    }
  };

  return (
    <div 
      className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-800/50 rounded-lg px-2 transition-colors"
      onClick={handleArtistClick}
    >
      <div className="flex items-center gap-4">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-400">{songCount} songs in total</p>
        </div>
      </div>
      <button
        onClick={onToggleFollow}
        className="flex items-center gap-1 px-4 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
      >
        {isFollowed ? (
          <>
            <span>Followed</span>
            <Check className="w-4 h-4" />
          </>
        ) : (
          'Follow'
        )}
      </button>
    </div>
  );
}