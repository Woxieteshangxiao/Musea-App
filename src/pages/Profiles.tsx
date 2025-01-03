import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Monitor, Type, CreditCard } from 'lucide-react';
import Layout from '../components/Layout';
import ProfileField from '../components/profile/ProfileField';
import AvatarUpload from '../components/profile/AvatarUpload';
import { getProfile, updateProfile, type Profile } from '../utils/profile';
import { useUser } from '../context/UserContext';
import { logout } from '../utils/auth';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile(user.id);
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (field: string, value: string) => {
    try {
      const updates = { [field]: value };
      const updatedProfile = await updateProfile(user.id, updates, field === 'avatar_url' ? avatarFile || undefined : undefined);
      setProfile(updatedProfile);
      updateUser(updatedProfile);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-gray-900 p-6 pb-32">
        <div className="flex flex-col items-center mb-8">
          <AvatarUpload
            currentUrl={profile?.avatar_url}
            onFileSelect={(file) => setAvatarFile(file)}
          />
          <h1 className="text-2xl font-bold mb-1">{profile?.name}</h1>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <ProfileField
            label="Name"
            value={profile?.name || ''}
            icon={<User className="w-5 h-5" />}
            onSave={(value) => handleUpdateProfile('name', value)}
          />

          <ProfileField
            label="Backdrop"
            value={profile?.backdrop || ''}
            icon={<Monitor className="w-5 h-5" />}
            onSave={(value) => handleUpdateProfile('backdrop', value)}
          />

          <ProfileField
            label="Font"
            value="Default"
            icon={<Type className="w-5 h-5" />}
            onSave={() => {}}
          />

          <ProfileField
            label="Account"
            value={user.email}
            icon={<CreditCard className="w-5 h-5" />}
            onSave={(value) => handleUpdateProfile('email', value)}
          />
        </div>

        <button
          className="w-full mt-8 py-3 bg-red-500 text-white rounded-xl"
          onClick={handleLogout}
        >
          Quit
        </button>
      </div>
    </Layout>
  );
}