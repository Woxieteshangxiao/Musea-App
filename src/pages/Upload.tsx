import React, { useState, useRef } from "react";
import { Plus, Minus, Upload as UploadIcon, Music, Image } from "lucide-react";
import Layout from "../components/Layout";
import { uploadSong } from "../utils/uploadSong";
import { uploadImage } from "../utils/uploadImage";
import { useUser } from "../context/UserContext";
import { useSongs } from "../context/SongContext";

export default function Upload() {
  const { user } = useUser();
  const { refreshSongs } = useSongs();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverFile(file);
      setError("");
      // Create preview URL for the image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      setError("");
    } else {
      setError("Please select a valid audio file");
    }
  };

  const handleUpload = async () => {
    if (!audioFile || !coverFile || !title || !artist) {
      setError("Please fill in all fields");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // First upload the cover image
      const coverUrl = await uploadImage(coverFile);

      // Then upload the song with the cover URL
      await uploadSong(audioFile, title, artist, coverUrl, user.id);

      // Reset form
      setTitle("");
      setArtist("");
      setCoverFile(null);
      setAudioFile(null);
      setPreviewUrl(null);
      if (audioInputRef.current) audioInputRef.current.value = "";
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (err) {
      setError("Failed to upload song. Please try again.");
    } finally {
      setIsUploading(false);
      // Refresh songs after successful upload
      await refreshSongs();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-teal-900 to-gray-900 p-6 pb-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Upload</h1>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-800 rounded-full">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-full">
              <Minus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Song Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg"
                placeholder="Enter song title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Artist
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg"
                placeholder="Enter artist name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Cover Image
              </label>
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <div className="space-y-2">
                {previewUrl && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Image className="w-5 h-5" />
                  {coverFile ? "Change cover image" : "Select cover image"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Audio File
              </label>
              <input
                type="file"
                ref={audioInputRef}
                accept="audio/*"
                onChange={handleAudioSelect}
                className="hidden"
              />
              <button
                onClick={() => audioInputRef.current?.click()}
                className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Music className="w-5 h-5" />
                {audioFile ? audioFile.name : "Select audio file"}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-purple-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              <UploadIcon className="w-5 h-5" />
              {isUploading ? "Uploading..." : "Upload Song"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-2">Recently Uploaded</h2>
          {/* List of recently uploaded songs will be displayed here */}
        </div>
      </div>
    </Layout>
  );
}
