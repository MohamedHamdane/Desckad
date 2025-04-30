import React, { useState } from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'page2', path: '/' },
    { name: 'page3', path: '/' },
    { name: 'page4', path: '/' }
  ];

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header-container">
        <div className="header-left">
          {/* <Link to="/" className="header-name-link"> */}
          <img     src={isDarkMode ? "/img/logo_blanc.svg" : "/img/logo_noir.svg"} alt='logo' />
          {/* </Link> */}
        </div>
        
        <div className="header-right">
          <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? <FaMoon /> : <FaSun />}
          </button>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Full-page overlay menu */}
      <div className={`fullscreen-menu ${menuOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {/* <Link to={item.path} onClick={handleMenuItemClick} className="menu-item"> */}
                  {item.name}
                {/* </Link> */}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;