import React, { useState } from 'react';
import { step1Data } from '../../data/step1Data';
import classNames from 'classnames';
import './CampaignCategory.css';

const CampaignCategory = ({ handlePlatform }) => {
  const [items, setItems] = useState(step1Data);
  const [activeItem, setActiveItem] = useState({});

  const handleClick = (index) => {
    const clickedItem = items.find((item) => item.id === index);
    setActiveItem(clickedItem);
    handlePlatform(clickedItem.platform);
  };

  return (
    <div className='campaign-category-container'>
      <div style={{ marginBottom: '24px' }}>
        <div className='step-title'>
          <h4>What you want to do?</h4>
          <span>(Step 1 of 4)</span>
        </div>
        <hr />
      </div>
      <div className='content-grid'>
        {items.map((item, index) => {
          return (
            <div
              className={classNames('grid-item', {
                'active-item': activeItem?.id === index,
              })}
              key={index}
              onClick={(e) => handleClick(index)}
            >
              {activeItem?.id === index ? (
                <img
                  src={item.imgFilled}
                  alt={item.imgFilled}
                  className='item-icon'
                />
              ) : (
                <img src={item.img} alt={item.img} className='item-icon' />
              )}
              <div>
                <p className='grid-item-title'>{item.title}</p>
                <p className='grid-item-subtitle'>{item.subtitle}</p>
              </div>
              <img
                src='/assets/icons/tickCircleFilled.svg'
                alt='tickCircleFilled'
                className='tickCircleFilled'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignCategory;
