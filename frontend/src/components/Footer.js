import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

// Placeholder footer within link back to homepage
const Footer = () => {

  return (
    <>
    <footer>
      <p></p>
        <p><Link to="/">HOME</Link></p>
    </footer>
    </>
  );
}

export default Footer;
