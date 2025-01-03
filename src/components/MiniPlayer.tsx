import React from "react";
import { SkipBack, Play, Pause, SkipForward, Music2 } from "lucide-react";
import { useAudio } from "../context/AudioContext";
import { useNavigate } from "react-router-dom";
import { useHideMiniPlayer } from "../hooks/useHideMiniPlayer";

export default function MiniPlayer() {
  const { currentSong, isPlaying, toggle } = useAudio();
  const navigate = useNavigate();
  const shouldHide = useHideMiniPlayer();

  if (!currentSong || shouldHide) return null;

  const handleSongClick = () => {
    navigate(`/song/${currentSong.id}`);
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto bg-gray-800/90 backdrop-blur-lg p-2 border-t border-gray-700">
      <div className="flex items-center gap-3">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <div
          className="flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleSongClick}
        >
          <p className="text-sm font-medium truncate text-white hover:text-purple-500 transition-colors">
            {currentSong.title}
          </p>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:text-purple-500">
            <SkipBack size={20} />
          </button>
          <button onClick={toggle} className="p-2 hover:text-purple-500">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="p-2 hover:text-purple-500">
            <SkipForward size={20} />
          </button>
          <button className="p-2 hover:text-purple-500">
            <Music2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
