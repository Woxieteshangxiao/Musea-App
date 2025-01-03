import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Welcome() {
  const navigate = useNavigate();

  // Handle viewport height issues on mobile devices
  useEffect(() => {
    // Set initial viewport height
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial setup
    setVH();

    // Listen for resize events
    window.addEventListener('resize', setVH);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', setVH);
    };
  }, []);

  return (
    <div 
      className="w-full min-h-screen bg-[#262626] flex flex-col items-center justify-center p-8 text-white relative"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <img 
          src="welcome.png" 
          alt="welcome" 
          className="w-auto max-w-full mb-10 object-contain"
        />
        <div
          onClick={() => navigate('/login')}
          className="cursor-pointer focus:outline-none"
        >
          <img 
            src="enter-btn.png" 
            alt="Enter" 
            className="w-20 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
