import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { User, Image, Monitor, Type, CreditCard, Edit2 } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-gray-900 p-6 pb-32">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-1">Bryce</h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-lg rounded-xl">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              <span>Name: Bryce</span>
            </div>
            <Edit2 className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-lg rounded-xl">
            <div className="flex items-center gap-3">
              <Image className="w-5 h-5" />
              <span>Avatar</span>
            </div>
            <Edit2 className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-lg rounded-xl">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5" />
              <span>Backdrop</span>
            </div>
            <Edit2 className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-lg rounded-xl">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5" />
              <span>Font</span>
            </div>
            <Edit2 className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-lg rounded-xl">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <span>Account: 32****@qq.com</span>
            </div>
            <Edit2 className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button
          className="w-full mt-8 py-3 bg-red-500 text-white rounded-xl"
          onClick={() => navigate('/')}
        >
          Quit
        </button>
      </div>
    </Layout>
  );
}
