import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const searchIcon = "/search-w.png"; // Set search icon as fixed

    return (
        <>
            <div className='navbar'>
                <Link to="/about"> {/* Redirect to About page */}
                    <img src="/logo.jpg" alt="Logo" className='logo' />
                </Link>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/marketplace">MarketPlace</Link></li>
                    {/* <li><Link to="/drone">Drone</Link></li> */}
                    <li><Link to="/book-services">Book Services</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
                <div className='search-box'>
                    <input type="text" placeholder='Search' />
                    <img src={searchIcon} alt="search icon" />
                </div>
            </div>

            {/* Main content container that starts below the navbar */}
            <div className="main-content">
                {/* Add your other components or main content here */}
            </div>
        </>
    );
};

export default Navbar;
