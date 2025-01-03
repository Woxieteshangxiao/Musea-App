import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import supabase from "../utils/client";
import { useSongs } from "../context/SongContext";
import { Song } from "../types";

interface MusicCardProps {
  song: Song;
  rank?: number;
}

export default function MusicCard({ song, rank }: MusicCardProps) {
  const { refreshSongs } = useSongs();
  const { title, id, artist, cover, isLiked, likes } = song;

  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikeClick = async () => {
    try {
      const newLikedStatus = !liked;
      const newLikeCount = newLikedStatus ? likeCount + 1 : likeCount - 1;

      setLiked(newLikedStatus);
      setLikeCount(newLikeCount);

      const { data, error } = await supabase
        .from("songs")
        .update({
          isLiked: newLikedStatus,
          likes: newLikeCount,
        })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      await refreshSongs();
    } catch (e) {
      console.error("Error updating song like status:", e);
    }
  };

  return (
    <div className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
      {rank && (
        <span className="text-2xl font-bold text-gray-400 w-8">{rank}</span>
      )}
      <img
        src={cover}
        alt={title}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="flex-1">
        <Link to={`/song/${id}`} className="text-white hover:text-purple-500">
          <h3 className="font-semibold">{title}</h3>
        </Link>
        <Link
          to={`/artist/${artist}`}
          className="text-gray-400 hover:text-purple-500 cursor-pointer"
        >
          <p className="text-sm">{artist}</p>
        </Link>
      </div>
      <button
        className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-full"
        onClick={handleLikeClick}
        aria-label={liked ? "Unlike song" : "Like song"}
      >
        <Heart
          className={`w-5 h-5 ${
            liked ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
        <span className="text-sm text-gray-400">x{likeCount}</span>
      </button>
    </div>
  );
}
