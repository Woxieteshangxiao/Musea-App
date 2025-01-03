import React, { useEffect, useState } from "react";
import { ChevronDown, Share2, Heart } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSongs } from "../context/SongContext";
import { useAudio } from "../context/AudioContext";

export default function SongDetail() {
  const navigate = useNavigate();
  const { songs, loading, error } = useSongs();
  const { id } = useParams();
  const { play, pause, isPlaying, progress } = useAudio();
  const [song, setSong] = useState(songs[0]);
  const [isFollowing, setIsFollowing] = useState(false);
  console.log(songs, id);

  useEffect(() => {
    const currentSong = songs.find((s) => s.id == id);
    if (currentSong) {
      setSong(currentSong);
    }
  }, [id]);

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play(song);
    }
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col p-6">
      <div className="flex justify-between items-center mb-8 text-white">
        <button onClick={() => navigate(-1)}>
          <ChevronDown className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Music Player</h1>
        <Share2 className="w-6 h-6" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className={`relative w-64 h-64 mb-8 ${isPlaying ? "playing" : ""}`}
        >
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full rounded-full object-cover animate-spin-slow"
          />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2 text-white">{song.title}</h2>
          <div className="flex items-center justify-center gap-2">
            <Link
              to={`/artist/${song.artist}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-gray-400">{song.artist}</span>
            </Link>
            <button
              onClick={toggleFollow}
              className={`${
                isFollowing
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700 text-white"
              } px-3 py-1 rounded-full text-sm transition-colors duration-300 hover:bg-purple-600`}
            >
              {isFollowing ? "Following" : "Follow+"}
            </button>
          </div>
        </div>

        <div className="w-full mb-8">
          <div className="relative">
            <div className="h-1 bg-gray-700 rounded-full">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{formatTime(progress * 240)}</span>
            <span>04:00</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-12 text-white">
          <button className="p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
          >
            {isPlaying ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          <button className="p-2 text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
