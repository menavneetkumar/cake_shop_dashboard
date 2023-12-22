import React, { useState } from 'react';
import './CampaignsList.css';
import CampaignsData from '../CampaignsData/CampaignsData';

const CampaignsList = () => {
  const [platformOption, setPlatformOption] = useState('All Platform');
  const [statusOption, setStatusOption] = useState('All Status');

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='campaigns-list'>
      <div className='campaigns-list-header'>
        <div className='search-container'>
          <img
            src='/assets/icons/search.svg'
            className='search-icon'
            alt='search-icon'
          />
          <input
            type='text'
            placeholder='Search for the campaign'
            className='search-box'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='search-filters'>
          <div style={{ position: 'relative' }}>
            <img
              src='assets/icons/downArrow.svg'
              alt='Arrow'
              className='filter-icon'
            />
            <label for='platform'>Platform:</label>
            <select
              name='platform'
              id='platform'
              className='filter'
              onChange={(e) => setPlatformOption(e.target.value)}
            >
              <option value='All Platform' defaultValue>
                All Platform
              </option>
              <option value='Facebook'>Facebook</option>
              <option value='Google'>Google</option>
              <option value='Youtube'>Youtube</option>
              <option value='Instagram'>Instagram</option>
            </select>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src='assets/icons/downArrow.svg'
              alt='Arrow'
              className='filter-icon'
            />
            <label for='status'>Status:</label>
            <select
              name='status'
              id='status'
              className='filter'
              onChange={(e) => setStatusOption(e.target.value)}
            >
              <option value='All Status' defaultValue>
                All Status
              </option>
              <option value='Live now'>Live now</option>
              <option value='Paused'>Paused</option>
              <option value='Exhausted'>Exhausted</option>
            </select>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src='assets/icons/downArrow.svg'
              alt='Arrow'
              className='filter-icon'
            />
            <select name='date-range' id='date-range' className='filter'>
              <option value='Last 30 days' defaultValue>
                Last 7 days
              </option>
              <option value='Last 3 months'>Last 1 month</option>
              <option value='Last 3 months'>Last 3 months</option>
              <option value='Last 6 months'>Last 6 months</option>
              <option value='Last 1 year'>Last 1 year</option>
            </select>
          </div>
        </div>
      </div>
      <CampaignsData
        searchTerm={searchTerm}
        platformOption={platformOption}
        statusOption={statusOption}
      />
    </div>
  );
};

export default CampaignsList;
