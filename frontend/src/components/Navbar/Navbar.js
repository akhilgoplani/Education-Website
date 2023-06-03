import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import "./Dropdown.css"
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Navlinks from './Navlinks';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

function Navbar() {
  const auth=localStorage.getItem('token');
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const toggleMenu = () => {
    setShowMenu(prev => !prev);
    closeMobileMenu(); // Close the mobile menu when a menu item is clicked
  };

  return (
    <>
    <div className="contener">
      <nav className='navbar responsive-navbar'>
        <Link to='/' className='nav-logo' onClick={closeMobileMenu}>
         LOGO
        </Link>
        <div className="nav-toggle" onClick={toggleMobileMenu}>
          <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"} />
        </div>
        
        <div className={`nav-links ${mobileMenuOpen ? "mobile" : ""}`}>
       <Navlinks showMenu={showMenu}/>                                                        
         <Button/>
         </div>
      </nav>
      </div>
    </>
  );
}

export default Navbar;