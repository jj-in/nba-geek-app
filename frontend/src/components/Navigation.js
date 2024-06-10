import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './Navigation.css';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useUser(); 
  // Using the context to determine user status, user is username

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const hideDropdown = () => setIsDropdownOpen(false);

  // conditional rendering of navbar 'account' links whether logged in or not
  const accountLinks = user ? 
    (<>
      <Link to="/profile" className="dropdown-link">Profile</Link>
      <Link to="/settings" className="dropdown-link">Settings</Link>
      <button onClick={logout} className="dropdown-link">Logout</button>
    </>)
    : 
    (<>
      <Link to="/signup" className="nav-link">Sign Up</Link>
      <Link to="/login" className="nav-link">Login</Link>
    </>);

  return (
    <div className="navbar">
      <div className="nav-items-left">
        <Link to="/" className="navbar-logo">
          <img src="/images/basiclogo300x300.png" alt="Logo" />
        </Link>
        <Link to="/" className="nav-link">NBA-GEEK</Link>
      </div>
      <div className="nav-items-right">
        <Link to="/players" className="nav-link">Players</Link>
        <Link to="/teams" className="nav-link">Teams</Link>
        <Link to="/synergy/league" className="nav-link">Synergy</Link>
        <div onMouseLeave={hideDropdown} className="account-menu">
          <button onClick={toggleDropdown} className="nav-link nav-link-account">Account</button>
          {isDropdownOpen && (
            <div className="account-dropdown">
              {accountLinks}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;