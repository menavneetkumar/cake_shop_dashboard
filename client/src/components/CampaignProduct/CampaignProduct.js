import React, { useState } from 'react';
import { step2Data } from '../../data/step2Data';
import './CampaignProduct.css';
import classNames from 'classnames';

const CampaignProduct = ({ handleProduct }) => {
  const [items, setItems] = useState(step2Data);
  const [activeItem, setActiveItem] = useState({});

  const handleClick = (index) => {
    const clickedItem = items.find((item) => item.id === index);
    setActiveItem(clickedItem);
    handleProduct(clickedItem.title, clickedItem.img);
  };
  return (
    <div className='content-container'>
      <div style={{ marginBottom: '24px' }}>
        <div className='step-title'>
          <h4>Choose the product</h4>
          <span>(Step 2 of 4)</span>
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
              onClick={() => handleClick(index)}
            >
              <img src={item.img} alt={item.img} className='item-img' />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <div>
                  <p className='grid-item-title'>{item.title}</p>
                  <p className='grid-item-subtitle'>{item.price}</p>
                </div>
                {activeItem?.id === index ? (
                  <img
                    src='/assets/icons/tickCircleFilled.svg'
                    alt='tickCircleFilled'
                  />
                ) : (
                  <img src='/assets/icons/tickCircle.svg' alt='tick-circle' />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignProduct;
