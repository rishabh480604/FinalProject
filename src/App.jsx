import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/pages/Home';
import Login from './Components/pages/Login';
import MarketPlace from './Components/pages/MarketPlace';
import Drone from './Components/pages/Drone';
import BookServices from './Components/pages/BookServices';
import Profile from './Components/pages/Profile';
import About from './Components/pages/About';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  // Update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className={`app-container ${theme}`}> {/* Apply theme-based styling */}
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
        <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/drone" element={<Drone />} />
          <Route path="/book-services" element={<BookServices />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
