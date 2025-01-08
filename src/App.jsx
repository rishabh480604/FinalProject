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
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');

  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  // Set a session cookie with a specific expiration time (in days)
  const setCookie = (value, expiryInMinutes) => {
    Cookies.set("sessionId", value, { expires: expiryInMinutes, path: '/', secure: true, sameSite: 'Strict' });
  };

  //if cookie is their return sessionId else null
  const getCookie = () => {
    return Cookies.get("sessionId");
    
  };

  // Update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  useEffect(()=>{
    const val=getCookie();
    if(val){
      //fetch user Data and load
      //change status to true
    }else{
      //status false
      
    }
  },[]);
  
  

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
