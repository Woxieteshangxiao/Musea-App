import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { UserProvider } from './context/UserContext';
import { SongProvider } from './context/SongContext';
import Welcome from './pages/Welcome';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterSuccess from './pages/auth/RegisterSuccess';
import Home from './pages/Home';
import Search from './pages/Search';
import DailyRecommend from './pages/DailyRecommend';
import Likes from './pages/Likes';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import SongDetail from './pages/SongDetail';
import ArtistDetail from './pages/ArtistDetail';
import MiniPlayer from './components/MiniPlayer';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <SongProvider>
          <AudioProvider>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-success" element={<RegisterSuccess />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/daily" element={<DailyRecommend />} />
              <Route path="/likes" element={<Likes />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/song/:id" element={<SongDetail />} />
              <Route path="/artist/:artist" element={<ArtistDetail />} />
            </Routes>
            <MiniPlayer />
          </AudioProvider>
        </SongProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
