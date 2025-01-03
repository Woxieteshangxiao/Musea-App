export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  likes: number;
  isLiked: boolean;
  audioUrl: string;
}

export interface User {
  name: string;
  email: string;
}