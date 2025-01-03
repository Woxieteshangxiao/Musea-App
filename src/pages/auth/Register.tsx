import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout.tsx';
import AuthInput from '../../components/auth/AuthInput.tsx';
import { register } from '../../utils/auth.ts';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/register-success');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-white mb-6">Sign up</h2>
      <p className="text-gray-400 mb-6">Fill out the form</p>

      <form onSubmit={handleRegister}>
        <AuthInput
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon="user"
        />
        <AuthInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="email"
        />
        <AuthInput
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="password"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 transition-colors mb-6"
        >
          Sign up
        </button>
      </form>

      <p className="text-center text-gray-400">
        Existing account?{' '}
        <button onClick={() => navigate('/login')} className="text-red-500">
          Log in
        </button>
      </p>
    </AuthLayout>
  );
}