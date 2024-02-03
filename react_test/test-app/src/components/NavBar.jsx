import React from 'react';
import './styles/NavBar.css'

import pycam_icon from './assets/pycam.jpg';
import logout_icon from './assets/logout.svg';

const Navbar = ({ handleLogout, openSettingsPane }) => {
  const getWelcomeMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return 'Good Morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon!';
    } else {
      return 'Good Evening!';
    }
  };

  return (
    <div className='navbar-wrapper'>
      <div className='logo-container'>
        <img src={pycam_icon} alt="" />
      </div>
      <div className='center-navbar'>
        <div className='welcome-message'>{getWelcomeMessage()}</div>
        <div></div>
        <div className='room-cards'>
          <button className='room-card'>+ Add</button>
        </div>
      </div>
      <div className='navbar'>
        <button onClick={handleLogout}>
          <img src={logout_icon} alt='' />
        </button>
      </div>
    </div>
  );
};

export default Navbar;