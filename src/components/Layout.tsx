import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-[#272727] text-white flex flex-col">
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-800 px-12 py-2">
        <div className="flex justify-between items-center">
          <Link
            to="/home"
            className={`flex flex-col items-center ${
              location.pathname === "/home"
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          >
            {location.pathname === "/home" ? (
              <img src="/home-logo.png" alt="Home" className="w-6" />
            ) : (
              <img src="/home-logo-grey.png" alt="Home" className="w-6" />
            )}
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/likes"
            className={`flex flex-col items-center ${
              location.pathname === "/likes"
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          >
            {location.pathname === "/likes" ? (
              <img src="/love-icon.png" alt="Love" className="w-8" />
            ) : (
              <img src="/love-icon-grey.png" alt="Love" className="w-8" />
            )}
            <span className="text-xs mt-1">Love</span>
          </Link>
          <Link
            to="/upload"
            className={`flex flex-col items-center ${
              location.pathname === "/upload"
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          >
            {location.pathname === "/upload" ? (
              <img src="/upload-icon.png" alt="Upload" className="w-8" />
            ) : (
              <img src="/upload-icon-grey.png" alt="Upload" className="w-8" />
            )}
            <span className="text-xs mt-1">Upload</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center ${
              location.pathname === "/profile"
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          >
            {location.pathname === "/profile" ? (
              <img src="/me-icon.png" alt="Me" className="w-6" />
            ) : (
              <img src="/me-icon-grey.png" alt="Me" className="w-6" />
            )}
            <span className="text-xs mt-1">Me</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
