import React, { useEffect, useState } from 'react';
import { Switch } from '@chakra-ui/react';
// import Switch from '@mui/material/Switch';
import './CampaignsData.css';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import classNames from 'classnames';
import { useCampaignsContext } from '../../hooks/useCampaignsContext';
import { useToast } from '@chakra-ui/react';
import moment from 'moment';

const CampaignsData = ({ platformOption, statusOption, searchTerm }) => {
  const { campaigns, dispatch } = useCampaignsContext();
  const [payload, setPayload] = useState(null);
  const toast = useToast();
  const [updateId, setUpdateId] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  useEffect(() => {
    const getCampaigns = async () => {
      const response = await fetch('http://localhost:5000/api/campaigns/');
      const data = await response.json();

      const filteredData = data.filter(
        (item) =>
          item.platform === platformOption && item.status === statusOption
      );

      const statusData = data.filter((item) => item.status === statusOption);

      const platformData = data.filter(
        (item) => item.platform === platformOption
      );

      if (response.ok) {
        if (
          platformOption === 'All Platform' &&
          statusOption === 'All Status'
        ) {
          dispatch({ type: 'SET_CAMPAIGNS', payload: data });
        } else if (
          statusOption !== 'All Status' &&
          platformOption === 'All Platform'
        ) {
          dispatch({ type: 'SET_CAMPAIGNS', payload: statusData });
        } else if (
          platformOption !== 'All Platform' &&
          statusOption === 'All Status'
        ) {
          dispatch({ type: 'SET_CAMPAIGNS', payload: platformData });
        } else {
          dispatch({ type: 'SET_CAMPAIGNS', payload: filteredData });
        }
      }
    };

    getCampaigns();
  }, [dispatch,payload, platformOption, statusOption]);

  useEffect(() => {
    const getCampaigns = async () => {
      const response = await fetch('http://localhost:5000/api/campaigns/');
      const data = await response.json();

      const searchResults = data.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (response.ok) {
        dispatch({ type: 'SET_CAMPAIGNS', payload: searchResults });
      }
    };
    getCampaigns();
  }, [dispatch,searchTerm]);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/campaigns/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    setPayload(data);
    dispatch({ type: 'DELETE_CAMPAIGN', payload: data });
    toast({
      title: 'Campaign deleted.',
      description: `Click on 'Create New Campaign' to run a new one.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleStatus = (id) => {
    setUpdateId(id);
    setUpdateItem(campaigns.find((campaign) => campaign._id === id));
  };

  useEffect(() => {
    const updateCampaignStatus = async () => {
      const response = await fetch(`http://localhost:5000/api/campaigns/${updateId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          active: !updateItem?.active,
          status: updateItem?.active ? 'Paused' : 'Live now',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPayload(data);
      dispatch({ type: 'CHANGE_CAMPAIGN_STATUS', payload: data });
    };
    updateCampaignStatus();
  }, [dispatch,updateId, updateItem]);

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type='checkbox' />
          </th>
          <th>On/Off </th>
          <th>Campaign</th>
          <th>Date Range</th>
          <th>Clicks</th>
          <th>Budget</th>
          <th>Location</th>
          <th>Platform</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {campaigns?.length > 0 &&
          campaigns?.map((campaign) => {
            const {
              _id,
              active,
              title,
              image,
              dateRange,
              clicks,
              budget,
              location,
              platform,
              status,
              createdAt,
            } = campaign;
            return (
              <tr className='table-row' key={campaign._id}>
                <td>
                  <input type='checkbox' />
                </td>
                <td>
                  <Switch
                    isChecked={active}
                    onChange={() => handleStatus(_id)}
                  />
                </td>
                <td
                  style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <img src={image} alt={image} style={{ width: '45px' }} />
                  <div>
                    <p style={{ fontWeight: 500, lineHeight: '14px' }}>
                      {title}
                    </p>
                    <p
                      style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}
                    >
                      Created on {moment(createdAt).format('DD MMM')}
                    </p>
                  </div>
                </td>
                <td>{dateRange}</td>
                <td>{clicks}</td>
                <td>{budget}</td>
                <td>{location}</td>
                <td>
                  <span className={classNames(`campaign-${platform}`)}></span>
                </td>
                <td>
                  <span
                    className={classNames(
                      `campaign-${status.split(' ').join('-')}`
                    )}
                  >
                    {status}
                  </span>
                </td>
                <td>
                  <div className='action-icons'>
                    <BorderColorOutlinedIcon
                      style={{
                        color: '#0F6EFF',
                        fontSize: '16px',
                        cursor: 'pointer',
                      }}
                    />{' '}
                    <DeleteOutlinedIcon
                      style={{
                        color: '#FC3F3F',
                        fontSize: '20px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDelete(campaign._id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default CampaignsData;
