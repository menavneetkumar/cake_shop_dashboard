import React, { useState } from 'react';
import { step4Data } from '../../data/step4Data';
import './CampaignPreview.css';
import classNames from 'classnames';

const CampaignPreview = () => {
  const [items, setItems] = useState(step4Data);
  const [activeItem, setActiveItem] = useState({});
  const handleClick = (index) => {
    const clickedItem = items.find((item) => item.id === index);
    setActiveItem(clickedItem);
  };
  return (
    <div className='content-container'>
      <div style={{ marginBottom: '24px' }}>
        <div className='step-title'>
          <h4>Ready to go</h4>
          <span>(Step 4 of 4)</span>
        </div>
        <hr />
      </div>

      <div className='campaign-cards-wrapper'>
        {items.map((item, index) => {
          return (
            <div
              className={classNames('campaign-card', {
                'active-item': activeItem?.id === index,
              })}
              key={index}
              onClick={() => handleClick(index)}
            >
              <div className='card-header'>
                <img src={item.profilePic} alt={item.profilePic} />
                <div className='card-header-title'>
                  <p className='card-title'>{item.title}</p>
                  <p className='card-subtitle'>{item.subtitle}</p>
                </div>
              </div>
              <p className='card-content'>{item.content}</p>
              <div className='card-img-container'>
                <img src={item.img} alt={item.img} />
                <img src={item.ctaImg} alt={item.ctaImg} className='cta-img' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignPreview;
