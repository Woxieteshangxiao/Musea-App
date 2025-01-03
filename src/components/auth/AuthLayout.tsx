import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-[#262626] flex flex-col items-center overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center px-4 py-8">
        <img 
          src="welcome.png" 
          alt="welcome" 
          className="absolute w-4/5 max-w-[300px] top-[10%]"
        />
        <div className="w-full max-w-sm bg-gray-800/50 backdrop-blur-lg p-6 rounded-3xl mt-24">
          {children}
        </div>
      </div>
    </div>
  );
}