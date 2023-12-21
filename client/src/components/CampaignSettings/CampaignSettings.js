import React, { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import './CampaignSettings.css';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import LocationSearchInput from '../LocationSearchInput/LocationSearchInput';
import { CalendarIcon } from '../CalendarIcon';
import classNames from 'classnames';

const CampaignSettings = ({ setDateRange, setCoords, setBudget }) => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [budgetSliderValue, setBudgetSliderValue] = useState(20000);
  const [locationSliderValue, setLocationSliderValue] = useState(8);

  const [activeTimelineTab, setActiveTimelineTab] = useState('lifetime');
  const [activeLocationTab, setActiveLocationTab] = useState('location');

  useEffect(() => {
    setBudget(budgetSliderValue);
  }, [budgetSliderValue]);

  setDateRange(
    value[0].toDateString().split(' ')[2] +
      value[0].toDateString().split(' ')[1] +
      value[0].toDateString().split(' ')[3] +
      ' - ' +
      value[1].toDateString().split(' ')[2] +
      value[1].toDateString().split(' ')[1] +
      value[1].toDateString().split(' ')[3]
  );

  const leftlabelStyles = {
    mt: '2',
    ml: '0',
    fontSize: 'sm',
  };
  const rightlabelStyles = {
    mt: '2',
    ml: '-10',
    fontSize: 'sm',
  };
  const rightLocationlabelStyles = {
    mt: '2',
    ml: '-3',
    fontSize: 'sm',
  };
  return (
    <div className='content-container'>
      <div style={{ marginBottom: '24px' }}>
        <div className='step-title'>
          <h4>Campaign Settings</h4>
          <span>(Step 3 of 4)</span>
        </div>
        <hr />
      </div>

      <div className='budget-setting'>
        <div className='setting-title'>
          <span>1</span>
          <p>Budget and dates info</p>
        </div>
        <div className='budget-setting-content'>
          <div className='budget-timeline'>
            <label>Budget Timeline</label>
            <div className='budget-timeline-tabs'>
              <span
                className={classNames('budget-timeline-tab', {
                  'active': activeTimelineTab === 'lifetime',
                })}
                onClick={() => setActiveTimelineTab('lifetime')}
              >
                Lifetime
              </span>
              <span
                className={classNames('budget-timeline-tab', {
                  'active': activeTimelineTab === 'daily',
                })}
                onClick={() => setActiveTimelineTab('daily')}
              >
                Daily
              </span>
            </div>
          </div>
          <div className='date-range'>
            <label>Select date range</label>
            <DateRangePicker
              onChange={onChange}
              value={value}
              format={'dd-MM-y'}
              clearIcon={null}
              calendarIcon={<CalendarIcon />}
              className={'date-range-picker'}
            />
          </div>

          <div className='budget-range'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Enter campaign budget</label>
              <select>
                <option value={'IN'}>₹INR</option>
                <option value={'US'}>$USD</option>
                <option value={'EU'}>€EUR</option>
              </select>
            </div>
            <div className='slider'>
              <Slider
                aria-label='slider-ex-6'
                onChange={(val) => setBudgetSliderValue(val)}
                defaultValue={budgetSliderValue}
                min={100}
                max={100000}
                step={100}
                colorScheme='messenger'
              >
                <SliderMark {...leftlabelStyles} value={100}>
                  100
                </SliderMark>
                <SliderMark {...rightlabelStyles} value={100000}>
                  100000
                </SliderMark>
                <SliderMark
                  value={budgetSliderValue}
                  textAlign='center'
                  bg='blackAlpha.600'
                  color='white'
                  mt='3'
                  ml='-10'
                  w='20'
                >
                  {'Rs. ' + budgetSliderValue}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <div className='location-setting'>
        <div className='setting-title'>
          <span>2</span>
          <p>Location info</p>
        </div>

        <div className='location-setting-content'>
          <div className='location-type'>
            <label>Location Type</label>
            <div className='location-type-tabs'>
              <span
                className={classNames('location-info-tab', {
                  'active': activeLocationTab === 'location',
                })}
                onClick={() => setActiveLocationTab('location')}
              >
                Location
              </span>
              <span
                className={classNames('location-info-tab', {
                  'active': activeLocationTab === 'radius',
                })}
                onClick={() => setActiveLocationTab('radius')}
              >
                Radius
              </span>
            </div>
          </div>
          {activeLocationTab === 'location' && (
            <div className='select-location'>
              <label>Select location</label>
              <LocationSearchInput setCoords={setCoords} />
            </div>
          )}

          {activeLocationTab === 'radius' && (
            <div className='location-range'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>Select target radius</label>
              </div>
              <div className='slider'>
                <Slider
                  aria-label='slider-ex-6'
                  onChange={(val) => setLocationSliderValue(val)}
                  defaultValue={locationSliderValue}
                  min={1}
                  max={30}
                  step={1}
                  colorScheme='messenger'
                >
                  <SliderMark {...leftlabelStyles} value={1}>
                    1
                  </SliderMark>
                  <SliderMark {...rightLocationlabelStyles} value={30}>
                    30
                  </SliderMark>
                  <SliderMark
                    value={locationSliderValue}
                    textAlign='center'
                    bg='blackAlpha.600'
                    color='white'
                    mt='3'
                    ml='-7'
                    w='14'
                  >
                    {locationSliderValue + ' Km'}
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignSettings;
