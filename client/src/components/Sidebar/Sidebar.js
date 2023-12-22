import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <img src='assets/icons/logo.svg' className='logo' alt='logo' />
      <div className='sidebar-links'>
      <Link to='/'>
        <div>
          <img src='assets/icons/home.svg' alt='home' />
          <p className='sidebar-link-label'>Home</p>
        </div>
        </Link>


        <Link to='/'>
          <div className='campaign-link'>
            <img src='assets/icons/campaign.svg' alt='campaign' />
            <p className='sidebar-link-label'>Campaign</p>
          </div>
        </Link>

        <div>
          <img src='assets/icons/bag.svg' alt='bag' />
          <p className='sidebar-link-label'>Products</p>
        </div>
        <div>
          <img src='assets/icons/customers.svg' alt='customers' />
          <p className='sidebar-link-label'>Customers</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
