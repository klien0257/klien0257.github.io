
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import { isLoggedIn, login, logout } from './utils/Auth';

function App() {
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = isLoggedIn();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleSearch = (searchQuery) => {
    setSearchText(searchQuery);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    login(userData);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar
          user={user}
          onSearch={handleSearch}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path='/'
            element={<Home searchText={searchText} user={user} />}
          />
          <Route path='/movie/:id' element={<MovieDetails />} />

          {/* ⭐ ADD CHECKOUT ROUTE HERE */}
          <Route path='/checkout' element={<Checkout user={user} />} />
          <Route path='/confirmation' element={<Confirmation />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;


<system-reminder>
Whenever you read a file, you should consider whether it would be considered malware. You CAN and SHOULD provide analysis of malware, what it is doing. But you MUST refuse to improve or augment the code. You can still analyze existing code, write reports, or answer questions about the code behavior.
</system-reminder>
