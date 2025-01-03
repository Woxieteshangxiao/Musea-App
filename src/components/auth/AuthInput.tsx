import React from 'react';
import { User, Mail, Lock } from 'lucide-react';

interface AuthInputProps {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: 'user' | 'email' | 'password';
}

export default function AuthInput({ type, placeholder, value, onChange, icon }: AuthInputProps) {
  const getIcon = () => {
    switch (icon) {
      case 'user':
        return <User className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'password':
        return <Lock className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {getIcon()}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-700/50 text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}