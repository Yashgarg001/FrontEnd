import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Real-Time Chat</div>
      <div className="navbar-links">
        <Link to="/SignInPage" className="navbar-link">Sign In</Link>
        <span className="navbar-divider">|</span>
        <Link to="/SignUpPage" className="navbar-link">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
