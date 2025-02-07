import React, { useEffect, useState } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/pages/Home';
import Login from './Components/pages/Login';
import MarketPlace from './Components/pages/MarketPlace';
import Drone from './Components/pages/Drone';
import BookServices from './Components/pages/BookServices';
import Profile from './Components/pages/Profile';
import About from './Components/pages/About';
import { useDispatch ,useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import { login, logout } from './store/authSlice';
import axios from 'axios';


const App = () => {
  const dispatch=useDispatch();
 
  const isLoggedIn=useSelector((state)=>state.auth.status);
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

  useEffect(() => {
    const fetchData = async () => {
      const val = getCookie();
      if (val) {
        try {
          const response = await axios.post(
            'http://127.0.0.1:5000/fetchData', 
            { sessionId: val }, 
            { withCredentials: true }
          );
          
          if (response.data.status === 200) {
            
            dispatch(login({userData:response.data.user}));
            
          }
          // console.log(response?.data?.message);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        // If no session cookie, log out
        dispatch(logout());
      }
    };
  
    fetchData(); 
  }, [isLoggedIn]); 
  
  
  

  return (
    <BrowserRouter>
      
      <div className={`app-container ${theme}`}> Apply theme-based styling
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
    </BrowserRouter>
  );
};

export default App;
