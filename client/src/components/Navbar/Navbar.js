import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='free-trial'>
        <p>Free trial ends in 2 days</p>
        <img src='assets/icons/buy-plan.svg' alt='buy-plan' />
      </div>
      <img src='assets/icons/gift.svg' alt='gift' />
      <img src='assets/icons/notification.svg' alt='notification' />
      <img src='assets/icons/cake-shop.svg' alt='cake-shop' />
      <img src='assets/icons/language-switch.svg' alt='language-switch' />
    </div>
  );
};

export default Navbar;
