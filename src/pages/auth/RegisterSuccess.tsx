import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';

export default function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <User className="w-16 h-16 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Registered successfully</h2>
        <p className="text-gray-400 mb-8">Start your journey!</p>
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 transition-colors"
        >
          Start now
        </button>
      </div>
    </AuthLayout>
  );
}