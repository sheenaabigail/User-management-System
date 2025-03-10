
import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="landing-navbar-class-navbar">
    <div className="landing-navbar-class-logo">VoiceLift</div>
    <div className="landing-navbar-class-nav-links">
			<a href="#home">Home</a>
			<a href="#about">About</a>	
			<a href="#contact">Contact</a>
      <a href="/Auth">Login</a>
    </div>
  </nav>
);

export default Navbar;
