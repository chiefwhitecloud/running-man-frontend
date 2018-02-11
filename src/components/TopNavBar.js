import React from 'react';
import { Link } from 'react-router-dom';

const TopNavBar = () => {
  const headerStyle = {
    backgroundColor: '#292c2f',
    boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.15)',
    padding: '20px 40px',
    height: '80px',
    boxSizing: 'border-box',
  };

  const innerHeaderStyle = {
    maxWidth: '1200px',
    textAlign: 'center',
    margin: '0 auto',
  };

  const logoStyle = {
    float: 'left',
    font: 'normal 28px Cookie, Arial, Helvetica, sans-serif',
    lineHeight: '40px',
    margin: '0',
  };

  const navLinkStyle = {
    fontFamily: 'Cookie, Arial, Helvetica, sans-serif',
    lineHeight: '40px',
    textDecoration: 'none',
    width: '120px',
    color: '#ffffff',
    float: 'right',
  };

  return (<div>
    <div style={headerStyle}>
      <div style={innerHeaderStyle}>
        <h1 style={logoStyle}>
          <Link to='/' style={{ textDecoration: 'none', color: '#ffffff' }} >Running Man</Link>
        </h1>
        <Link to='/' style={navLinkStyle}>Home</Link>
        <Link to='/about' style={navLinkStyle}>About</Link>
        <Link to='/races' style={navLinkStyle}>Races</Link>
        <div style={{ clear: 'both' }} />
      </div>
    </div>
  </div>);
};

export default TopNavBar;
