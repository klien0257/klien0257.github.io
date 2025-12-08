import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Search from '../components/Search';
import { logout } from '../utils/Auth';

function NavBar({ user, onSearch, onLogin, onLogout }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="w-full bg-[#1A1A1A] shadow-md z-10">
      {/* NAVBAR */}
      <div className="navbar flex flex-col lg:flex-row items-center container mx-auto py-4 px-4">

        {/* LOGO SECTION */}
        <div className="mx-5 mb-2 lg:mb-0 flex items-center gap-3">
          <img 
            src="/logo.png"
            alt="Movie Ticket Logo"
            className="h-20 w-auto drop-shadow-xl"
          />

          <a href="/" className="flex items-end -ml-2">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              MOVIE
            </span>
            <span 
              className="text-3xl font-extrabold tracking-tight ml-1"
              style={{ color: "#B30000" }}
            >
              TICKET
            </span>
          </a>
        </div>

        {/* SEARCH SECTION */}
        <div className="flex-grow lg:flex lg:justify-end items-center">
          <Search onSearch={onSearch} />
        </div>

        {/* LOGIN / REGISTER SECTION */}
        <div className="flex flex-col lg:flex-row justify-center items-center mr-5">
          <div className="lg:flex lg:justify-center min-[200px]:space-x-8 sm:space-x-8 lg:space-x-4">

            {user ? (
              <button
                className="bg-[#B30000] text-white hover:bg-black hover:border hover:border-[#B30000] rounded px-4 py-1 text-sm font-semibold cursor-pointer h-9 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="bg-[#B30000] text-white hover:bg-black hover:border hover:border-[#B30000] rounded px-4 py-1 text-sm font-semibold cursor-pointer h-9 transition"
                  onClick={() => setShowLoginForm(true)}
                >
                  Login
                </button>

                <button
                  className="bg-[#B30000] text-white hover:bg-black hover:border hover:border-[#B30000] rounded px-4 py-1 text-sm font-semibold cursor-pointer h-9 transition"
                  onClick={() => setShowRegistrationForm(true)}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* LOGIN / REGISTER POPUP */}
      {(showLoginForm || showRegistrationForm) && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-lg popup shadow-xl">
            {showLoginForm && (
              <LoginForm
                onClose={() => setShowLoginForm(false)}
                onLogin={onLogin}
              />
            )}
            {showRegistrationForm && (
              <RegistrationForm
                onClose={() => setShowRegistrationForm(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
