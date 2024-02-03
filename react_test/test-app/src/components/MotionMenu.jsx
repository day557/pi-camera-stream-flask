import React from 'react';
import arrow_right from './assets/arrow_right.svg';

const MotionMenu = () => {
  return (
    <div className='motion-menu'>
      <div className='motion-menu-head'>
        <h1>Detection</h1>
        <img src={arrow_right} alt="" />
      </div>
    </div>
  );
};

export default MotionMenu;