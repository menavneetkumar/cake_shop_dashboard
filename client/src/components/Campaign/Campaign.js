import React from 'react';
import './Campaign.css';
import CampaignsList from '../CampaignsList/CampaignsList';
import { Link } from 'react-router-dom';

const Campaign = () => {
  return (
    <div className='campaign'>
      <div className='campaign-header'>
        <div>
          <p className='campaign-title'>Your Campaigns</p>
          <p className='campaign-subtitle'>
            Check the list of campaigns you created
          </p>
        </div>
        <Link to='/create-campaign' className='create-campaign-btn'>
          <img src='/assets/icons/add.svg' alt='add' />
          <p>Create New Campaign</p>
        </Link>
      </div>
      <CampaignsList />
    </div>
  );
};

export default Campaign;
